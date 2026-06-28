"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiCamera,
  FiLayout,
  FiZap,
  FiShield,
  FiArrowRight,
  FiRefreshCw,
  FiExternalLink,
} from "react-icons/fi";
import { HiOutlineQrCode } from "react-icons/hi2";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Navbar */}
      <nav className="w-full max-w-7xl px-6 py-8 flex justify-between items-center z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
            <HiOutlineQrCode className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            QR<span className="text-indigo-600">Sync</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8 text-sm font-semibold"
        >
          <a
            href="#features"
            className="text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Process
          </a>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition-all shadow-md active:scale-95"
          >
            Launch App
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl px-6 flex flex-col lg:flex-row items-center justify-center gap-16 py-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-8 border border-indigo-100 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              V2.0 Now Live
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] text-slate-900">
              REAL-TIME <br />
              <span className="animated-gradient-text">QR SYNCING.</span>
            </h1>

            <p className="text-slate-500 text-xl mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              The fastest way to bridge mobile scanning with your desktop
              workflow.
              <span className="text-indigo-600 font-semibold">
                {" "}
                P2P Encrypted.{" "}
              </span>{" "}
              Zero Latency.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link
                href="/dashboard"
                className="group px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
              >
                GET STARTED{" "}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/scanner"
                className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 font-bold rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
              >
                OPEN SCANNER
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 w-full max-w-[500px]"
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative aspect-square glass rounded-[3rem] p-8 flex items-center justify-center border-2 border-indigo-50 shadow-2xl overflow-hidden">
            {/* Background Grid */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#6366f1 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <HiOutlineQrCode className="w-[80%] h-[80%] text-indigo-600 opacity-5" />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-40 h-40 bg-white shadow-2xl shadow-indigo-200 flex items-center justify-center rounded-3xl border border-indigo-50 p-6 z-10"
              >
                <HiOutlineQrCode className="w-full h-full text-indigo-600" />
              </motion.div>
            </div>

            {/* Scanning line */}
            <motion.div
              className="absolute left-12 right-12 h-1.5 bg-indigo-500 rounded-full blur-[2px] z-20 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
              animate={{ top: ["25%", "75%", "25%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </main>

      {/* Features */}
      <section id="features" className="w-full max-w-7xl px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            POWERED BY PERFORMANCE
          </h2>
          <p className="text-slate-500 font-medium">
            Built with the modern web stack for ultimate speed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "INSTANT SYNC",
              desc: "Experience sub-50ms latency with our optimized P2P bridge. No cloud middleman, just pure speed.",
              icon: <FiZap className="w-6 h-6 text-amber-500" />,
              bg: "bg-amber-50",
            },
            {
              title: "E2E ENCRYPTION",
              desc: "Your data never touches our servers. Direct browser-to-browser encryption keeps your scans private.",
              icon: <FiShield className="w-6 h-6 text-emerald-500" />,
              bg: "bg-emerald-50",
            },
            {
              title: "GLOBAL ACCESS",
              desc: "Works everywhere without an account. Simply scan, pair, and sync across any network condition.",
              icon: <FiRefreshCw className="w-6 h-6 text-indigo-500" />,
              bg: "bg-indigo-50",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-10 rounded-[2rem]"
            >
              <div
                className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-8`}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how-it-works"
        className="w-full max-w-7xl px-6 py-32 rounded-[4rem] bg-slate-50/50 border border-slate-100"
      >
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            How it works
          </h2>
          <p className="text-indigo-600 font-bold tracking-widest uppercase text-xs">
            Three steps to instant synchronization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Generate Key",
              desc: "Open the dashboard on your desktop to create a unique P2P handshake token.",
              icon: <FiLayout className="w-6 h-6" />,
            },
            {
              step: "02",
              title: "Pair Scanner",
              desc: "Scan the on-screen QR code with your phone. A secure bridge is built instantly.",
              icon: <FiCamera className="w-6 h-6" />,
            },
            {
              step: "03",
              title: "Sync Live",
              desc: "Start scanning items. Data flows directly to your laptop with haptic feedback.",
              icon: <FiRefreshCw className="w-6 h-6" />,
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 text-white flex items-center justify-center rounded-2xl font-black text-lg shadow-lg shadow-indigo-200">
                {step.step}
              </div>
              <div className="w-16 h-16 bg-slate-50 text-indigo-600 flex items-center justify-center rounded-2xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-40">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-4xl glass p-12 rounded-[3rem] border border-white overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Live Connection
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Phone Mockup */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-32 h-60 border-4 border-slate-900 rounded-[2rem] bg-slate-900 relative p-1 shadow-2xl"
                >
                  <div className="w-full h-full bg-indigo-600 rounded-[1.7rem] overflow-hidden flex flex-col items-center justify-center p-4">
                    <div className="w-12 h-12 border-2 border-white/20 rounded-xl flex items-center justify-center mb-4">
                      <FiCamera className="text-white w-6 h-6" />
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-full mb-2" />
                    <div className="w-1/2 h-1 bg-white/20 rounded-full" />
                  </div>
                </motion.div>

                {/* Sync Bridge */}
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">
                    Data Pipeline
                  </div>
                  <div className="w-full h-px bg-slate-200 relative">
                    <motion.div
                      animate={{ left: ["0%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 rounded-full border border-indigo-100 flex items-center justify-center text-indigo-600"
                    >
                      <FiZap className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Dashboard Mockup */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="w-64 h-44 bg-slate-900 border-4 border-slate-900 rounded-2xl shadow-2xl p-2"
                >
                  <div className="w-full h-full bg-white rounded-lg flex flex-col overflow-hidden">
                    <div className="h-4 bg-slate-50 border-b border-slate-100 flex items-center px-2 gap-1">
                      <div className="w-1 h-1 rounded-full bg-red-400" />
                      <div className="w-1 h-1 rounded-full bg-amber-400" />
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-50 rounded border border-indigo-100 flex items-center justify-center">
                          <HiOutlineQrCode className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="h-2 flex-1 bg-slate-50 rounded-full" />
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full" />
                      <div className="h-2 w-3/4 bg-slate-50 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-7xl px-6 py-40">
        <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-[80px] -ml-48 -mb-48" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              READY TO SYNC?
            </h2>
            <p className="text-indigo-100 text-xl mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of users bridging the gap between physical and
              digital data with QR Sync.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <Link
                href="/dashboard"
                className="px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-xl active:scale-95"
              >
                LAUNCH DASHBOARD
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-white font-bold group"
              >
                VIEW SOURCE ON GITHUB{" "}
                <FiExternalLink className="group-hover:translate-y-[-2px] transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-lg">
                <HiOutlineQrCode className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
                QR<span className="text-indigo-600">Sync</span>
              </span>
            </div>

            <div className="flex gap-12 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Github
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Discord
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-50 gap-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
              © 2026 Wasee{" "}
            </div>
            <div className="flex gap-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
