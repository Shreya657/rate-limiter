"use client";

import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center border-2 border-dashed rounded-xl border-muted-foreground/20">
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-orange-100 text-orange-600">
        <Terminal className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold">No Traffic Detected</h3>
      <p className="max-w-xs mt-2 text-sm text-muted-foreground">
        We haven't received any requests for this project yet. Try hitting your /verify endpoint to see live stats.
      </p>
      <div className="mt-6 p-4 bg-zinc-950 rounded-lg text-left overflow-x-auto w-full max-w-md">
        <code className="text-xs text-teal-400">
          curl -X POST https://your-api.com/api/v1/verify \<br/>
          &nbsp;&nbsp;-H "x-shield-key: YOUR_API_KEY"
        </code>
      </div>
    </div>
  );
}