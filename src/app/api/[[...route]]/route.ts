import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import {  Ratelimit } from "@upstash/ratelimit";
import crypto from 'node:crypto'; // for node js env
import { redis } from '../../../../utils/redish';
import { prisma } from '../../../../utils/prisma';
import stats from './routes/stats';
import projects from './routes/projects';


const app = new Hono().basePath('/api/v1'); 


app.post('/verify', async (c) => {
  const apiKey = c.req.header('x-shield-key'); //custom header
  const origin = c.req.header('origin');

  if (!apiKey) 
    return c.json({ error: 'Missing API Key' }, 401);

  // hash incoming key to comapred w db
  const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');

  // Check redis first for valid key data
  //syntax: redis.get<Type>(key) asks Redis for the value.
let keyData = await redis.get<{ 
  projectId: string; 
  apiKeyId: string; 
  limit: number; 
  window: number ;
  allowedOrigins:string[] | null;
}>(`key_cache:${hashedKey}`);

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
    apiKeyId: dbKey.id, 
    limit: dbKey.project.limit, 
    window: dbKey.project.window ,
    allowedOrigins: dbKey.project.allowedOrigins
  };

    // store in redis for 5 minutes 
    await redis.set(`key_cache:${hashedKey}`, keyData, { ex: 300 });
  }

  if (keyData.allowedOrigins && keyData.allowedOrigins.length > 0) {
    const cleanOrigin = origin?.replace(/^(https?:\/\/)/, "").replace(/\/$/, "");

    if (!cleanOrigin || !keyData.allowedOrigins.includes(cleanOrigin)) {
      return c.json({ 
        error: 'Forbidden: Origin not whitelisted',
        status: 403 
      }, 403);
    }
  }

  // sliding Window
  const ratelimit = new Ratelimit({
    redis,

    limiter: Ratelimit.slidingWindow(keyData.limit, `${keyData.window} s`),
    analytics: false,
  });

// console.log("STATS_ID_RECORDED:", keyData.projectId);
 const { success, limit, reset, remaining } = await ratelimit.limit(keyData.apiKeyId);


// allows users to read limits without even parsing the json body
  c.header('X-RateLimit-Limit', limit.toString());
  c.header('X-RateLimit-Remaining', remaining.toString());
  c.header('X-RateLimit-Reset', reset.toString());


const currentHour = new Date();
// This sets minutes, seconds, and milliseconds to 0 correctly
currentHour.setHours(currentHour.getHours(), 0, 0, 0);//  to the start of the hour

  // We do this asynchronously so it doesn't slow down the response
// Background task - won't block the 'return c.json'
prisma.keyUsage.upsert({
  where: {
    apiKeyId_timestamp: {
      apiKeyId: keyData.apiKeyId,
      timestamp: currentHour,
    },
  },
  update: {
    // only increment the one that actually happened
    success: success ? { increment: 1 } : undefined,
    blocked: !success ? { increment: 1 } : undefined,
  },
  create: {
    apiKeyId: keyData.apiKeyId,
    timestamp: currentHour,
    success: success ? 1 : 0,
    blocked: !success ? 1 : 0,
  },
}).catch(err => console.error("Analytics Save Failed:", err));

if (!success) {
    const now = Date.now();
    const retryAfter = Math.max(0, Math.floor((reset - now) / 1000));

  // if (!success) {
  //   return c.json({ error: 'Rate limit exceeded' }, 429);
  // }
  // return c.json({ success: true, remaining });
  return c.json({ 
      error: 'Rate limit exceeded',
      message: `You have exhausted your API quota. Please try again in ${retryAfter} seconds.`,
      limit,
      remaining,
      reset, // absolute timestamp
      retryAfter // in sec
    }, 429);
  }

  
  return c.json({ 
    success: true, 
    remaining,
    limit 
  });
});


app.route('/stats', stats);
app.route('/projects', projects);


export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

