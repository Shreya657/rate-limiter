"use client";

import { useState, Dispatch, SetStateAction } from "react"; 
import { useFormStatus } from "react-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";
import { createProject } from "@/app/actions/project";
import { toast } from "sonner";
import SecretKeyModal from "./KeyModal"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface CreateProjectModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  variant?: "default" | "primary";
}

export default function CreateProjectModal({ 
  isOpen, 
  setIsOpen, 
  variant = "default" 
}: CreateProjectModalProps) {
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      const result = await createProject(formData);
      

      if (result.success) {
        setRawKey(result.rawKey);
        setIsOpen(false); 
        setIsSecretModalOpen(true); 
        toast.success("Shield Project Activated");
      }
    } catch (error) {
      toast.error("Failed to create project. Please check your inputs.");
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white border-2 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <ShieldCheck className="w-6 h-6 text-zinc-100" />
              Activate New Shield
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              Define your API protection parameters. You can change these later.
            </DialogDescription>
          </DialogHeader>

          <form action={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400">Project Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="e.g. Production API" 
                required 
                className="bg-black border-zinc-800 focus:border-white transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-400">Description (Optional)</Label>
              <Input 
                id="description" 
                name="description" 
                placeholder="Protected endpoints for my SaaS" 
                className="bg-black border-zinc-800 focus:border-white transition-all"
              />
            </div>

         <div className="grid grid-cols-2 gap-4">
  <div className="space-y-2 ">
    <Label className="text-zinc-400">Rate Limit (Requests)</Label>
    <Select name="limit" defaultValue="100" >
      <SelectTrigger className="bg-black border-zinc-800 text-white focus:ring-zinc-700">
        <SelectValue placeholder="Select limit" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300 focus:text-white">
        {[10, 25, 50, 100, 250, 500, 1000].map((num) => (
          <SelectItem key={num} value={num.toString()} className=" focus:text-white text-zinc-300 cursor-pointer transition-colors ">
            {num} req
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  <div className="space-y-2">
    <Label className="text-zinc-400">Window (Seconds)</Label>
    <Select name="window" defaultValue="60">
      <SelectTrigger className="bg-black border-zinc-800 text-white focus:ring-zinc-700">
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

            <SubmitButton />
          </form>
        </DialogContent>
      </Dialog>

    
      <SecretKeyModal 
        apiKey={rawKey || ""} 
        isOpen={isSecretModalOpen} 
        onClose={() => setIsSecretModalOpen(false)} 
      />
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-11"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
      {pending ? "Initializing Shield..." : "Activate Shield"}
    </Button>
  );
}