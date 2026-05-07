// app/test-route/route.ts

import { ShieldLimit } from "@esbi/shieldlimit";

const shield = new ShieldLimit("la_cbe813cffd5a01192d6db9ef917411a2aba05b8ff92752bb");

export async function GET() {
  const check = await shield.verify();
  check
  
  if (!check.success) {
    return new Response("Slow down!", { status: 429, });
  }

  return new Response("Welcome to the protected zone!");
}