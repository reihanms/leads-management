import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import type { SessionData } from "@/lib/types";

/**
 * Shared utility to handle Axios errors in Next.js route handlers.
 */
export function handleApiError(error: unknown, fallbackMessage: string) {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    const axiosError = error as {
      response: { status: number; data: { message?: string; errors?: any } };
    };
    return NextResponse.json(
      {
        status: "error",
        message: axiosError.response.data.message || fallbackMessage,
        errors: axiosError.response.data.errors,
      },
      { status: axiosError.response.status },
    );
  }

  console.error(`[API Error] ${fallbackMessage}:`, error);
  return NextResponse.json(
    { status: "error", message: "Internal Server Error" },
    { status: 500 },
  );
}

/**
 * Shared utility to safely get the current session and ensure the user is logged in.
 */
export async function getAuthSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.isLoggedIn || !session.token) {
    return {
      session: null,
      errorResponse: NextResponse.json(
        { status: "error", message: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  return { session, errorResponse: null };
}

