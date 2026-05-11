"use client";

import { useState } from "react";
import { AlertOctagon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteProject } from "@/app/actions/project";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DangerZone({ projectId, projectName }: { projectId: string, projectName: string }) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteProject(projectId);
    
    if (res.success) {
      toast.success("Project deleted successfully");
      router.push("/dashboard/project");
    } else {
      toast.error("Failed to delete project. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-red-900/50 bg-red-950/5">
      <CardHeader>
        <CardTitle className="text-sm font-bold text-red-500 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4" /> Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs text-zinc-400 font-medium">
            Permanently delete this project and all its analytics.
          </p>
          <p className="text-[11px] text-zinc-500 italic">
            This action cannot be undone. Please type <span className="text-zinc-300 font-bold">{projectName}</span> to confirm.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Input 
            placeholder={projectName}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="bg-black border-zinc-800 text-white focus-visible:ring-red-900"
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                disabled={confirmText !== projectName || isDeleting}
                className="w-full font-semibold"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Project"
                )}
              </Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent className="bg-zinc-950 border-zinc-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  This will permanently delete the <span className="text-white font-bold">{projectName}</span> project, 
                  all associated API keys, and collected logs. This action is irreversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}