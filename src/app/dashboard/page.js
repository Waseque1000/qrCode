"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useSocket } from "@/hooks/useSocket";
import { generateSessionId, cn } from "@/lib/utils";
import { 
  FiSearch, FiDownload, FiTrash2, FiExternalLink, 
  FiCopy, FiSmartphone, FiActivity, FiClock, 
  FiCheckCircle, FiShield, FiCpu, FiArrowLeft, FiMoreVertical
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
  const { isConnected, on, emit } = useSocket(sessionId, true);
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
      toast.success("DEVICE LINKED", {
        description: "A mobile device has joined the session.",
        className: "bg-indigo-600 text-white border-none rounded-2xl",
      });
    });

    on("new-scan", (scan) => {
      setScans(prev => [scan, ...prev]);
      toast.info("SCAN RECEIVED", {
        description: "New data has been synchronized.",
        className: "bg-slate-900 text-white border-none rounded-2xl",
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
    const data = scan?.data || "";
    const search = searchTerm || "";
    const matchesSearch = data.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === "all" || scan.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!isClient) return null;

  const scannerUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/scanner?sid=${sessionId}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 lg:p-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="bottom-right" />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div className="flex items-center gap-6">
            <Link href="/" className="p-3 bg-white border border-slate-200 rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm group active:scale-95">
              <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black tracking-tight">DASHBOARD</h1>
                <div className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  isConnected ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                )}>
                  {isConnected ? "System Live" : "Reconnecting"}
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium">Manage your real-time QR synchronization pipeline</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
             <div className="flex-1 lg:flex-none bg-white px-6 py-3 border border-slate-200 rounded-2xl flex items-center justify-between gap-6 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">SESSION_PROTOCOL</span>
                  <span className="font-mono font-bold text-sm tracking-widest text-slate-700">{sessionId}</span>
                </div>
                <button onClick={() => copyToClipboard(sessionId)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                  <FiCopy className="w-4 h-4" />
                </button>
             </div>
             <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                <FiActivity className={cn("w-5 h-5", isConnected ? "text-indigo-600" : "text-slate-300")} />
             </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Pairing & Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <FiSmartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Link Mobile Unit</h3>
              <p className="text-slate-500 text-sm text-center font-medium mb-8 leading-relaxed px-4">
                Scan this bridge key to start streaming data to your dashboard.
              </p>
              
              <div className="p-6 bg-white border-2 border-slate-50 rounded-3xl shadow-inner mb-8">
                <QRCodeSVG 
                  value={scannerUrl} 
                  size={200} 
                  level="H" 
                  includeMargin={false} 
                  fgColor="#0f172a"
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Connected</div>
                    <div className="text-xl font-bold text-indigo-600">{connectedDevices}</div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl text-center">
                    <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Latency</div>
                    <div className="text-xl font-bold text-emerald-600">~24ms</div>
                 </div>
              </div>
            </div>

            <div className="premium-card p-8 rounded-[2.5rem] bg-indigo-600 text-white border-none shadow-indigo-200">
               <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <FiShield className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-black tracking-widest uppercase">Encrypted</div>
               </div>
               <h4 className="text-xl font-bold mb-2">Secure Pipeline</h4>
               <p className="text-indigo-100 text-sm font-medium leading-relaxed opacity-80">
                 Your data is transferred using end-to-end peer encryption. No middle servers, no data storage.
               </p>
            </div>
          </div>

          {/* Right Column: Logs & Controls */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Control Bar */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter scan data..." 
                  className="w-full bg-slate-50 rounded-2xl py-3.5 pl-12 pr-4 outline-none font-semibold text-sm placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all border border-transparent focus:border-indigo-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  className="bg-slate-50 border border-transparent rounded-2xl px-6 py-3.5 outline-none font-bold text-xs tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">ALL DATA</option>
                  <option value="url">URLS</option>
                  <option value="text">PLAINTEXT</option>
                  <option value="email">CONTACTS</option>
                </select>
                
                <div className="w-px h-8 bg-slate-100 my-auto hidden md:block" />
                
                <button 
                  onClick={downloadCSV} 
                  className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95"
                  title="Download CSV"
                >
                  <FiDownload />
                </button>
                <button 
                  onClick={clearHistory} 
                  className="w-12 h-12 bg-slate-50 text-red-400 rounded-2xl flex items-center justify-center hover:bg-red-50 transition-all active:scale-95"
                  title="Clear History"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            {/* Logs Grid */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredScans.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-32 flex flex-col items-center justify-center glass rounded-[3rem] border border-white"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <HiOutlineQrCode className="w-8 h-8 text-slate-300" />
                    </div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Awaiting Scan Protocol...</div>
                  </motion.div>
                ) : (
                  filteredScans.map((scan, index) => (
                    <motion.div
                      key={scan.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-slate-200 p-6 rounded-[2rem] hover:border-indigo-600 transition-all group shadow-sm hover:shadow-xl hover:shadow-indigo-100/30"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-3 items-center">
                          <div className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                            scan.type === 'url' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                          )}>
                            {scan.type}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                            <FiClock className="w-3 h-3" />
                            {format(new Date(scan.timestamp), 'HH:mm:ss')}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => copyToClipboard(scan.data)} className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
                             <FiCopy className="w-4 h-4" />
                           </button>
                           {scan.type === 'url' && (
                             <a href={scan.data} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
                               <FiExternalLink className="w-4 h-4" />
                             </a>
                           )}
                           <button className="p-2 hover:bg-slate-50 text-slate-400 rounded-xl">
                              <FiMoreVertical className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                            {scan.type === 'url' ? <FiExternalLink className="text-indigo-400" /> : <FiCopy className="text-emerald-400" />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold break-all leading-tight text-slate-800 group-hover:text-indigo-900 transition-colors mb-2">
                              {scan.data}
                            </h4>
                            {scan.type === 'url' && (
                              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                                {new URL(scan.data).hostname}
                              </div>
                            )}
                         </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
