import { Button } from "@/components/ui/button";
import { Plus, ShieldPlus } from "lucide-react";
import Link from "next/link";

export default function StatsPage() {
     return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div className="p-6 rounded-3xl bg-teal-500/5 border border-teal-500/10 mb-6">
          <ShieldPlus className="w-12 h-12 text-teal-500" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Create your first Shield</h2>
        <p className="text-zinc-500 mt-2 max-w-sm">
          You don't have any projects yet. Create one to start monitoring your API traffic in real-time.
        </p>
        <Button className="mt-8 bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-12 font-bold" asChild>
          <Link href="/dashboard/project">
            <Plus className="w-4 h-4 mr-2" /> Create Project
          </Link>
        </Button>
      </div>
    );
    }