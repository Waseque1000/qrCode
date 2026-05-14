"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/hooks/useSocket";
import { FiCamera, FiZap, FiRefreshCw, FiArrowLeft, FiCheck, FiInfo } from "react-icons/fi";
import Link from "next/link";
import { toast, Toaster } from "sonner";

function ScannerContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sid");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const html5QrCode = useRef(null);
  const { isConnected, emit, on } = useSocket(sessionId, false);

  useEffect(() => {
    if (isConnected && sessionId) {
      emit("join-session", sessionId);
    }
  }, [isConnected, sessionId, emit]);

  useEffect(() => {
    on("error", (msg) => {
      toast.error(msg);
    });

    return () => {
      stopScanner();
    };
  }, [on]);

  const startScanner = async () => {
    try {
      setIsScanning(true);
      html5QrCode.current = new Html5Qrcode("reader");
      
      const config = { 
        fps: 20, 
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1.0
      };

      await html5QrCode.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleScan(decodedText);
        },
        (errorMessage) => {}
      );
    } catch (err) {
      console.error(err);
      toast.error("CAMERA ACCESS ERROR");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCode.current && html5QrCode.current.isScanning) {
      await html5QrCode.current.stop();
      html5QrCode.current.clear();
    }
    setIsScanning(false);
  };

  const handleScan = (data) => {
    setScannedData(data);
    
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100]);
    }

    let type = "text";
    if (data.startsWith("http")) type = "url";
    else if (data.includes("@")) type = "email";
    else if (data.startsWith("tel:")) type = "phone";

    emit("scan-data", { sessionId, data, type });
    
    toast.success("SYNCED", {
      className: "bg-emerald-600 text-white rounded-2xl",
    });

    stopScanner();
    setTimeout(() => {
      setScannedData(null);
      startScanner();
    }, 2500);
  };

  const toggleFlash = () => {
    if (html5QrCode.current && html5QrCode.current.isScanning) {
      const track = html5QrCode.current.getRunningTrack();
      if (track) {
        const capabilities = track.getCapabilities();
        if (capabilities.torch) {
          track.applyConstraints({
            advanced: [{ torch: !flashOn }]
          });
          setFlashOn(!flashOn);
        } else {
          toast.error("NO FLASH SUPPORT");
        }
      }
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mb-8">
           <FiInfo className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black mb-4 tracking-tighter">PAIRING REQUIRED</h1>
        <p className="text-slate-500 font-medium mb-12 max-w-sm leading-relaxed">
          The pairing protocol has not been initialized. Please scan the dashboard QR code to establish a link.
        </p>
        <Link href="/" className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-xl">
          RETURN TO BASE
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col overflow-hidden font-sans">
      <Toaster position="bottom-center" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="p-8 flex justify-between items-center z-10">
        <Link href="/" className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all">
          <FiArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Live Tunnel</div>
          <div className="text-xs font-mono font-bold text-indigo-400">{sessionId}</div>
        </div>
        <button 
          onClick={toggleFlash}
          className={`p-3 backdrop-blur-md border transition-all rounded-2xl ${flashOn ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/10 border-white/20 text-white'}`}
        >
          <FiZap />
        </button>
      </div>

      {/* Camera */}
      <div className="flex-1 relative flex items-center justify-center p-6">
        <div id="reader" className="w-full max-w-[450px] aspect-square rounded-[3rem] overflow-hidden bg-black/40 border border-white/10 shadow-2xl" />
        
        {/* Frame Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[300px] h-[300px] relative">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-indigo-500 rounded-tl-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-indigo-500 rounded-tr-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-indigo-500 rounded-bl-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-indigo-500 rounded-br-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            
            {isScanning && (
              <motion.div 
                className="absolute left-4 right-4 h-1 bg-indigo-400 rounded-full blur-[2px] shadow-[0_0_10px_#6366f1]"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {scannedData && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-indigo-600 p-12"
            >
              <div className="text-center">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-xl"
                >
                  <FiCheck className="text-white text-5xl" />
                </motion.div>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">SYNCED</h3>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-xs mx-auto">
                  <p className="text-xs font-bold text-white/80 uppercase tracking-widest break-all line-clamp-2">{scannedData}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isScanning && (
          <button 
            onClick={startScanner}
            className="absolute z-10 px-12 py-6 bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl shadow-indigo-500/50 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3"
          >
            <FiCamera className="text-lg" />
            INITIALIZE OPTICS
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="p-10 text-center z-10">
        <div className="flex justify-center gap-10">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse' : 'bg-red-500'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{isConnected ? "TUNNEL_ONLINE" : "SIGNAL_LOST"}</span>
          </div>
          <div className="flex items-center gap-3 text-indigo-400">
            <FiRefreshCw className="w-3 h-3 animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-widest">LIVE_BRIDGE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Scanner() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black uppercase tracking-[0.3em] animate-pulse">Establishing Signal...</div>}>
      <ScannerContent />
    </Suspense>
  );
}
