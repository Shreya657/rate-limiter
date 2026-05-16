"use client";

import { useState } from "react"; 
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Shield, 
  Settings, 
  CreditCard, 
  Activity,
  ChevronRight,
  PanelLeftClose, 
  PanelLeftOpen,   
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";



export default function Sidebar({ activeProjectId }: { activeProjectId?: string}) {
    const params = useParams();
const currentId = (params?.projectId as string) || activeProjectId;
console.log("Extracted projectId from URL:", currentId); // Debug log to verify projectId extraction
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);



const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/project", color: "text-sky-500" },
  { label: "My Shields", icon: Shield, href: "/dashboard/MyShields", color: "text-violet-500" },
{ 
    label: "Usage Stats", 
    icon: Activity, 
    href: currentId ? `/dashboard/${currentId}/stats` : "/dashboard/stats", 
    color: "text-pink-700" 
  },
{ 
  label: "Docs", 
  icon: BookOpen, 
  href: currentId ? `/dashboard/${currentId}/doc` : "/docs", 
  color: "text-blue-500" 
},
  // { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { label: "Settings", icon: Settings,  href: currentId ? `/dashboard/${currentId}/settings` : "/dashboard/settings" },
];

  return (
    <div 
      className={cn(
        "sticky top-16 flex flex-col h-[calc(100vh-64px)]  bg-zinc-950 text-white border-r border-zinc-800 transition-all duration-300 ease-in-out hidden md:flex ",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-black z-50"
      >
        {isCollapsed ? <PanelLeftOpen className="h-3 w-3" /> : <PanelLeftClose className="h-3 w-3" />}
      </Button>

      <div className="px-3 py-4 flex-1 overflow-y-auto overflow-x-hidden">
       <div className="space-y-1">
  {routes.map((route) => {
    const isUsageStats = route.label === "Usage Stats";

    // Use a standard <a> tag for the dynamic route to prevent the Router crash
    if (isUsageStats) {
      return (
        <a
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-200",
            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400 hover:bg-white/5 hover:text-white",
            isCollapsed && "justify-center px-2"
          )}
        >
          <div className="flex items-center flex-1">
            <route.icon className={cn("h-5 w-5", !isCollapsed && "mr-3", route.color)} />
            {!isCollapsed && <span className="truncate">{route.label}</span>}
          </div>
          {!isCollapsed && pathname === route.href && (
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          )}
        </a>
      );
    }

    // Keep the rest of the links as standard Next.js Links
    return (
      <Link
        key={route.href}
        href={route.href}
        className={cn(
          "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-200",
          pathname === route.href ? "text-white bg-white/10" : "text-zinc-400 hover:bg-white/5 hover:text-white",
          isCollapsed && "justify-center px-2"
        )}
      >
        <div className="flex items-center flex-1">
          <route.icon className={cn("h-5 w-5", !isCollapsed && "mr-3", route.color)} />
          {!isCollapsed && <span className="truncate">{route.label}</span>}
        </div>
        {!isCollapsed && pathname === route.href && (
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        )}
      </Link>
    );
  })}
</div>
      </div>
      
      <div className={cn("px-6 py-4 border-t border-zinc-800", isCollapsed && "px-0 flex justify-center")}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          {!isCollapsed && (
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold truncate">
              Operational
            </span>
          )}
        </div>
      </div>
    </div>
  );
}