"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Folder } from "lucide-react";

export function ProjectSelector({ projects, onSelect, currentProjectId }: any) {
  // find the active project name to show as a fallback
  const activeProject = projects?.find((p: any) => p.id === currentProjectId);
  console.log("activeProject", projects);

  return (
    <div className="flex items-center gap-2 relative z-[100]">
      <Folder className="w-4 h-4 text-muted-foreground" />
      <Select 
        value={currentProjectId} 
        onValueChange={onSelect}
        disabled={!projects || projects.length === 0} 
      >
        <SelectTrigger className="w-[200px] text-white bg-zinc-900 border-zinc-800 shadow-md">
          <SelectValue>
            {activeProject ? activeProject.name : "Select Project"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-[110]">
          {projects?.map((project: any) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}