"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Terminal,
  Zap,
  Lock,
  Box,
  Globe,
  Cpu,
  Rocket,
  CheckCircle2,
  Layers3,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserButton } from "../components/dashboard/userButton";

export default function PublicDocs() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.4,
      }
    );

    const sections = [
      "intro",
      "quickstart",
      "sdk",
      "api",
      "headers",
      "responses",
    ];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    {
      group: "Getting Started",
      items: [
        { id: "intro", label: "Overview", icon: Globe },
        { id: "quickstart", label: "Quick Start", icon: Layers3 },
      ],
    },
    {
      group: "Frameworks",
      items: [
        { id: "sdk", label: "Node.js SDK", icon: Box },
        { id: "api", label: "REST API", icon: Cpu },
      ],
    },
    {
      group: "Reference",
      items: [
        { id: "headers", label: "Headers", icon: Lock },
        { id: "responses", label: "Responses", icon: CheckCircle2 },
      ],
    },
  ];

  const responses = [
    {
      code: "200 OK",
      status: "Success",
      desc: "The API key is valid and the request is within the allowed rate limits.",
      color: "bg-teal-500",
      text: "text-teal-500",
    },
    {
      code: "401 Unauthorized",
      status: "Error",
      desc: "The x-shield-key header is missing or invalid.",
      color: "bg-red-500",
      text: "text-red-500",
    },
    {
      code: "403 Forbidden",
      status: "Error",
      desc: "The request origin does not match your whitelist.",
      color: "bg-orange-500",
      text: "text-orange-500",
    },
    {
      code: "429 Too Many Requests",
      status: "Rate Limited",
      desc: "Rate limit exceeded. Retry after the specified duration.",
      color: "bg-purple-500",
      text: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-400 selection:bg-teal-500/20 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-black tracking-tight"
          >
            <Shield className="w-5 h-5 text-teal-500" />
            <span className="text-xl">ShieldLimit</span>
          </Link>

          <div className="flex items-center gap-4">
         <UserButton/>
          </div>
        </div>
      </nav>

      {/* Layout */}
      <div className="mx-auto flex max-w-7xl gap-20 px-6 py-14">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-10">
            {navItems.map((group) => (
              <div key={group.group}>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-600">
                  {group.group}
                </p>

                <ul className="space-y-2 border-l border-zinc-900">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`flex items-center gap-2 rounded-r-xl py-2 pl-4 -ml-[1px] border-l transition-all duration-300 ${
                          activeSection === item.id
                            ? "border-teal-500 bg-zinc-900/60 text-teal-500"
                            : "border-transparent hover:border-zinc-700 hover:bg-zinc-950 hover:text-zinc-200"
                        }`}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        <span className="text-sm">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-teal-500/10 bg-teal-500/5 p-5">
              <p className="text-[10px] uppercase tracking-widest font-black text-teal-500 mb-2">
                Public Beta
              </p>

              <p className="text-xs leading-relaxed text-zinc-500">
                ShieldLimit is currently in beta and free for all developers.
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 max-w-4xl space-y-28 pb-40">
          {/* Hero */}
           <Link
                                  href="/dashboard/project" 
                                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8 group"
                                >
                                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                  
                                </Link>
          <section id="intro" className="scroll-mt-32">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-teal-500 font-black mb-8">
              <Zap className="w-3 h-3" />
              Edge Security Infrastructure
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
              API Protection
              
              at the Edge.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
              ShieldLimit is an ultra-low latency security layer for APIs.
              Protect routes using Redis-backed analytics, sliding windows,
              origin verification, and cryptographic API keys.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
              <div className="rounded-3xl border border-zinc-900 bg-zinc-950/50 p-8 hover:-translate-y-1 transition-all duration-300">
                <Zap className="w-5 h-5 text-teal-500 mb-4" />

                <h4 className="text-white font-bold text-lg mb-3">
                  Ultra Low Latency
                </h4>

                <p className="text-sm leading-relaxed text-zinc-500">
                  Verification happens at the edge in under 10ms without slowing
                  your infrastructure.
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-900 bg-zinc-950/50 p-8 hover:-translate-y-1 transition-all duration-300">
                <Lock className="w-5 h-5 text-teal-500 mb-4" />

                <h4 className="text-white font-bold text-lg mb-3">
                  Cryptographic Security
                </h4>

                <p className="text-sm leading-relaxed text-zinc-500">
                  API keys are SHA-256 hashed with secure rotation and domain
                  protection support.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section
            id="quickstart"
            className="scroll-mt-32 border-b border-zinc-900 pb-24 space-y-10"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-teal-500 font-black">
                Quick Start
              </span>

              <h2 className="text-3xl font-black text-white tracking-tight">
                Get running in minutes
              </h2>

              <p className="text-zinc-500 max-w-2xl leading-relaxed">
                Install the SDK, add your API key, and verify incoming traffic.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Install SDK",
                  desc: "Install ShieldLimit into your Node.js environment.",
                },
                {
                  step: "02",
                  title: "Add API Key",
                  desc: "Create and securely store your project secret.",
                },
                {
                  step: "03",
                  title: "Verify Requests",
                  desc: "Protect your API routes instantly.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-3xl border border-zinc-900 bg-zinc-950/50 p-8 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-teal-500 text-sm font-black">
                    {item.step}
                  </span>

                  <h4 className="mt-4 text-white font-bold text-lg">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SDK */}
          <section
            id="sdk"
            className="scroll-mt-32 border-b border-zinc-900 pb-24 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-teal-500 font-black">
                SDK
              </span>

              <h2 className="text-3xl font-black text-white tracking-tight">
                Official Node.js SDK
              </h2>

              <p className="text-zinc-500 max-w-2xl leading-relaxed">
                The fastest way to integrate ShieldLimit into your Next.js or
                Node.js applications.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60">
              <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-900/30 px-5 py-3">
                <span className="font-mono text-xs text-zinc-500">
                  npm install @esbi/shieldlimit
                </span>

                <Terminal className="w-4 h-4 text-zinc-700" />
              </div>

              <div className="bg-black p-8 font-mono text-sm leading-8 text-zinc-400">
                <p className="text-teal-500">
                  import{" "}
                  <span className="text-white">{`{ ShieldLimit }`}</span> from
                  "@esbi/shieldlimit";
                </p>

                <p className="mt-4 text-zinc-600">
                  // Initialize ShieldLimit
                </p>

                <p>
                  const shield = new{" "}
                  <span className="text-white">ShieldLimit</span>(
                  process.env.SHIELD_KEY);
                </p>

                <p className="mt-4 text-zinc-600">
                  // Verify incoming request
                </p>

                <p>
                  const {`{ success, remaining }`} = await shield.verify();
                </p>
              </div>
            </div>
          </section>

          {/* API */}
          <section
            id="api"
            className="scroll-mt-32 border-b border-zinc-900 pb-24 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-teal-500 font-black">
                REST API
              </span>

              <h2 className="text-3xl font-black text-white tracking-tight">
                Standard REST Integration
              </h2>

              <p className="text-zinc-500 max-w-2xl leading-relaxed">
                Use ShieldLimit from any language using our verification
                endpoint.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/60 overflow-hidden">
              <div className="flex items-center gap-3 border-b border-zinc-900 bg-zinc-900/30 px-6 py-4">
                <span className="rounded bg-teal-500/10 px-2 py-1 text-[10px] font-black text-teal-500">
                  POST
                </span>

                <code className="text-xs text-zinc-300">
                  https://rate-limiter-swart.vercel.app/api/v1/verify
                </code>
              </div>

              <pre className="overflow-x-auto p-8 text-sm leading-8 text-zinc-500 font-mono bg-black">
{`curl -X POST https://rate-limiter-swart.vercel.app/api/v1/verify \\
  -H "x-shield-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
          </section>

          {/* Headers */}
          <section
            id="headers"
            className="scroll-mt-32 border-b border-zinc-900 pb-24 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-teal-500 font-black">
                Authentication
              </span>

              <h2 className="text-3xl font-black text-white tracking-tight">
                Request Headers
              </h2>

              <p className="text-zinc-500 max-w-2xl leading-relaxed">
                Include your project-specific API key in the request headers.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-900 bg-zinc-900/30 text-zinc-500">
                  <tr>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest">
                      Header
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest">
                      Required
                    </th>

                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest">
                      Description
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-900">
                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-5 font-mono text-xs text-teal-500 font-bold">
                      x-shield-key
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-teal-500/10 px-2 py-1 text-[10px] font-black text-teal-500">
                        REQUIRED
                      </span>
                    </td>

                    <td className="px-6 py-5 text-zinc-400 leading-relaxed">
                      Used to identify and authorize your incoming traffic.
                    </td>
                  </tr>

                  <tr className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-5 font-mono text-xs text-zinc-300">
                      Origin
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] font-black text-zinc-500">
                        OPTIONAL
                      </span>
                    </td>

                    <td className="px-6 py-5 text-zinc-400 leading-relaxed">
                      Must match whitelisted domains if protection is enabled.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Responses */}
          <section
            id="responses"
            className="scroll-mt-32 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-teal-500 font-black">
                Responses
              </span>

              <h2 className="text-3xl font-black text-white tracking-tight">
                Response Codes
              </h2>

              <p className="text-zinc-500 max-w-2xl leading-relaxed">
                ShieldLimit uses standard HTTP status codes to indicate request
                status.
              </p>
            </div>

            <div className="space-y-5">
              {responses.map((res) => (
                <div
                  key={res.code}
                  className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60 hover:border-zinc-800 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`absolute left-0 top-0 h-full w-1 ${res.color}`} />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-7">
                    <div>
                      <p className={`font-mono text-sm font-bold ${res.text}`}>
                        {res.code}
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        {res.desc}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-black">
                        {res.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Example JSON */}
            <div className="mt-14 overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950/60">
              <div className="border-b border-zinc-900 bg-zinc-900/30 px-5 py-3">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                  Example Response
                </span>
              </div>

              <pre className="overflow-x-auto bg-black p-8 text-sm leading-8 text-zinc-500 font-mono">
{`{
  "success": true,
  "remaining": 48,
  "resetAt": 1718299200
}`}
              </pre>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

          {/* CTA */}
          <section className="rounded-[2rem] border border-teal-500/10 bg-gradient-to-br from-teal-500/10 to-transparent p-14 text-center">
            <Rocket className="mx-auto mb-6 h-10 w-10 text-teal-500" />

            <h2 className="text-4xl font-black tracking-tight text-white">
              Ready to protect your API?
            </h2>

            <p className="mx-auto mt-5 max-w-md text-zinc-500 leading-relaxed">
              Join developers building secure, edge-first infrastructure with
              ShieldLimit.
            </p>

            <Button
              className="mt-10 rounded-full bg-white px-8 py-6 font-bold text-black hover:bg-zinc-200"
              asChild
            >
              <Link href="/dashboard/project">Create Free Account</Link>
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
}