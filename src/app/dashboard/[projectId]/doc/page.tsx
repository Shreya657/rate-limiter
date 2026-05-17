"use client";



import { useState, useEffect, use } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import { Check, Copy, ShieldCheck, Terminal, AlertCircle, Zap, Globe, ShieldAlert, Code2, Info, Key } from "lucide-react";

import { Button } from "@/components/ui/button";



export default function PrivateDocs({ params }: { params: Promise<{ projectId: string }> }) {

  const { projectId } = use(params);

  const [projectData, setProjectData] = useState<any>(null);

  const [copied, setCopied] = useState<string | null>(null);



  useEffect(() => {

    async function loadDetails() {

      const res = await fetch(`/api/v1/projects/${projectId}`);

      const json = await res.json();

      setProjectData(json);

    }

    loadDetails();

  }, [projectId]);



  const handleCopy = (text: string, id: string) => {

    navigator.clipboard.writeText(text);

    setCopied(id);

    setTimeout(() => setCopied(null), 2000);

  };



  const sdkCode = `import { ShieldLimit } from "@esbi/shieldlimit";



const shield = new ShieldLimit(process.env.SHIELD_API_KEY);



export async function middleware(req) {

  const check = await shield.verify();

  

  if (!check.success) {

    return Response.json({ 

      error: check.error,

      retryAfter: check.retryAfter 

    }, { 

      status: check.status,

      headers: { 'Retry-After': String(check.retryAfter) }

    });

  }

}`;





const fetchCode = `const response = await fetch("https://rate-limiter-swart.vercel.app/api/v1/verify", {
  method: "POST",
  headers: {
    "x-shield-key": "YOUR_SECRET_KEY",
    "Content-Type": "application/json",
    "Origin": "yourdomain.com" // Required if whitelisting is enabled
  }
});

const data = await response.json();

if (!response.ok) {
  console.log(\`Blocked: \${data.error}. Retry in \${data.retryAfter}s\`);
}`;



  return (

    <div className="min-h-screen bg-black text-zinc-300 selection:bg-teal-500/30 pb-32">

      <div className="border-b border-zinc-900 bg-zinc-950/50">

        <header className="max-w-4xl mx-auto px-6 py-16 space-y-4">

          <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-[0.2em]">

            <Globe className="w-3 h-3" /> Dashboard / Projects / Documentation

          </div>

          <h1 className="text-5xl font-black text-white tracking-tight">

            Protecting <span className="text-teal-500">{projectData?.name || "..."}</span>

          </h1>

          <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">

            Everything you need to integrate ShieldLimit into your application. Follow the 3-step guide below to secure your API routes.

          </p>

        </header>

      </div>



      <div className="max-w-4xl mx-auto px-6 pt-16 space-y-24">

        

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-950 border border-zinc-900 rounded-3xl p-8">

            <div className="space-y-2">

                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Base Endpoint</p>

                <code className="text-xs text-teal-400 font-mono">https://rate-limiter-swart.vercel.app/api/v1/verify</code>

            </div>

            <div className="space-y-2">

                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Auth Method</p>

                <p className="text-xs text-zinc-300 font-mono flex items-center gap-2">

                    <Key className="w-3 h-3 text-teal-500" /> x-shield-key (Header)

                </p>

            </div>

            <div className="space-y-2">

                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Protocol</p>

                <p className="text-xs text-zinc-300 font-mono">POST (application/json)</p>

            </div>

        </section>



        <section className="space-y-8">

          <div className="flex items-center gap-4">

            <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-500 text-black text-sm font-black shadow-[0_0_20px_rgba(20,184,166,0.3)]">01</span>

            <h2 className="text-3xl font-bold text-white">Install the SDK</h2>

          </div>

          <p className="text-zinc-500 ml-14">Our Node.js SDK is the recommended way to use ShieldLimit. It handles automatic origin detection and latency-optimized verification.</p>

          <div className="ml-14 relative group">

            <pre className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-mono text-teal-500 flex justify-between items-center group-hover:border-teal-500/50 transition-all">

              <code>npm install @esbi/shieldlimit</code>

              <Button variant="ghost" size="icon" onClick={() => handleCopy("npm install @esbi/shieldlimit", "install")}>

                {copied === 'install' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-zinc-600" />}

              </Button>

            </pre>

          </div>

        </section>



        <section className="space-y-8">

          <div className="flex items-center gap-4">

            <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-500 text-black text-sm font-black shadow-[0_0_20px_rgba(20,184,166,0.3)]">02</span>

            <h2 className="text-3xl font-bold text-white">Choose Your Method</h2>

          </div>

          

          <Tabs defaultValue="sdk" className="ml-14 w-full">

            <TabsList className="bg-zinc-950 border border-zinc-900 p-1 h-14 mb-8">

              <TabsTrigger value="sdk" className=" text-white gap-2 px-8 py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white transition-all rounded-lg">

                <Code2 className="w-4 h-4 text-white" /> Official SDK

              </TabsTrigger>

              <TabsTrigger value="fetch" className=" text-white gap-2 px-8 py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white transition-all rounded-lg">

                <Terminal className="w-4 h-4 text-white" /> REST API

              </TabsTrigger>

            </TabsList>



            <TabsContent value="sdk" className="mt-0">

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 border-b border-zinc-800">

                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Next.js Middleware Example</span>

                    <Button variant="ghost" size="icon" onClick={() => handleCopy(sdkCode, 'sdk')}>

                        {copied === 'sdk' ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}

                    </Button>

                </div>

                <pre className="p-8 text-[13px] font-mono text-zinc-400 overflow-x-auto leading-relaxed">

                  <code>{sdkCode}</code>

                </pre>

              </div>

            </TabsContent>



              <TabsContent value="fetch" className="mt-0">

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden">

                <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 border-b border-zinc-800">

                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Next.js Middleware Example</span>

                    <Button variant="ghost" size="icon" onClick={() => handleCopy(fetchCode, 'fetch')}>

                        {copied === 'fetch' ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}

                    </Button>

                </div>

                <pre className="p-8 text-[13px] font-mono text-zinc-400 overflow-x-auto leading-relaxed">

                  <code>{fetchCode}</code>

                </pre>

              </div>

            </TabsContent>


          </Tabs>

        </section>




        <section className="space-y-8">

            <div className="flex items-center gap-4">

                <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-500 text-black text-sm font-black shadow-[0_0_20px_rgba(20,184,166,0.3)]">03</span>

                <h2 className="text-3xl font-bold text-white">Understand Responses</h2>

            </div>

            <div className="ml-14 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* <div className="space-y-4">

                    <div className="flex items-center gap-2 text-teal-500 font-bold text-[10px] uppercase">

                        <Zap className="w-3 h-3" /> Success (200)

                    </div>

                    <div className="p-6 rounded-3xl bg-teal-500/5 border border-teal-500/10 font-mono text-xs text-zinc-400">

                        {`{ "success": true, "remaining": 99 }`}

                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed">Returned when the request is valid and within your project's sliding window rate limit.</p>

                </div> */}

                {/* <div className="space-y-4">

                    <div className="flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase">

                        <ShieldAlert className="w-3 h-3" /> Blocked (429/403)

                    </div>

                    <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 font-mono text-xs text-zinc-400">

                        {`{ "error": "Rate limit exceeded", "retryAfter": 35 }`}

                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed">Returned when the request is spammed or the origin is not whitelisted.</p>

                </div> */}



                 <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50">

                  <div className="flex items-center gap-2 mb-4 text-teal-500">

                    <Zap className="w-4 h-4" />

                    <span className="text-[10px] font-bold uppercase tracking-widest">Success (200)</span>

                  </div>

                  <pre className="text-xs text-zinc-400 font-mono leading-6">

                    {`{

  "success": true,

  "remaining": 99,

  "limit": 100

}`}

                  </pre>
                  

                </div>
                

                <div className="p-3 rounded-2xl border border-zinc-900 bg-zinc-950/50 border-red-900/20">

                  <div className="flex items-center gap-2 mb-4 text-red-500">

                    <ShieldAlert className="w-4 h-4" />

                    <span className="text-[10px] font-bold uppercase tracking-widest">Blocked (429/403)</span>

                  </div>

                  <pre className="text-xs text-zinc-400 font-mono leading-6">

                    {`{

  "error": "Rate limit exceeded",

  "retryAfter": 35,

  "reset": 1778603700000

}`}

                  </pre>

                </div>

            

            </div>

        </section>




        <div className="ml-14 p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex gap-6 items-start">

            <div className="p-3 bg-amber-500/10 rounded-2xl">

                <AlertCircle className="w-6 h-6 text-amber-500" />

            </div>

            <div className="space-y-2">

                <h4 className="text-white font-bold">Domain Protection Note</h4>

                <p className="text-sm text-zinc-500 leading-relaxed">

                    If you have enabled **Domain Whitelisting** in your project settings, our edge servers will verify the <code className="text-amber-500 font-mono text-xs">Origin</code> header. Ensure your client application sends this header correctly.

                </p>

            </div>

        </div>



      </div>

    </div>

  );

}