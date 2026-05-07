"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function UsageChart({ chartData }: { chartData: any[] }) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorAuth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDropped" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          {/* <Area 
            type="monotone" dataKey="authorized" stroke="#14b8a6" fillOpacity={1} fill="url(#colorAuth)" 
            strokeWidth={2} name="Authorized"
          /> */}
          // Inside usage-chart.tsx
<Area 
  type="monotone" // This makes the line curvy
  dataKey="authorized" 
  stroke="#14b8a6" 
  fill="url(#colorAuth)" 
  connectNulls={true} // Ensures the line doesn't break
/>
          {/* <Area 
            type="monotone" dataKey="dropped" stroke="#f97316" fillOpacity={1} fill="url(#colorDropped)" 
            strokeWidth={2} name="Dropped"
          /> */}
          // Inside usage-chart.tsx
<Area 
  type="monotone" // This makes the line curvy
  dataKey="authorized" 
  stroke="#14b8a6" 
  fill="url(#colorAuth)" 
  connectNulls={true} // Ensures the line doesn't break
/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}