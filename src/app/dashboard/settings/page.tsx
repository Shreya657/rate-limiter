import { auth } from "@/lib/auth";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/dist/server/request/headers";
import { prisma } from "../../../../utils/prisma";
import {  Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SettingsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) redirect("/login");

  const allProjects = await prisma.project.findMany({
    where: { userId: session.user.id },
    select: { id: true, name: true }
  });

  if (allProjects.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 mb-6">
          <Settings className="w-12 h-12 text-zinc-600" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">No Project Found</h2>
        <p className="text-zinc-500 mt-2 max-w-md leading-relaxed">
          Settings are project-specific. Once you create your first Shield, you'll be able to manage API keys, whitelist domains, and configure security headers here.
        </p>
          <Button className="mt-8 bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-12 font-bold" asChild>
          <Link href="/dashboard/project">
            <Plus className="w-4 h-4 mr-2" /> Create Project
          </Link>
        </Button>
      </div>
    );
  }


 }