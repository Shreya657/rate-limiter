"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ProjectSelector } from "@/app/components/stats/project-selector";
import { KeySelector } from "@/app/components/stats/key-selector";
import { StatCards } from "@/app/components/stats/stat-cards";
import { UsageChart } from "@/app/components/stats/usage-chart";
import { EmptyState } from "@/app/components/stats/empty-state";

export default function StatsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const projectId = resolvedParams.projectId;


  const [projects, setProjects] = useState<any[]>([]);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/v1/projects");
        const json = await res.json();
        setProjects(json);
        
        if (projectId === "stats" && json.length > 0) {
          router.push(`/dashboard/${json[0].id}/stats`);
        }
      } catch (error) {
        console.error("Failed to load projects list:", error);
      }
    }
    loadProjects();
  }, [projectId, router]);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!projectId || projectId === "stats")
         return;
      
      setIsLoading(true);
      try {
        const statsUrl = `/api/v1/stats/usage?projectId=${projectId}${selectedKey ? `&apiKeyId=${selectedKey}` : ''}`;
        const keysUrl = `/api/v1/stats/keys?projectId=${projectId}`;

        const [statsRes, keysRes] = await Promise.all([
          fetch(statsUrl),
          fetch(keysUrl)
        ]);

        const [statsJson, keysJson] = await Promise.all([
          statsRes.json(),
          keysRes.json()
        ]);

        setData(statsJson);
        setApiKeys(keysJson);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [projectId, selectedKey]); 

  if (isLoading && !data) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] animate-pulse">
        <div className="text-zinc-500 font-medium">Loading Shield Analytics...</div>
      </div>
    );
  }


  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-50">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
          <p className="text-muted-foreground text-sm">Monitor traffic across your infrastructure.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <ProjectSelector 
            projects={projects} 
            currentProjectId={resolvedParams.projectId}
            onSelect={(id: string) => router.push(`/dashboard/${id}/stats`)} 
          />
          
          <KeySelector 
            apiKeys={apiKeys} 
            onSelect={setSelectedKey} 
          />
        </div>
      </div>

      {!data || data.summary.totalIngress === 0 ? (
        <EmptyState />
      ) : (
        <>
          <StatCards summary={data.summary} />
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 shadow-sm">
            <h3 className="font-semibold mb-6 text-sm text-white">Requests over last 24h</h3>
            <UsageChart chartData={data.chartData} />
          </div>
        </>
      )}
    </div>
  );
}