"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCamera, FiLayout, FiZap, FiShield, FiArrowRight } from "react-icons/fi";
import { HiOutlineQrCode } from "react-icons/hi2";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-6xl px-6 py-10 flex justify-between items-center z-10">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="p-2 border-2 border-black rounded-lg">
            <HiOutlineQrCode className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-black tracking-tight uppercase">
            QR<span className="text-gray-400">Sync</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest">
          <a href="#features" className="hover:text-gray-400 transition-colors">Features</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Security</a>
          <Link href="/dashboard" className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all">
            Launch
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-center gap-20 py-20">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              PURE <br />
              SYNCING.
            </h1>
            <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
              A minimalist real-time QR ecosystem. Scan from mobile, see on desktop. No clutter, just performance.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <Link href="/dashboard" className="group px-10 py-5 bg-black text-white font-bold rounded-full flex items-center gap-3 hover:bg-gray-800 transition-all">
                START SCANNING <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/scanner" className="px-10 py-5 border-2 border-black font-bold rounded-full hover:bg-black hover:text-white transition-all">
                OPEN SCANNER
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-[450px] aspect-square border-4 border-black rounded-[3rem] p-12 flex items-center justify-center relative bg-white">
            <HiOutlineQrCode className="w-full h-full text-black opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-32 h-32 border-4 border-black bg-white flex items-center justify-center rounded-2xl">
                  <HiOutlineQrCode className="w-20 h-20 text-black" />
               </div>
            </div>
            {/* Scanning line */}
            <motion.div 
              className="absolute left-10 right-10 h-1 bg-black"
              animate={{ top: ['20%', '80%', '20%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </main>

      {/* Features */}
      <section id="features" className="w-full max-w-6xl px-6 py-32 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { title: "INSTANT", desc: "Sub-millisecond latency via WebSockets. Data flows as fast as you scan." },
            { title: "SECURE", desc: "No data is stored on our servers. Local sessions only for maximum privacy." },
            { title: "MINIMAL", desc: "Designed for focus. No ads, no tracking, just a pure utility tool." },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col gap-4">
              <h3 className="text-2xl font-black">{feature.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-gray-100 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-black uppercase tracking-widest">© 2026 QRSYNC</div>
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">Github</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
