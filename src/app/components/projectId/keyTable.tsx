"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Power, Trash2, Fingerprint } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { deleteKey, toggleKeyStatus } from "@/app/actions/ApiKeys";

export default function KeyTable({ keys, projectId }: { keys: any[], projectId: string }) {
  const router = useRouter();

  const onToggle = async (keyId: string, currentStatus: boolean) => {
    const res = await toggleKeyStatus(projectId, keyId, currentStatus);
    if (res.success) {
      toast.success(currentStatus ? "Key Deactivated" : "Key Activated");
      router.refresh();
    }
  };

  const onDelete = async (keyId: string) => {
    if (confirm("Permanently delete this key? This will immediately break any application using it.")) {
      const res = await deleteKey(projectId, keyId);
      if (res.success) {
        toast.success("Key deleted");
        router.refresh();
      }
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-900/50">
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="text-zinc-400">Name</TableHead>
            <TableHead className="text-zinc-400">Fingerprint</TableHead>
            <TableHead className="text-zinc-400">Status</TableHead>
            <TableHead className="text-zinc-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((k) => (
            <TableRow key={k.id} className="border-zinc-800 hover:bg-zinc-900/30 transition-colors">
              <TableCell className="font-medium text-white">{k.name}</TableCell>
              <TableCell className="font-mono text-[10px] text-zinc-500">
                sl_••••••••{k.key.slice(-4)}
              </TableCell>
              <TableCell>
                <Badge className={cn(
                  "border-none",
                  k.isActive 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-zinc-800 text-zinc-500"
                )}>
                  {k.isActive ? "Active" : "Revoked"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:text-white"
                  onClick={() => onToggle(k.id, k.isActive)}
                >
                  <Power className={cn("h-4 w-4", k.isActive ? "text-emerald-500" : "text-zinc-600")} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:text-red-500 hover:bg-red-500/10"
                  onClick={() => onDelete(k.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}