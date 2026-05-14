// routes/stats.ts
import { Hono } from 'hono';
import { subHours, startOfHour } from 'date-fns';
import { prisma } from '../../../../../utils/prisma';

const stats = new Hono();

stats.get('/usage', async (c) => {
  const projectId = c.req.query('projectId');
  const apiKeyId = c.req.query('apiKeyId');

  if (!projectId) return c.json({ error: 'Project ID is required' }, 400);

  // 1. Fetch data from DB
  const usageData = await prisma.keyUsage.findMany({
    where: {
      apiKey: {
        projectId: projectId,
        id: apiKeyId && apiKeyId !== "all" ? apiKeyId : undefined, 
      },
      timestamp: { gte: subHours(new Date(), 24) } 
    },
    orderBy: { timestamp: 'asc' },
  });

  // 2. Padding Logic: Create a map of the LAST 24 HOURS with 0s
  const chartMap = new Map();
  const now = new Date();

  for (let i = 0; i < 24; i++) {
    // 2. last 24 individual hours
    const hourDate = startOfHour(subHours(now, i));
    chartMap.set(hourDate.toISOString(), { authorized: 0, dropped: 0 });
  }

  // 3. Merge DB data into our 24h map
  usageData.forEach((row) => {
    const timeKey = startOfHour(row.timestamp).toISOString();
    if (chartMap.has(timeKey)) {
      const existing = chartMap.get(timeKey);
      chartMap.set(timeKey, {
        authorized: existing.authorized + row.success,
        dropped: existing.dropped + row.blocked,
      });
    }
  });

  // 4. Sort and Format for Recharts
  const chartData = Array.from(chartMap.entries())
    .map(([time, counts]) => ({
      // Store raw date for sorting, then format label
      rawDate: new Date(time),
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      authorized: counts.authorized,
      dropped: counts.dropped,
    }))
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime()); // Sort chronologically

  // 5. Calculate Totals
  const totalAuthorized = usageData.reduce((acc, curr) => acc + curr.success, 0);
  const totalDropped = usageData.reduce((acc, curr) => acc + curr.blocked, 0);
  const totalIngress = totalAuthorized + totalDropped;

  return c.json({
    summary: {
      totalIngress,
      authorized: totalAuthorized,
      dropped: totalDropped,
      efficiency: totalIngress > 0 
        ? ((totalAuthorized / totalIngress) * 100).toFixed(1) + "%" 
        : "100%",
    },
    chartData,
  });
});

stats.get('/keys', async (c) => {
  const projectId = c.req.query('projectId');
  if (!projectId) return c.json({ error: 'Project ID is required' }, 400);

  const keys = await prisma.apiKey.findMany({
    where: { projectId },
    select: { id: true, name: true }
  });

  return c.json(keys);
});

export default stats;