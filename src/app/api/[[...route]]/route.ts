import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { Ratelimit } from "@upstash/ratelimit";
import crypto from 'node:crypto'; // for node js env
import { redis } from '../../../../utils/redish';
import { prisma } from '../../../../utils/prisma';

const app = new Hono().basePath('/api'); 

app.post('/v1/verify', async (c) => {
  const apiKey = c.req.header('x-shield-key'); //custom header
  if (!apiKey) 
    return c.json({ error: 'Missing API Key' }, 401);

  // hash incoming key to comapred w db
  const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');

  // Check redis first for valid key data
  //syntax: redis.get<Type>(key) asks Redis for the value.
  let keyData = await redis.get<{ projectId: string; limit: number; window: number }>(`key_cache:${hashedKey}`);

  if (!keyData) {
    // Cache miss: query db
    const dbKey = await prisma.apiKey.findUnique({
      where: { key: hashedKey },
      include: { project: true }
    });

    if (!dbKey || !dbKey.isActive)
         return c.json({ error: 'Invalid Key' }, 403);

    keyData = { 
      projectId: dbKey.projectId, 
      limit: dbKey.project.limit, 
      window: dbKey.project.window 
    };

    // store in redis for 5 minutes 
    await redis.set(`key_cache:${hashedKey}`, keyData, { ex: 300 });
  }

  // sliding Window
  const ratelimit = new Ratelimit({
    redis,

    limiter: Ratelimit.slidingWindow(keyData.limit, `${keyData.window} s`),
    analytics: true,
  });

  const { success, remaining, reset, limit } = await ratelimit.limit(keyData.projectId);

  if (!success) {
    return c.json({ error: 'Rate limit exceeded', remaining: 0 }, 429, {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': reset.toString(),
    });
  }

  return c.json({ success: true, remaining });
});

export const GET = handle(app);
export const POST = handle(app);