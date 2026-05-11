"use client";

import { useState } from "react";
import { Key, RefreshCw, Copy, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export function KeySettings({ keys, projectId }: { keys: any[], projectId: string }) {
  const [newKey, setNewKey] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [copied, setCopied] = useState(false);

  const rotateKey = async (keyId: string) => {
    setIsRotating(true);
    try {
      const res = await fetch(`/api/v1/projects/${projectId}/keys/${keyId}/rotate`, { method: "POST" });
      const data = await res.json();
      console.log("data: ",data);
      setNewKey(data.newKey);
      toast.success("Key rotated! Copy it now.");
    } catch (err) {
      toast.error("Rotation failed");
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white flex items-center gap-2 px-1">
        <Key className="w-4 h-4 text-teal-500" /> API Access Keys
      </h3>
      {keys.map((k) => (
        <Card key={k.id} className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-white">{k.name}</p>
              <p className="text-[10px] font-mono text-zinc-600 tracking-tighter">sh_live_••••••••••••••••</p>
            </div>

            <Dialog onOpenChange={(open) => !open && setNewKey(null)}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs border-zinc-800 hover:bg-zinc-900">Rotate</Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="text-amber-500 w-5 h-5" /> Rotate API Key
                  </DialogTitle>
                  <DialogDescription className="text-zinc-500">
                    This will immediately invalidate your current key. Any apps using it will stop working.
                  </DialogDescription>
                </DialogHeader>

                {!newKey ? (
                  <Button onClick={() => rotateKey(k.id)} disabled={isRotating} className="bg-amber-600 hover:bg-amber-700">
                    {isRotating ? "Generating..." : "I understand, rotate key"}
                  </Button>
                ) : (
                 <div className="space-y-4 pt-4">
  <div className="relative group rounded-xl bg-teal-500/5 border border-teal-500/20 p-4 transition-all hover:bg-teal-500/10">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0"> 
        <p className="text-[10px] font-bold text-teal-500/50 uppercase tracking-widest mb-2">New Secret Key</p>
        <code className="text-sm text-teal-400 font-mono break-all leading-relaxed block">
          {newKey}
        </code>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="shrink-0 h-8 w-8 text-teal-500 hover:text-teal-400 hover:bg-teal-500/20"
        onClick={() => {
          navigator.clipboard.writeText(newKey || "");
          setCopied(true);
          toast.success("Copied to clipboard");
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? (
          <Check className="w-4 h-4 animate-in zoom-in duration-300" />
        ) : (
          <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
      </Button>
    </div>
  </div>

  <div className="flex items-center gap-2 px-1">
    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
    <p className="text-[11px] text-zinc-500 italic font-medium">
      Make sure to copy this now. For security, we won't show it again.
    </p>
  </div>
</div>

                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}