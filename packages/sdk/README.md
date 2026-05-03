# @esbi/shieldlimit

A high-performance, sliding-window rate limiting SDK built for modern TypeScript applications.

## Features
- **Fast**: Built on top of Hono and optimized for edge environments.
- **Reliable**: Uses Redis (Upstash) for distributed rate limiting.
- **Secure**: Implements SHA-256 hashing for API key protection.
- **First Principles**: Designed with transparency and performance as core pillars.

## Installation

```bash
npm install @esbi/shieldlimit



import { ShieldLimit } from "@esbi/shieldlimit";

const shield = new ShieldLimit("your_api_key_here");

async function handleRequest() {
  const check = await shield.verify();

  if (!check.success) {
    console.error(`Error ${check.status}: ${check.error}`);
    return;
  }

  console.log(`Success! Remaining requests: ${check.remaining}`);
}



| Property  | Type    | Description                       |
| --------- | ------- | --------------------------------- |
| success   | boolean | `true` if request is allowed      |
| remaining | number  | Requests left in current window   |
| status    | number  | HTTP status code (e.g., 200, 429) |
| error     | string  | Error message if request fails    |
