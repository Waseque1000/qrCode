"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useSocket } from "@/hooks/useSocket";
import { generateSessionId, cn } from "@/lib/utils";
import { 
  FiSearch, FiDownload, FiTrash2, FiExternalLink, 
  FiCopy, FiSmartphone, FiActivity, FiClock, 
  FiCheckCircle, FiShield, FiCpu, FiArrowLeft
} from "react-icons/fi";
import { HiOutlineQrCode } from "react-icons/hi2";
import { format } from "date-fns";
import { toast, Toaster } from "sonner";
import Link from "next/link";

export default function Dashboard() {
  const [sessionId, setSessionId] = useState("");
  const [scans, setScans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isClient, setIsClient] = useState(false);
  const { isConnected, on, emit } = useSocket();
  const [connectedDevices, setConnectedDevices] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const id = generateSessionId();
    setSessionId(id);
  }, []);

  useEffect(() => {
    if (isConnected && sessionId) {
      emit("create-session", sessionId);
    }
  }, [isConnected, sessionId, emit]);

  useEffect(() => {
    on("device-connected", () => {
      setConnectedDevices(prev => prev + 1);
      toast.success("DEVICE CONNECTED", {
        className: "bg-black text-white rounded-none border-none",
      });
    });

    on("new-scan", (scan) => {
      setScans(prev => [scan, ...prev]);
      toast("NEW SCAN DATA", {
        className: "bg-black text-white rounded-none border-none",
      });
    });
  }, [on]);

  const clearHistory = () => {
    setScans([]);
    toast.success("HISTORY CLEARED");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("COPIED TO CLIPBOARD");
  };

  const downloadCSV = () => {
    if (scans.length === 0) return;
    const headers = "ID,Data,Type,Timestamp\n";
    const csvContent = scans.map(s => `${s.id},"${s.data}",${s.type},${s.timestamp}`).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-scans-${sessionId}.csv`;
    a.click();
  };

  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.data.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || scan.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!isClient) return null;

  const scannerUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/scanner?sid=${sessionId}`;

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 font-sans selection:bg-black selection:text-white">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
        <div className="flex items-center gap-6">
          <Link href="/" className="p-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">DASHBOARD</h1>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
              <span className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-black" : "bg-red-500"
              )} />
              {isConnected ? "System Live" : "Offline"}
              <span className="text-black">/</span>
              <span>{connectedDevices} DEVICE(S)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-1">Session Protocol</div>
          <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 border border-gray-100 rounded-lg">
            <span className="font-mono font-bold text-sm tracking-wider">{sessionId}</span>
            <button onClick={() => copyToClipboard(sessionId)} className="hover:text-gray-400">
              <FiCopy />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side */}
        <div className="lg:col-span-4 space-y-12">
          <div className="border-4 border-black p-10 flex flex-col items-center">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-10">Pair Device</h3>
            <div className="p-6 border border-gray-100 mb-10">
              <QRCodeSVG value={scannerUrl} size={180} level="H" includeMargin={false} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 text-center uppercase leading-relaxed max-w-[200px]">
              Scan the code above with any mobile camera to initialize synchronization.
            </p>
          </div>

          <div className="grid grid-cols-2 border-t-2 border-black pt-10 gap-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Total Logs</div>
              <div className="text-4xl font-black">{scans.length}</div>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Status</div>
              <div className="text-4xl font-black">{isConnected ? "OK" : "--"}</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-black" />
              <input 
                type="text" 
                placeholder="SEARCH_LOGS..." 
                className="w-full bg-transparent border-b-2 border-black py-4 pl-8 pr-4 outline-none font-bold uppercase text-xs tracking-widest placeholder:text-gray-200 focus:placeholder:text-gray-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select 
                className="bg-transparent border-b-2 border-black px-4 py-4 outline-none font-bold uppercase text-[10px] tracking-widest cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">ALL_TYPES</option>
                <option value="url">URL</option>
                <option value="text">TEXT</option>
                <option value="email">MAIL</option>
                <option value="phone">TEL</option>
              </select>
              <button onClick={downloadCSV} className="p-4 border-2 border-black hover:bg-black hover:text-white transition-all">
                <FiDownload />
              </button>
              <button onClick={clearHistory} className="p-4 border-2 border-black hover:bg-black hover:text-white transition-all text-red-500 hover:text-white">
                <FiTrash2 />
              </button>
            </div>
          </div>

          {/* Logs */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredScans.length === 0 ? (
                <div className="py-32 flex flex-col items-center justify-center border border-gray-100 rounded-xl">
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-200">No Logs Found</div>
                </div>
              ) : (
                filteredScans.map((scan) => (
                  <motion.div
                    key={scan.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-gray-200 p-8 hover:border-black transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4 items-center">
                        <span className="text-[10px] font-black bg-black text-white px-3 py-1 uppercase tracking-widest">
                          {scan.type}
                        </span>
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                          {format(new Date(scan.timestamp), 'HH:mm:ss')}
                        </span>
                      </div>
                      <div className="flex gap-4">
                         <button onClick={() => copyToClipboard(scan.data)} className="text-gray-300 hover:text-black transition-colors">
                           <FiCopy />
                         </button>
                         {scan.type === 'url' && (
                           <a href={scan.data} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-black transition-colors">
                             <FiExternalLink />
                           </a>
                         )}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold break-all leading-tight text-gray-800 group-hover:text-black transition-colors">
                      {scan.data}
                    </h4>

                    {scan.type === 'url' && (
                      <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-l-2 border-black pl-3 py-1">
                        {new URL(scan.data).hostname}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
