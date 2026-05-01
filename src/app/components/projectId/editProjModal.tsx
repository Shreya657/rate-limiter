"use client";

import { useFormStatus } from "react-dom";
import { updateProject } from "@/app/actions/project";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Settings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditProjectModal({ project }: { project: any }) {
  async function handleUpdate(formData: FormData) {
    const res = await updateProject(project.id, formData);
    if (res.success) {
      toast.success("Shield Parameters Updated");
    } else {
      toast.error("Failed to update project");
    }
  }

  return (
    <>
    <Dialog>
        <DialogTrigger asChild>
        <Button variant="outline" className="border-zinc-800 bg-zinc-500 text-white hover:bg-zinc-200 hover:text-black transition-colors">
          <Settings2 className="w-4 h-4 mr-2" />
          Edit Project
        </Button>
      </DialogTrigger>
        
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-white" />
            Edit Shield Configuration
          </DialogTitle>
          
        </DialogHeader>

        <form action={handleUpdate} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-400">Project Name</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={project.name} // PRE-FILLED
              required 
              className="bg-black border-zinc-800 focus:border-white transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-400">Description</Label>
            <Input 
              id="description" 
              name="description" 
              defaultValue={project.description} 
              placeholder="Protected endpoints for my SaaS" 
              className="bg-black border-zinc-800 focus:border-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-400">Rate Limit (Requests)</Label>
              <Select name="limit" defaultValue={project.limit.toString()}> 
                <SelectTrigger className="bg-black border-zinc-800 text-white">
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300">
                  {[10, 25, 50, 100, 250, 500, 1000].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="focus:text-white">
                      {num} req
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          
            <div className="space-y-2">
              <Label className="text-zinc-400">Window (Seconds)</Label>
              <Select name="window" defaultValue={project.window.toString()}>
                <SelectTrigger className="bg-black border-zinc-800 text-white">
                  <SelectValue placeholder="Select window" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300">
                  {[1, 10, 30, 60, 120, 300, 600].map((sec) => (
                    <SelectItem key={sec} value={sec.toString()} className="focus:text-white">
                      {sec}s
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <EditSubmitButton />
        </form>
      </DialogContent>
    </Dialog>
    
    </>
  );
}

function EditSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-11"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
      {pending ? "Saving Changes..." : "Update Shield"}
    </Button>
  );
}