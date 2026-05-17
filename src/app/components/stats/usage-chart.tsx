"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function UsageChart({ chartData }: { chartData: any[] }) {
  return (
    <div className="h-[350px] w-full bg-black">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {/* Smooth glowing gradients for Dark Mode */}
            <linearGradient id="colorAuth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDropped" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Muted borders using zinc-900 instead of bright slate lines */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
          
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#71717a' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#71717a' }} 
          />

          {/* Fully Custom Dark Glassmorphism Tooltip */}
          <Tooltip 
            cursor={{ stroke: '#27272a', strokeWidth: 1 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-2xl backdrop-blur-md">
                    <p className="text-xs font-semibold text-zinc-500 mb-2">{label}</p>
                    <div className="space-y-1.5">
                      {payload.map((entry: any) => (
                        <div key={entry.name} className="flex items-center gap-6 justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: entry.stroke }} 
                            />
                            <span className="text-zinc-400 capitalize">{entry.name}</span>
                          </div>
                          <span className="font-mono font-bold text-white">
                            {entry.value.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          {/* Authorized Area */}
          <Area 
            type="monotone" 
            dataKey="authorized" 
            stroke="#14b8a6" 
            strokeWidth={2}
            fill="url(#colorAuth)" 
            connectNulls={true}
            name="authorized"
            activeDot={{ r: 4, strokeWidth: 0, fill: '#14b8a6' }}
          />

          {/* Dropped Area */}
          <Area 
            type="monotone" 
            dataKey="dropped" 
            stroke="#f97316" 
            strokeWidth={2}
            fill="url(#colorDropped)" 
            connectNulls={true}
            name="dropped"
            activeDot={{ r: 4, strokeWidth: 0, fill: '#f97316' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}