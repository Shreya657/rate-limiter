"use client";

import { useState } from "react";
import { X, Plus, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WhitelistSettings({ initialOrigins, projectId }: { initialOrigins: string[], projectId: string }) {
  const [origins, setOrigins] = useState<string[]>(initialOrigins);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const saveWhitelist = async (newOrigins: string[]) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/v1/projects/${projectId}/whiteList`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origins: newOrigins }),
      });
      if (!res.ok) 
        throw new Error();
      toast.success("Whitelist updated successfully");
    } catch (err) {
      toast.error("Failed to sync domains");
    } finally {
      setIsUpdating(false);
    }
  };

  const addOrigin = () => {
    const domain = inputValue.trim().toLowerCase().replace(/^(https?:\/\/)/, "");
    if (!domain)
       return;
    if (origins.includes(domain))
       return toast.error("Domain already exists");
    
    const updated = [...origins, domain];
    setOrigins(updated);
    setInputValue("");
    saveWhitelist(updated);
  };

  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-white">
          <Globe className="w-4 h-4 text-teal-500" /> Domain Whitelisting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-zinc-500">Requests will only be accepted from these domains. Leave empty to allow all.</p>
        <div className="flex gap-2">
          <Input 
            placeholder="example.com" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-black border-zinc-800 text-zinc-300"
          />
          <Button onClick={addOrigin} disabled={isUpdating} variant="secondary" size="sm">
            {isUpdating ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {origins.map((o) => (
            <span key={o} className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full text-[11px] text-teal-400">
              {o} <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => {
                const updated = origins.filter(x => x !== o);
                setOrigins(updated);
                saveWhitelist(updated);
              }} />
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}