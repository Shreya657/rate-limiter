"use client";

import { createNewKey } from "@/app/actions/ApiKeys";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import SecretKeyModal from "../dashboard/KeyModal";

export default function CreateKeyButton({ projectId }: { projectId: string }) {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [rawKey, setRawKey] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const res = await createNewKey(projectId, keyName || "Default Key");
    
    if (res.success && res.rawKey) {
      setRawKey(res.rawKey);
      setIsInputOpen(false); 
    }
    setIsGenerating(false);
  };

  return (
    <>
      <Dialog open={isInputOpen} onOpenChange={setIsInputOpen}>
        <DialogTrigger asChild>
          <Button className="bg-white text-black hover:bg-zinc-200">
            <Plus className="w-4 h-4 mr-2" /> Generate Key
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Name your API Key</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleGenerate} className="space-y-4">
            <Input 
              placeholder="e.g. Production Key" 
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="bg-black border-zinc-800"
              autoFocus
            />
            <Button 
              type="submit" 
              disabled={isGenerating || !keyName} 
              className="w-full bg-zinc-100 text-black"
            >
              {isGenerating ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              {isGenerating ? "Generating..." : "Create Secret Key"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <SecretKeyModal 
        apiKey={rawKey || ""} 
        isOpen={!!rawKey} 
        onClose={() => setRawKey(null)} 
      />
    </>
  );
}