import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import EditProjectModal from "@/app/components/projectId/editProjModal";
import CreateKeyButton from "@/app/components/projectId/createKeyBtn";
import KeyTable from "@/app/components/projectId/keyTable";
import { prisma } from "../../../../../utils/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    
    where: { id: projectId, userId: session?.user.id },
    include: { apiKeys: { orderBy: { createdAt: 'desc' } } }
  });

  if (!project) return notFound();

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-8">
        <div>
             <Link
                        href="/dashboard/project" 
                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8 group"
                      >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        
                      </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">{project.name}</h1>
         <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700 font-mono">
              ID: {project.id.slice(0, 8)}...{project.id.slice(-4)}
            </Badge>
             
          </div>
          <p className="text-zinc-500 text-lg">{project.description || "No description provided."}</p>
        </div>
        <EditProjectModal project={project} />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">API Keys</h2>
          <CreateKeyButton projectId={project.id} />
        </div>
        <KeyTable keys={project.apiKeys} projectId={project.id} />
      </div>
    </div>
  );
}