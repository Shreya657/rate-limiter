import { auth } from "@/lib/auth";
import { prisma } from "../../../utils/prisma";
import Navbar from "../components/dashboard/navbar";
import Sidebar from "../components/dashboard/sidebar";
import { headers } from "next/dist/server/request/headers";



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const session = await auth.api.getSession({ headers: await headers() });
  
  const projects = await prisma.project.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true } 
  });

  const activeProjectId = projects[0]?.id;
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex pt-16  ">
          <Sidebar activeProjectId={activeProjectId} />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}