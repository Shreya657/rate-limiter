"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function SecretKeyModal({ apiKey, isOpen, onClose }: { apiKey: string, isOpen: boolean, onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-500">
            <AlertTriangle className="w-5 h-5" /> Save your API Key
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            This key will only be shown once. If you lose it, you'll need to generate a new one.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 bg-black p-2 rounded-lg border border-zinc-800 mt-4">
          <Input readOnly value={apiKey} className="bg-transparent border-none focus-visible:ring-0 font-mono text-sm" />
          <Button size="icon" variant="ghost" onClick={copyToClipboard} className="hover:bg-zinc-900">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <Button onClick={onClose} className="w-full mt-4 bg-white text-black hover:bg-zinc-200">
          I've saved it
        </Button>
      </DialogContent>
    </Dialog>
  );
}