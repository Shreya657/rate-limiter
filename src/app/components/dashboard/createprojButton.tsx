"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateProjectModal from "./createprojectModal";

export default function CreateProjectButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-white text-black hover:bg-zinc-200 transition-all font-medium px-4 h-10 gap-2"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">New Project</span>
      </Button>

      <CreateProjectModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
      />
    </>
  );
}