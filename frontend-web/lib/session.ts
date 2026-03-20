import { SessionOptions } from "iron-session";
import type { SessionData } from "./types";

/** Default session values for a new (unauthenticated) session. */
export const defaultSession: SessionData = {
  isLoggedIn: false,
};

/** iron-session cookie configuration. */
export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "lead-mgmt-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60, // 1 hour — matches JWT expiration
  },
};

