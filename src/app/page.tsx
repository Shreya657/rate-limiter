"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowRight, Code2, Zap, Shield } from "lucide-react";
import Navbar from "./components/NavBar";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <main className="min-h-screen bg-black text-zinc-200 selection:bg-white selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            V1.0 Now Live: Open Source API Protection
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent mb-6">
            Shield Your API
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A developer-first rate limiting service. Secure your endpoints with high-performance Redis caching and flexible policy management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isPending ? (
              <Button disabled className="bg-zinc-800 w-40 h-12 animate-pulse" />
            ) : session ? (
              <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 hover:text-white h-12 px-8 group">
                <Link href="/dashboard/project" className="flex items-center gap-2">
                  Enter Workspace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 hover:text-white h-12 px-8">
                  <Link href="/sign-up">Start Building Free</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-zinc-800 bg-zinc-900 hover:text-black text-white h-12 px-8" asChild>
                  <Link href="https://github.com" target="_blank">Documentation</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Zap className="w-5 h-5" />, title: "Ultra Low Latency", desc: "Powered by Redis for sub-millisecond overhead on every request." },
          { icon: <Shield className="w-5 h-5" />, title: "DDoS Protection", desc: "Smart filtering to ensure your infrastructure stays up during surges." },
          { icon: <Code2 className="w-5 h-5" />, title: "Easy Integration", desc: "Native SDKs for Next.js, Node, and Go. Up in 5 minutes." },
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/50 hover:border-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white mb-4">
              {feature.icon}
            </div>
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}