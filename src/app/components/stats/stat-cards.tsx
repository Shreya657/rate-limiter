"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, XCircle, Zap } from "lucide-react";

interface Summary {
  totalIngress: number;
  authorized: number;
  dropped: number;
  efficiency: string;
}

export function StatCards({ summary }: { summary: Summary }) {
  const stats = [
    {
      title: "Total Ingress",
      value: summary.totalIngress.toLocaleString(),
      icon: Activity,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Authorized",
      value: summary.authorized.toLocaleString(),
      icon: CheckCircle2,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
    },
    {
      title: "Dropped",
      value: summary.dropped.toLocaleString(),
      icon: XCircle,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Efficiency",
      value: summary.efficiency,
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-zinc-950 border-zinc-800/50 shadow-xl overflow-hidden group hover:border-zinc-700 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-white">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}