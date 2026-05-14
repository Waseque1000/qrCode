"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCamera, FiLayout, FiZap, FiShield, FiArrowRight, FiRefreshCw } from "react-icons/fi";
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
            { title: "INSTANT", desc: "Sub-millisecond latency via direct P2P connection. Data flows as fast as you scan." },
            { title: "SECURE", desc: "No data is stored on our servers. Peer-to-peer sessions only for maximum privacy." },
            { title: "MINIMAL", desc: "Designed for focus. No ads, no tracking, just a pure utility tool." },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-2xl font-black">{feature.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mobile Experience Section */}
      <section className="w-full max-w-6xl px-6 py-32 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">
                POWERFUL <br />
                MOBILE SCANNER.
              </h2>
              <div className="space-y-10">
                {[
                  { icon: <FiZap />, title: "ZERO DELAY", desc: "Scan and sync in under 50ms. It feels like magic." },
                  { icon: <FiCamera />, title: "PRO OPTICS", desc: "Optimized for low light and small QR codes." },
                  { icon: <FiShield />, title: "HAPTIC FEEDBACK", desc: "Physical vibration on every successful scan." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 border-2 border-black flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="flex-1 flex justify-center">
            <motion.div
              initial={{ opacity: 0, rotate: 10, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-gray-50 rounded-full blur-3xl opacity-50" />
              <div className="w-64 h-[500px] border-[6px] border-black rounded-[3rem] bg-white p-4 shadow-2xl relative z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                <div className="w-full h-full border-2 border-gray-100 rounded-[2.2rem] bg-gray-50/50 flex flex-col p-6 overflow-hidden">
                  <div className="flex justify-between items-center mb-10">
                    <div className="w-8 h-8 border border-black rounded flex items-center justify-center text-[10px] font-black">QR</div>
                    <FiZap className="text-black" />
                  </div>
                  <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center relative">
                    <motion.div 
                      animate={{ top: ['10%', '90%', '10%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-0.5 bg-black z-10" 
                    />
                    <div className="w-20 h-20 border-2 border-black/10 rounded-xl flex items-center justify-center">
                      <HiOutlineQrCode className="w-12 h-12 text-black/20" />
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <div className="text-[10px] font-black tracking-widest text-gray-300 uppercase mb-2">Ready to scan</div>
                    <div className="h-1 w-full bg-black rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-full max-w-6xl px-6 py-32 border-t border-gray-100 bg-gray-50/50">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">How it works</h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">Three steps to instant synchronization</p>
        </div>

        <div className="relative">
          {/* Connection Line Animation */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              { 
                step: "01", 
                title: "Initialize", 
                desc: "Open the dashboard on your laptop to generate a secure P2P session ID.",
                icon: <FiLayout className="w-6 h-6" />
              },
              { 
                step: "02", 
                title: "Pair Device", 
                desc: "Scan the pairing QR code with your mobile phone to establish a direct link.",
                icon: <FiCamera className="w-6 h-6" />
              },
              { 
                step: "03", 
                title: "Live Sync", 
                desc: "Start scanning! Every QR code scanned on your phone appears instantly on your laptop.",
                icon: <FiRefreshCw className="w-6 h-6" />
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white border-2 border-black p-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full mb-8 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-[10px] font-black tracking-[0.5em] text-gray-300 mb-4">{step.step}</div>
                <h3 className="text-xl font-black uppercase mb-4">{step.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Sync Illustration Animation - Premium Version */}
        <div className="mt-40 flex flex-col items-center">
          <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-24">
            
            {/* Mobile Device Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gray-50 rounded-[2.5rem] scale-95 group-hover:scale-100 transition-transform duration-500 opacity-50" />
              <div className="w-24 h-44 md:w-36 md:h-64 border-[3px] border-black rounded-[2rem] bg-white relative p-2 shadow-2xl overflow-hidden z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-black rounded-b-xl z-20" />
                <div className="w-full h-full border border-gray-100 rounded-[1.5rem] flex flex-col items-center justify-center relative bg-gray-50/30">
                   <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center">
                      <FiCamera className="text-gray-300 w-6 h-6" />
                   </div>
                   <motion.div 
                     animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 0.8] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 flex items-center justify-center pointer-events-none"
                   >
                     <div className="w-20 h-20 border border-black/5 rounded-full" />
                   </motion.div>
                </div>
              </div>
              <div className="mt-6 text-center text-[10px] font-black tracking-[0.3em] uppercase">Mobile Unit</div>
            </motion.div>

            {/* Neural Data Bridge */}
            <div className="relative h-20 md:h-auto md:w-48 flex items-center justify-center">
              <svg className="absolute w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 20">
                <motion.path
                  d="M 0 10 L 100 10"
                  stroke="black"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                />
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    r="1.5"
                    fill="black"
                    animate={{ cx: [0, 100] }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      delay: i * 0.8,
                      ease: "linear"
                    }}
                    cy="10"
                  />
                ))}
              </svg>
              <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] bg-white px-4 py-1 border border-gray-100 rounded-full shadow-sm z-10">
                Direct Sync
              </div>
            </div>

            {/* Laptop/Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-6 bg-gray-50 rounded-[2.5rem] scale-95 group-hover:scale-100 transition-transform duration-500 opacity-50" />
              <div className="w-48 h-32 md:w-80 md:h-52 border-[3px] border-black rounded-2xl bg-white relative p-3 shadow-2xl z-10">
                <div className="w-full h-full border border-gray-100 rounded-lg flex flex-col bg-gray-50/20">
                  <div className="h-4 border-b border-gray-100 flex items-center px-2 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-black rounded-[1px] animate-pulse" />
                       </div>
                       <div className="flex-1 h-2 bg-gray-100 rounded" />
                    </div>
                    <div className="space-y-2 mt-4">
                       {[0, 1, 2].map((i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: -10 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{ delay: 1 + (i * 0.2) }}
                           className="h-2 bg-gray-100 rounded-full w-full"
                         />
                       ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Laptop base */}
              <div className="w-[110%] h-2 bg-black absolute bottom-[-8px] left-[-5%] rounded-full z-10" />
              <div className="mt-8 text-center text-[10px] font-black tracking-[0.3em] uppercase">Master Dashboard</div>
            </motion.div>

          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20 flex items-center gap-3 px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full"
          >
            <FiShield className="text-gray-400" />
            End-to-End P2P Encrypted Session
          </motion.div>
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
