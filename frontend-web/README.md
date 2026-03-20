# Lead Management Dashboard

A secure Next.js dashboard for managing sales leads, built with TypeScript, Shadcn UI, and iron-session authentication.

## Tech Stack

| Technology        | Purpose                                |
| ----------------- | -------------------------------------- |
| **Next.js 16**    | React framework (App Router)           |
| **TypeScript**    | Type-safe development                  |
| **Tailwind CSS 4** | Utility-first styling                 |
| **Shadcn UI**     | Component library (radix-nova)         |
| **iron-session**  | Encrypted JWT storage in HTTP-only cookie |
| **Zustand**       | Lightweight state management           |
| **React Hook Form + Zod** | Form handling with validation  |
| **Axios**         | HTTP client for Express backend        |
| **Docker**        | Containerized deployment               |

## Project Structure

```
frontend-web/
├── app/
│   ├── api/
│   │   ├── login/route.ts        # Auth proxy → iron-session
│   │   ├── register/route.ts     # Registration proxy
│   │   ├── logout/route.ts       # Session destroy
│   │   └── leads/route.ts        # Leads CRUD proxy
│   ├── dashboard/
│   │   ├── layout.tsx            # Navbar + content area
│   │   └── page.tsx              # Lead table + create dialog
│   ├── login/page.tsx            # Login form
│   ├── register/page.tsx         # Register form
│   ├── layout.tsx                # Root layout + Toaster
│   └── page.tsx                  # Redirect → /dashboard
├── components/
│   ├── ui/                       # Shadcn components
│   ├── navbar.tsx                # Top nav with logout
│   ├── lead-table.tsx            # Leads data table
│   └── create-lead-dialog.tsx    # New lead form dialog
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   ├── session.ts                # iron-session config
│   ├── api.ts                    # Axios service layer
│   ├── store.ts                  # Zustand store
│   └── utils.ts                  # cn() utility
├── middleware.ts                 # Route protection
├── Dockerfile                    # Multi-stage build
└── docker-compose.yml            # Port 3001
```

## Getting Started

### Prerequisites

- Node.js 20+
- The backend API running on `http://localhost:3000`

### 1. Install Dependencies

```bash
cd frontend-web
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

| Variable                 | Description                              |
| ------------------------ | ---------------------------------------- |
| `NEXT_PUBLIC_API_URL`    | Express backend URL (e.g. `http://localhost:3000/api`) |
| `IRON_SESSION_PASSWORD`  | 32+ character secret for cookie encryption |

### 3. Start Development Server

```bash
npm run dev
```

The app starts at `http://localhost:3000` (Next.js dev).

### 4. Run with Docker

```bash
docker compose up --build
```

Runs on `http://localhost:3001`.

## Auth Flow

1. User submits login form → Next.js `/api/login` route handler
2. Route handler forwards credentials to Express `/auth/login`
3. Express returns JWT → route handler encrypts it in iron-session cookie
4. Subsequent requests read the JWT from the cookie and pass it as Bearer token
5. Middleware protects `/dashboard` by checking for a valid session cookie

## Lead Statuses

| Status         | Description              |
| -------------- | ------------------------ |
| `New`          | Newly created lead       |
| `Engaged`      | Lead has been contacted  |
| `ProposalSent` | Proposal has been sent   |
| `ClosedWon`    | Deal successfully closed |
| `ClosedLost`   | Deal lost                |
