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
      color: "text-blue-500",
    },
    {
      title: "Authorized",
      value: summary.authorized.toLocaleString(),
      icon: CheckCircle2,
      color: "text-teal-500",
    },
    {
      title: "Dropped",
      value: summary.dropped.toLocaleString(),
      icon: XCircle,
      color: "text-orange-500",
    },
    {
      title: "Efficiency",
      value: summary.efficiency,
      icon: Zap,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}