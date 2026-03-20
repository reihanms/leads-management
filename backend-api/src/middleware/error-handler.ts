import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "../utils/errors";
import { Prisma } from "../generated/prisma/client";

/**
 * Global error handler middleware.
 * Catches all errors passed via next() and returns a standardised JSON response.
 * Handles AppError subclasses, Prisma unique constraint violations, and unknown errors.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // ── Known operational errors ──
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err instanceof ValidationError && err.errors
        ? { errors: err.errors }
        : {}),
    });
    return;
  }

  // ── Prisma unique constraint violation (e.g. duplicate email) ──
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    const target = (err.meta?.["target"] as string[]) ?? [];
    res.status(409).json({
      status: "error",
      message: `A record with this ${target.join(", ")} already exists.`,
    });
    return;
  }

  // ── Unexpected / programmer errors ──
  console.error("Unexpected error:", err);

  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(500).json({
    status: "error",
    message,
  });
};

