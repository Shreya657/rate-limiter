"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Shield, Terminal, Zap, Lock, ArrowLeft } from "lucide-react";
import { UserButton } from "../components/dashboard/userButton";

export default function PublicDocs() {
  const [activeSection, setActiveSection] = useState("intro");

  // Intersection Observer to highlight nav based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%", threshold: 0.5 }
    );

    const sections = ["intro", "how-it-works", "quickstart", "headers", "responses"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "intro", label: "Introduction" },
    { id: "how-it-works", label: "How it works" },
    { id: "quickstart", label: "Quickstart" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-teal-500/30">
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-white group">
            <Shield className="h-5 w-5 text-teal-500 group-hover:scale-110 transition-transform" />
            <span>ShieldLimit</span>
          </Link>
         <UserButton/>
        </div>
      </nav>

      <div className="mx-auto flex max-w-7xl gap-12 px-6 py-12">
        {/* Left Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <nav className="sticky top-28 space-y-8">
            {/* Back Button */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div>
              <h5 className="mb-3 text-sm font-semibold text-white uppercase tracking-wider text-[10px]">Getting Started</h5>
              <ul className="space-y-2 text-sm border-l border-zinc-800">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className={`block pl-4 -ml-[1px] border-l transition-colors ${
                        activeSection === item.id 
                        ? "border-teal-500 text-teal-500 font-medium" 
                        : "border-transparent hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="mb-3 text-sm font-semibold text-white uppercase tracking-wider text-[10px]">API Reference</h5>
              <ul className="space-y-2 text-sm border-l border-zinc-800">
                {["headers", "responses"].map((id) => (
                  <li key={id}>
                    <a 
                      href={`#${id}`} 
                      className={`block pl-4 -ml-[1px] border-l transition-colors ${
                        activeSection === id 
                        ? "border-teal-500 text-teal-500 font-medium" 
                        : "border-transparent hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        {/* Right Content */}
        <main className="flex-1 space-y-24 pb-24">
          <section id="intro" className="scroll-mt-32">
            <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">Introduction</h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              ShieldLimit is an edge-first protection layer designed for modern web applications. 
              By utilizing custom log-based analytics instead of heavy database lookups, 
              we provide ultra-low latency verification for your API routes.
            </p>
          </section>

          <section id="how-it-works" className="scroll-mt-32 space-y-6">
            <h2 className="text-2xl font-semibold text-white tracking-tight">How it works</h2>
            <p className="leading-relaxed">
              When a request hits your server, ShieldLimit intercepts the traffic and verifies 
              the integrity of the request header. If the key is valid and within rate limits, 
              the request proceeds. Otherwise, it is dropped at the edge.
            </p>
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
               {/* ... Your feature cards here ... */}
            </div>
          </section>

          <section id="quickstart" className="scroll-mt-32 space-y-6">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Quickstart</h2>
            <p>Deploy protection in under 60 seconds with our verification endpoint.</p>
            <div className="group relative rounded-xl bg-zinc-900/50 p-6 font-mono text-sm border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-zinc-500 text-xs uppercase">Terminal</span>
                 <Terminal className="w-4 h-4 text-zinc-600" />
              </div>
              <div className="space-y-1">
                <p className="text-teal-400">curl -X POST https://shield-limit.com/api/v1/verify \</p>
                <p className="text-zinc-300">&nbsp;&nbsp;-H "x-shield-key: YOUR_API_KEY"</p>
              </div>
            </div>
          </section>

          <section id="headers" className="scroll-mt-32 space-y-6">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Request Headers</h2>
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30">
               <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-900/50 text-zinc-400">
                    <tr>
                      <th className="px-6 py-3 font-medium">Header</th>
                      <th className="px-6 py-3 font-medium">Required</th>
                      <th className="px-6 py-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="px-6 py-4 font-mono text-teal-500">x-shield-key</td>
                      <td className="px-6 py-4 text-zinc-500">Yes</td>
                      <td className="px-6 py-4">Your project secret key used for authentication.</td>
                    </tr>
                  </tbody>
               </table>
            </div>
          </section>

          <section id="responses" className="scroll-mt-32 space-y-6">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Response Codes</h2>
            <div className="grid gap-4">
              {[
                { code: "200", desc: "Request verified successfully." },
                { code: "401", desc: "Unauthorized. Invalid or missing API key." },
                { code: "429", desc: "Too many requests. Rate limit exceeded." }
              ].map((res) => (
                <div key={res.code} className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/20 border border-zinc-800">
                  <span className="font-mono text-teal-500 w-12">{res.code}</span>
                  <span className="text-zinc-400">{res.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}