"use client";

import { useState, useEffect, use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy,  ShieldCheck, Terminal,  AlertCircle, Zap, Globe,  ShieldAlert } from "lucide-react";
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
  // Automatically detects origin for whitelisting
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

  console.log(\`Success! Requests remaining: \${check.remaining}\`);
}`;

  const fetchCode = `const response = await fetch("https://shield-limit.vercel.app/api/v1/verify", {
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
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-20 bg-black min-h-screen text-zinc-100 font-sans">
      <header className="space-y-2 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-teal-500 font-bold text-xs uppercase tracking-[0.2em]">
           <Globe className="w-3 h-3" /> Implementation Guide
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Protecting <span className="text-teal-500">{projectData?.name || "Project"}</span>
        </h1>
        <p className="text-zinc-500 text-base max-w-2xl">
          Deploy cryptographically secure rate limiting and origin protection in less than 2 minutes using our native SDK or standard Fetch API.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-16">
          
        
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-500 text-black text-xs font-black">1</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Install Dependency</h2>
            </div>
            <div className="ml-10 relative group">
              <pre className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm font-mono text-teal-500 flex justify-between items-center">
                <code>npm install @esbi/shieldlimit</code>
                <Button variant="ghost" size="icon" onClick={() => handleCopy("npm install @esbi/shieldlimit", "install")}>
                  {copied === 'install' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-zinc-600" />}
                </Button>
              </pre>
            </div>
          </section>

      
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-500 text-black text-xs font-black">2</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Integration Methods</h2>
            </div>

            <Tabs defaultValue="sdk" className="w-full ml-10">
              <TabsList className="bg-zinc-900 border border-zinc-800 p-1 h-12">
                <TabsTrigger value="sdk" className="gap-2 px-6 text-white">
                  <ShieldCheck className="w-4 h-4 text-white" /> Official SDK
                </TabsTrigger>
                <TabsTrigger value="fetch" className="gap-2 px-6 text-white">
                  <Terminal className="w-4 h-4 text-white" /> cURL / Fetch
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sdk" className="mt-6">
                <div className="p-1 rounded-xl bg-gradient-to-b from-zinc-800 to-transparent">
                  <div className="p-6 rounded-[10px] bg-zinc-950 relative">
                    <Button 
                      size="icon" variant="ghost" 
                      className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                      onClick={() => handleCopy(sdkCode, 'sdk')}
                    >
                      {copied === 'sdk' ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <pre className="text-[13px] font-mono text-zinc-400 overflow-x-auto leading-relaxed">
                      <code>{sdkCode}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fetch" className="mt-6">
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 relative">
                    <Button 
                      size="icon" variant="ghost" 
                      className="absolute top-4 right-4 text-zinc-500"
                      onClick={() => handleCopy(fetchCode, 'fetch')}
                    >
                      {copied === 'fetch' ? <Check className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <pre className="text-[13px] font-mono text-zinc-400 overflow-x-auto">
                      <code>{fetchCode}</code>
                    </pre>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          <section className="space-y-10">
             <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-500 text-black text-xs font-black">3</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Response Handling</h2>
            </div>
            <div className="ml-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* sidebar */}
        <aside className="space-y-10 pl-9">
           <Card className="bg-zinc-950 border-zinc-800 shadow-2xl">
              <CardHeader className="border-b border-zinc-800 bg-zinc-900/50">
                <CardTitle className="text-xs font-bold flex items-center gap-2 text-zinc-400 uppercase tracking-tighter">
                  <Terminal className="w-4 h-4 text-teal-500" /> API Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase">Base Endpoint</p>
                    <code className="text-[11px] font-mono text-teal-400 break-all bg-teal-500/5 p-1 rounded">https://shieldlimit.com/api/v1/verify</code>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase">Method</p>
                      <span className="text-xs font-bold text-white bg-zinc-800 px-2 py-1 rounded">POST</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase">Auth</p>
                      <span className="text-xs font-bold text-white bg-zinc-800 px-2 py-1 rounded">Header</span>
                    </div>
                 </div>
                 <div className="space-y-2 pt-4 border-t border-zinc-900">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase mb-2">Custom Headers</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-black p-2 rounded border border-zinc-900">
                        <span className="text-[10px] font-mono text-zinc-400">x-shield-key</span>
                        <span className="text-[10px] text-zinc-600 italic">Secret Key</span>
                      </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="p-6 rounded-2xl border border-amber-900/20 bg-amber-500/5 space-y-3">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase">
                <AlertCircle className="w-4 h-4" />
                Security Note
              </div>
              <p className="text-[11px] text-amber-200/60 leading-relaxed">
                If <span className="text-amber-500 font-bold">Domain Whitelisting</span> is enabled, ensure your client or server sends a valid <code className="text-amber-400">Origin</code> header.
              </p>
           </div>
        </aside>
      </div>
    </div>
  );
}