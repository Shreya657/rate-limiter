import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8 animate-pulse bg-black min-h-screen">
      <div className="space-y-2">
        <div className="h-4 w-32 bg-zinc-800 rounded" />
        <div className="h-8 w-64 bg-zinc-800 rounded" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-zinc-950 border-zinc-900">
            <CardHeader className="pb-2">
              <div className="h-4 w-24 bg-zinc-900 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-zinc-900 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-zinc-950 border-zinc-900">
        <CardHeader>
          <div className="h-5 w-40 bg-zinc-900 rounded" />
        </CardHeader>
        <CardContent className="h-[350px] flex items-end gap-2 px-6">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-zinc-900 rounded-t" 
              style={{ height: `${Math.random() * 100}%`, opacity: (i + 1) / 12 }} 
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}