import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../../../utils/prisma";

import { WhitelistSettings } from "@/app/components/settings/whitelistSettings";
import { KeySettings } from "@/app/components/settings/keySettings";
import { DangerZone } from "@/app/components/settings/dangerZone";
import { ProjectSwitcher } from "@/app/components/settings/projectSwitcher";

export default async function SettingsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) redirect("/login");

  const [project, allProjects] = await Promise.all([
    prisma.project.findUnique({
      where: { id: projectId, userId: session.user.id },
      include: {
        apiKeys: {
          select: {
            id: true,
            name: true,
            key: true,
            createdAt: true,
          }
        }
      }
    }),
    prisma.project.findMany({
      where: { userId: session.user.id },
      select: { id: true, name: true }
    })
  ]);

  if (!project) redirect("/dashboard");

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 min-h-screen bg-black">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Project Settings</h1>
          <p className="text-zinc-500 text-sm">Configure security and access for {project.name}</p>
        </div>
        
        <ProjectSwitcher 
          allProjects={allProjects} 
          currentProjectName={project.name} 
        />
      </div>

      <div className="space-y-12">
        <WhitelistSettings 
          initialOrigins={project.allowedOrigins} 
          projectId={projectId} 
        />

        <KeySettings 
          keys={project.apiKeys} 
          projectId={projectId} 
        />

        <DangerZone 
          projectId={projectId} 
          projectName={project.name} 
        />
      </div>
    </div>
  );
}