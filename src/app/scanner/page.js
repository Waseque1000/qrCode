"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/hooks/useSocket";
import { FiCamera, FiZap, FiRefreshCw, FiArrowLeft, FiCheck } from "react-icons/fi";
import Link from "next/link";
import { toast, Toaster } from "sonner";

function ScannerContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sid");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const scannerRef = useRef(null);
  const html5QrCode = useRef(null);
  const { isConnected, emit, on } = useSocket();

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
        fps: 10, 
        qrbox: { width: 250, height: 250 },
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
      window.navigator.vibrate(200);
    }

    let type = "text";
    if (data.startsWith("http")) type = "url";
    else if (data.includes("@")) type = "email";
    else if (data.startsWith("tel:")) type = "phone";

    emit("scan-data", { sessionId, data, type });
    
    toast.success("DATA SYNCED");

    stopScanner();
    setTimeout(() => {
      setScannedData(null);
      startScanner();
    }, 2000);
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
      <div className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-white text-black">
        <h1 className="text-3xl font-black mb-4 uppercase">No Session</h1>
        <p className="text-xs font-bold text-gray-400 mb-10 uppercase tracking-widest leading-relaxed">
          The pairing protocol has not been initialized. Please scan the dashboard QR code.
        </p>
        <Link href="/" className="px-10 py-5 bg-black text-white font-black uppercase text-xs tracking-widest">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col overflow-hidden font-sans">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="p-8 flex justify-between items-center border-b-2 border-black">
        <Link href="/" className="p-3 border-2 border-black">
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div className="text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-1">Session</div>
          <div className="text-xs font-mono font-bold text-gray-400">{sessionId}</div>
        </div>
        <button 
          onClick={toggleFlash}
          className={`p-3 border-2 border-black transition-all ${flashOn ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          <FiZap />
        </button>
      </div>

      {/* Camera */}
      <div className="flex-1 relative flex items-center justify-center p-10">
        <div id="reader" className="w-full max-w-[400px] aspect-square border-4 border-black" />
        
        {/* Frame Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[280px] h-[280px] relative">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-8 border-l-8 border-black" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-8 border-r-8 border-black" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-8 border-l-8 border-black" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-8 border-r-8 border-black" />
            
            {isScanning && (
              <motion.div 
                className="absolute left-4 right-4 h-1 bg-black"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {scannedData && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 p-12"
            >
              <div className="text-center">
                <FiCheck className="text-5xl mb-6 mx-auto" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">SYNCED</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate w-48 mx-auto">{scannedData}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isScanning && (
          <button 
            onClick={startScanner}
            className="absolute z-10 px-12 py-6 bg-black text-white font-black uppercase tracking-[0.2em] text-xs"
          >
            Open Camera
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="p-10 text-center border-t-2 border-black">
        <div className="flex justify-center gap-10">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 ${isConnected ? 'bg-black animate-pulse' : 'bg-gray-200'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest">{isConnected ? "ONLINE" : "OFFLINE"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <FiRefreshCw className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">REALTIME</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Scanner() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-black font-black uppercase tracking-widest">Loading...</div>}>
      <ScannerContent />
    </Suspense>
  );
}
