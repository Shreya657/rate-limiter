# 🛡️ @esbi/shieldlimit

An ultra-low latency, edge-first API protection and rate-limiting SDK designed for modern web applications. Protect your routes in under 10ms using Redis-backed token bucket metrics.

[![npm version](https://img.shields.io/npm/v/@esbi/shieldlimit.svg?color=14b8a6)](https://www.npmjs.com/package/@esbi/shieldlimit)
[![license](https://img.shields.io/npm/l/@esbi/shieldlimit.svg?color=zinc)](https://github.com)

---

## ⚡ Features

- **Edge-Optimized:** Zero heavy database bottlenecks—designed natively for edge environments like Next.js middleware.
- **Cryptographically Secure:** Hashed API key checks with automatic origin verification.
- **Smart Rate Limiting:** Returns accurate tracking headers (`Retry-After`, `remaining`, `limit`).

## 📦 Installation

Install the package via your preferred package manager:

```bash
npm install @esbi/shieldlimit
# or
yarn add @esbi/shieldlimit
# or
pnpm add @esbi/shieldlimit

```

## 🚀 Quickstart (Next.js Middleware)
```bash
import { ShieldLimit } from "@esbi/shieldlimit";

// Initialize the shield instance
const shield = new ShieldLimit(process.env.SHIELD_API_KEY);

export async function middleware(req) {
  // Automatically parses request contextual properties
  const check = await shield.verify();
  
  if (!check.success) {
    return Response.json(
      { 
        error: check.error,
        retryAfter: check.retryAfter 
      }, 
      { 
        status: check.status,
        headers: { 'Retry-After': String(check.retryAfter) }
      }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
};

```
## 📊 Schema Reference
Successful Verification (200 OK)
```bash
{
  "success": true,
  "remaining": 99,
  "limit": 100
}
```
## Rate Limit Exceeded (429 Too Many Requests)
```bash
{
  "error": "Rate limit exceeded",
  "retryAfter": 35,
  "reset": 1778603700000
}
```
📄 License
MIT © Shreya
