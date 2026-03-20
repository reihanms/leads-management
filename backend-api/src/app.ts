import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();

// ── Global Security & Parsing Middleware ──
app.use(helmet());
app.use(cors());
app.use(express.json());

// ── Health check ──
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── API Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// ── Global Error Handler (must be last) ──
app.use(errorHandler);

export default app;

