import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { prisma } from "../../../../utils/prisma";

export default async function MyShieldsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const projects = await prisma.project.findMany({
    where: { userId: session?.user.id },
    include: { _count: { select: { apiKeys: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">My Shields</h1>
        <p className="text-zinc-500">A detailed overview of all your protection layers.</p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400">Project</TableHead>
              <TableHead className="text-zinc-400">Configuration</TableHead>
              <TableHead className="text-zinc-400">Keys</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-right text-zinc-400">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="border-zinc-800 hover:bg-zinc-900/30 transition-colors">
                <TableCell>
                  <Link href={`/dashboard/project/${project.id}`} className="group">
                    <div className="font-medium text-white group-hover:underline">
                      {project.name}
                    </div>
                    <div className="text-xs text-zinc-500 truncate max-w-[200px]">
                      {project.description || "No description"}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-zinc-400 font-mono text-xs">
                  {project.limit} req / {project.window}s
                </TableCell>
                <TableCell className="text-zinc-400">
                  {project._count.apiKeys} keys
                </TableCell>
                <TableCell>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none">
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/project/${project.id}`}>
                    <ChevronRight className="h-4 w-4 text-zinc-600 inline hover:text-white" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}