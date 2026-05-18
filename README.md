# ShieldLimit

ShieldLimit is an open-source, edge-first API protection layer and rate-limiting platform. Designed for modern web applications, it enables developers to intercept malicious bursts, enforce domain whitelisting, and view high-fidelity traffic analytics with sub-10ms verification latencies.

The ecosystem consists of this central management dashboard, an edge-optimized Hono API engine, and an official Node.js SDK distribution.

## Features

- **Sub-10ms Verification:** Utilizes Upstash Redis caching and an optimized sliding-window log model to minimize edge evaluation overhead.
- **Cryptographic Security:** API keys are SHA-256 hashed at rest with domain origin validation checks enforced at the edge.
- **Real-Time Analytics:** Interactive metrics pipeline tracking ingress volume, authorized queries, and dropped requests over rolling 24-hour windows.
- **Multi-Tenant Architecture:** Secure workspace scoping powered by BetterAuth and Prisma ORM supporting multiple isolated user projects.

## 📦 SDK Integration (Recommended)

The fastest and most optimized way to protect your application is using the official, lightweight Node.js SDK. It features automatic origin parsing and built-in type safety.

### Installation

```bash
npm install @esbi/shieldlimit
```

Or use your preferred package manager:

```bash
yarn add @esbi/shieldlimit
# or
pnpm add @esbi/shieldlimit
```

## 🚀 REST API Reference

For non-Node.js environments (Python, Go, Rust, etc.), you can communicate directly with our edge verification servers via standard HTTP requests.

### Verify Request Token

**Endpoint:** `POST` `https://rate-limiter-swart.vercel.app/api/v1/verify`

#### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `x-shield-key` | string | Yes | Your unique project API secret key |
| `Content-Type` | string | Yes | Must be `application/json` |
| `Origin` | string | Optional | Required if Domain Whitelisting is enabled |

#### Example cURL Request

```bash
curl -X POST https://rate-limiter-swart.vercel.app/api/v1/verify \
  -H "x-shield-key: la_your_secret_api_key_here" \
  -H "Content-Type: application/json" \
  -H "Origin: https://yourdomain.com"
```

#### Response Schemas

**Success State (200 OK)**

```json
{
  "success": true,
  "remaining": 99,
  "limit": 100
}
```

**Rate Limit Exceeded (429 Too Many Requests)**

```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 35,
  "reset": 1778603700000
}
```

## Tech Stack

- **Frontend & Dashboard:** Next.js 15 (App Router), React, Tailwind CSS, Shadcn/ui, Recharts
- **Backend API & Middleware:** Hono API, Edge Serverless Workers
- **Database & Caching:** PostgreSQL, Prisma ORM, Upstash Redis
- **Authentication:** BetterAuth (GitHub and Google OAuth)
- **Communications:** Resend API

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v18.x or higher)
- PostgreSQL database instance
- Upstash Redis database instance

### Installation and Setup

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Shreya657/rate-limiter.git
cd rate-limiter
```

2. Install the workspace dependencies:

```bash
npm install
```

3. Configure your environment variables. Create a `.env.local` file in the root directory:

4. Push the database schema to your PostgreSQL instance:

```bash
npx prisma db push
```

5. Spin up the local development environment:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Repository Architecture

```
├── apps/dashboard      # Next.js 15 web application interface
├── packages/sdk        # TypeScript source code for the @esbi/shieldlimit npm package
├── utils/prisma        # Database access configurations and client initializers
├── package.json        # Global workspace manager setup
└── README.md           # Documentation canvas
```

## 📄 License

Distributed under the MIT License.

---

**Made with ❤️ by Shreya**
