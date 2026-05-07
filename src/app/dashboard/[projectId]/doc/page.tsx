"use client";

import { useState, useEffect, use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, Code2, ShieldCheck, Terminal, Info, AlertCircle, Zap, Globe, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivateDocs({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const [projectData, setProjectData] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);
  console.log("Received projectId as prop:", projectId); // Debug log to verify projectId reception

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

  const sdkCode = `import { Shield } from "@shield-limit/node";

const shield = new Shield({
  apiKey: process.env.SHIELD_KEY
});

// Implementation in Next.js Middleware
export async function middleware(req) {
  const { authorized, reason } = await shield.verify();
  
  if (!authorized) {
    return Response.json({ error: reason }, { status: 429 });
  }
}`;

  const fetchCode = `const verify = await fetch("https://shield-limit.vercel.app/api/v1/verify", {
  method: "POST",
  headers: {
    "x-shield-key": "YOUR_SECRET_KEY",
    "Content-Type": "application/json",
  }
});

const status = await verify.json();`;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-20 bg-black min-h-screen text-zinc-100">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-widest">
           <Globe className="w-3 h-3" /> API Documentation
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Integrating Project:  <span className="text-teal-500 font-extrabold">{projectData?.name || ""}</span>
        </h1>
        <p className="text-zinc-400 text-sm">
          Follow these steps to deploy ShieldLimit's edge protection to your production environment.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-12">
          
       
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-black text-xs font-bold">1</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Authentication</h2>
            </div>
            <p className="text-sm text-zinc-400 pl-8 leading-relaxed">
              Every request to ShieldLimit must be authenticated using the <code className="text-teal-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">x-shield-key</code> header. 
            </p>
            <div className="ml-8 bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex gap-3 items-center">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <span className="font-bold text-amber-500">Important:</span> Your keys are cryptographically hashed. If you lose your secret key, you must rotate it in the <span className="text-white underline cursor-pointer">Project Settings</span>.
              </p>
            </div>
          </section>

    
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-black text-xs font-bold">2</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Integration Methods</h2>
            </div>

            <Tabs defaultValue="sdk" className="w-full ml-8">
              <TabsList className="bg-zinc-900 border border-zinc-800 p-1 h-12">
                <TabsTrigger value="sdk" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 gap-2 px-4 transition-all">
                  <ShieldCheck className="w-4 h-4" /> Node.js SDK
                </TabsTrigger>
                <TabsTrigger value="fetch" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 gap-2 px-4 transition-all">
                  <Terminal className="w-4 h-4" /> Standard Fetch
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sdk" className="mt-6 space-y-4">
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 relative group">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-4 right-4 z-20 text-zinc-500 hover:text-white"
                    onClick={() => handleCopy(sdkCode, 'sdk')}
                  >
                    {copied === 'sdk' ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-zinc-100">@shield-limit/node (Alpha)</h4>
                  </div>
                  <pre className="p-4 bg-black rounded-lg border border-zinc-900 text-xs font-mono text-zinc-400 overflow-x-auto leading-relaxed">
                    <code>{sdkCode}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="fetch" className="mt-6">
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 relative group">
                   <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-1 right-9 z-20 text-zinc-500 "
                    onClick={() => handleCopy(fetchCode, 'fetch')}
                  >
                    {copied === 'fetch' ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4 hover:text-black" />}
                  </Button>
                  <h4 className="text-sm font-bold text-zinc-100 mb-4">Generic HTTP Integration</h4>
                  <pre className="p-4 bg-black rounded-lg border border-zinc-900 text-xs font-mono text-zinc-400 overflow-x-auto leading-relaxed">
                    <code>{fetchCode}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </section>


          <section className="space-y-4">
             <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-black text-xs font-bold">3</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Response Schema</h2>
            </div>
            <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/50 hover:border-teal-500/30 transition-colors">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-3 tracking-widest">Authorized Response</p>
                  <pre className="text-xs text-teal-400 font-mono">
                    {`{
  "status": "authorized",
  "remaining": 499,
  "reset": "1h"
}`}
                  </pre>
               </div>
               <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/50 hover:border-red-500/30 transition-colors">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-3 tracking-widest">Blocked Response</p>
                  <pre className="text-xs text-red-400 font-mono">
                    {`{
  "status": "blocked",
  "reason": "rate_limit",
  "retry_after": "30s"
}`}
                  </pre>
               </div>
            </div>
          </section>

        </div>

     
        <aside className="space-y-6">
           <Card className="bg-zinc-950 border-zinc-800 border-l-4 border-l-teal-500 shadow-2xl overflow-hidden">
              <CardHeader className="bg-zinc-900/30">
                <CardTitle className="text-sm flex items-center gap-2 text-white">
                  <Info className="w-4 h-4 text-teal-500" />
                  API Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase">Endpoint</p>
                    <p className="text-[11px] font-mono text-zinc-300 break-all leading-relaxed">https://shield-limit.vercel.app/api/v1/verify</p>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase">Method</p>
                    <div className="inline-block px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-teal-500">POST</div>
                 </div>
                 <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase">Required Headers</p>
                    <p className="text-[11px] font-mono text-zinc-300">x-shield-key, Content-Type</p>
                 </div>
              </CardContent>
           </Card>

           <div className="p-5 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black space-y-4">
              <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                <Activity className="w-4 h-4 text-teal-500" />
                Live Status
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                 <span className="text-[11px] text-zinc-400">Systems Operational</span>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}