# Lead Management Application

A full-stack, secure application for managing sales leads. Features a containerized Express.js backend API with Prisma & PostgreSQL, and a Next.js 16 frontend dashboard utilizing Server Components, Shadcn UI, and iron-session for authentication.

## System Architecture

The project consists of two main services designed to be run together:

1. **Backend API (`/backend-api`)**: Express.js REST API
   - Prisma ORM (connected to Railway PostgreSQL)
   - Custom JWT Authentication & bcrypt
   - Zod Validation & Global Error Handling
   - Runs on port `3000`

2. **Frontend Web (`/frontend-web`)**: Next.js 16 App Router
   - Tailwind CSS 4 & Shadcn UI
   - Secure Proxy API Routes (`iron-session` encrypted cookies)
   - Zustand State Management
   - Runs on port `3001`

---

## 🌍 Live Deployment

The application is fully deployed and accessible in production:

- **Frontend (Vercel)**: [https://leads-management-test.vercel.app](https://leads-management-test.vercel.app)
- **Backend API (Railway)**: [https://leads-management-production.up.railway.app](https://leads-management-production.up.railway.app)
- **Database (Railway)**: The PostgreSQL database is provisioned and hosted directly on Railway.

---

## 🚀 Quick Start (Docker)

The easiest way to run the entire stack is with Docker Compose. This single command builds and orchestrates both the frontend and backend services, automatically networking them together.

### Prerequisites

- Docker & Docker Compose installed
- Setup the environment files for both services first (see below)

### 1. Setup Environment Files

**Backend:**

```bash
cp backend-api/.env.example backend-api/.env
# Make sure to fill in your DATABASE_URL (e.g. Railway Postgres) and JWT_SECRET
```

**Frontend:**

```bash
cp frontend-web/.env.example frontend-web/.env
# Make sure to fill in IRON_SESSION_PASSWORD (must be 32+ chars)
# Note: When running in Docker, NEXT_PUBLIC_API_URL is automatically overridden to hit the backend container
```

### 2. Start Services

From the root directory of the project, run:

```bash
docker compose up --build
```

### 3. Access the Application

- **Frontend Dashboard**: [http://localhost:3001](http://localhost:3001)
- **Backend API Base**: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🛠 Local Development (Without Docker)

You can also run the web and API servers manually in your local terminal for development purposes.

### 1. Backend API

```bash
cd backend-api
npm install
npx prisma generate
npm run dev
```

_The backend should now be running on `http://localhost:3000`._

### 2. Frontend Web

In a new terminal tab:

```bash
cd frontend-web
npm install
npm run dev
```

_The frontend should now be running on `http://localhost:3001`._

_(Make sure your `frontend-web/.env` has `NEXT_PUBLIC_API_URL=http://localhost:3000/api`)_

---

## Project Highlights

- **Server-First Frontend**: The Next.js dashboard fetches data securely on the server side using Server Components, avoiding exposing the backend API url or JWTs to the browser.
- **Secure Authentication**: The Next.js API handlers proxy authentication requests to the Express backend. The returned JWT is stored in an encrypted, HTTP-only cookie using `iron-session`, keeping it safe from XSS attacks.
- **Multi-stage Docker Builds**: Both the frontend and backend utilize highly optimized multi-stage Alpine Dockerfiles to ensure tiny production footprints. Next.js uses standalone output mode.

