"use client"
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Key, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject } from "@/app/actions/project";

export default function ProjectCard({ project }: { project: any }) {
  return (
 <Link href={`/dashboard/project/${project.id}`} className="h-full">
      <Card className="group relative flex flex-col h-full overflow-hidden border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/60">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-white group-hover:text-black transition-colors">
            <Zap className="w-5 h-5" />
          </div>
          <Badge variant="outline" className="text-[10px] uppercase border-zinc-700 text-zinc-400">
            {project.limit} REQ / {project.window}S
          </Badge>
      <Button 
  variant="ghost" 
  size="icon" 
  className="h-8 w-8 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-colors z-20"
  onClick={async (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    const confirmed = confirm("Delete this project? All associated keys will be revoked.");
    
    if (confirmed) {
      const result = await deleteProject(project.id);
      if (result.success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
  }}
>
  <Trash2 className="h-4 w-4" />
</Button>
        </div>
        
        {/* grow to push the footer to the bottom */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
          <p className="text-sm text-zinc-500 line-clamp-2 min-h-[2.5rem]">
            {project.description || "No description provided"}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Key className="w-3 h-3" />
            {project._count.apiKeys} Keys
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>

  );
}