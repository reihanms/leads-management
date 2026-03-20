# Lead Management API

A secure Express.js REST API for managing sales leads, built with TypeScript, Prisma 7, and custom JWT authentication.

## Tech Stack

| Technology              | Purpose                        |
| ----------------------- | ------------------------------ |
| **Express.js 5**        | Web framework                  |
| **TypeScript**          | Type-safe development          |
| **Prisma 7**            | ORM with driver adapter (`pg`) |
| **PostgreSQL (Supabase)** | Database                     |
| **JWT + bcrypt**        | Custom authentication          |
| **Zod**                 | Request validation             |
| **Helmet + CORS**       | Security middleware            |
| **Docker**              | Containerized deployment       |

## Project Structure

```
backend-api/
├── prisma/
│   └── schema.prisma        # Database models & enums
├── prisma.config.ts          # Prisma CLI config (migrations, datasource URL)
├── src/
│   ├── config/prisma.ts      # PrismaClient singleton (driver adapter)
│   ├── controllers/          # HTTP request handlers (thin layer)
│   ├── generated/prisma/     # Auto-generated Prisma client
│   ├── middleware/            # Auth, validation, error handling
│   ├── routes/               # Route definitions
│   ├── schemas/              # Zod validation schemas
│   ├── services/             # Business logic layer
│   └── utils/                # Error classes, async handler
├── Dockerfile                # Multi-stage production build
├── docker-compose.yml        # Local containerized run
└── postman_collection.json   # Pre-configured API requests
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Docker (optional)
- A PostgreSQL database (Supabase or local)

### 1. Install Dependencies

```bash
cd backend-api
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

| Variable         | Description                             |
| ---------------- | --------------------------------------- |
| `DATABASE_URL`   | PostgreSQL connection string for Prisma |
| `JWT_SECRET`     | Secret key for signing JWTs             |
| `JWT_EXPIRATION` | Token expiration (e.g. `1h`, `30m`)     |
| `PORT`           | Server port (default: `3000`)           |

### 3. Run Prisma Migration

```bash
npx prisma generate
npx prisma migrate dev --name init
```

> **Note:** Prisma 7 uses `prisma.config.ts` at the project root for datasource configuration. The `DATABASE_URL` env var is read from `.env` via `dotenv/config`.

### 4. Start Development Server

```bash
npm run dev
```

The server starts at `http://localhost:3000`.

### 5. Run with Docker

```bash
docker compose up --build
```

## API Endpoints

### Health Check

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| GET    | `/health` | Server health check |

### Authentication

| Method | Endpoint             | Description         | Auth |
| ------ | -------------------- | ------------------- | ---- |
| POST   | `/api/auth/register` | Register a new user | No   |
| POST   | `/api/auth/login`    | Login & get JWT     | No   |

### Leads

| Method | Endpoint     | Description       | Auth     |
| ------ | ------------ | ----------------- | -------- |
| POST   | `/api/leads` | Create a new lead | Required |
| GET    | `/api/leads` | Get all leads     | Required |

### Authentication Usage

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Request/Response Examples

**Register:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Create Lead:**

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name": "John Doe", "email": "john@example.com", "status": "New"}'
```

**Get All Leads:**

```bash
curl http://localhost:3000/api/leads \
  -H "Authorization: Bearer <token>"
```

### Lead Statuses

| Status         | Description              |
| -------------- | ------------------------ |
| `New`          | Newly created lead       |
| `Engaged`      | Lead has been contacted  |
| `ProposalSent` | Proposal has been sent   |
| `ClosedWon`    | Deal successfully closed |
| `ClosedLost`   | Deal lost                |

## Available Scripts

| Script                    | Description                      |
| ------------------------- | -------------------------------- |
| `npm run dev`             | Start dev server with hot-reload |
| `npm run build`           | Compile TypeScript to `dist/`    |
| `npm start`               | Run compiled production build    |
| `npm run prisma:generate` | Generate Prisma client           |
| `npm run prisma:migrate`  | Run database migrations          |
| `npm run prisma:studio`   | Open Prisma Studio (DB GUI)      |

## Postman Collection

Import `postman_collection.json` into Postman for pre-configured API requests. The Login request automatically saves the JWT token to the `token` collection variable for use in protected endpoints.
