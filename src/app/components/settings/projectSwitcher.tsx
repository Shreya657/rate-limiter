"use client";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
}

export function ProjectSwitcher({ 
  allProjects, 
  currentProjectName 
}: { 
  allProjects: Project[], 
  currentProjectName: string 
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800">
      <span className="text-[10px] text-zinc-500 uppercase font-black pl-2">Context</span>
      <Select onValueChange={(id) => router.push(`/dashboard/${id}/settings`)}>
        <SelectTrigger className="w-[180px] h-8 bg-zinc-950 border-zinc-800 text-white text-xs">
          <SelectValue placeholder={currentProjectName} />
        </SelectTrigger>
        <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
          {allProjects.map((p) => (
            <SelectItem key={p.id} value={p.id} className="text-xs focus:bg-teal-500/10">
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}