import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { FolderPlus } from "lucide-react";
import { prisma } from "../../../../utils/prisma";
import ProjectCard from "../../components/dashboard/projectCard";
import CreateProjectButton from "../../components/dashboard/createprojButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });


const image="/homey.jpeg";

console.log(
  "%c ",
  `
  font-size: 1px;
  padding: 200px 300px;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  `
);
  console.log("User session teri ma ki:", session); // Debugging line to check session data
  const projects = await prisma.project.findMany({
    where: { userId: session?.user.id },
 
    include: { 
      apiKeys: true, 
    _count: { select: { apiKeys: true } }
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-zinc-500">Manage your API protection shields.</p>
        </div>
        <CreateProjectButton />
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/50">
          <FolderPlus className="w-12 h-12 text-zinc-700 mb-4" />
          <h3 className="text-lg font-medium text-white">No projects yet</h3>
          <p className="text-zinc-500 mb-6">Create your first project to start rate limiting.</p>
          {/* <CreateProjectModal variant="primary" /> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}