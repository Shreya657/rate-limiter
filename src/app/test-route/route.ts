// app/test-route/route.ts

import { ShieldLimit } from "../../../packages/sdk/src";

const shield = new ShieldLimit("your-api-key-here");

export async function GET() {
  const check = await shield.verify();
  
  if (!check.success) {
    return new Response("Slow down!", { status: 429 });
  }

  return new Response("Welcome to the protected zone!");
}