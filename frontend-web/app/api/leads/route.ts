import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import { leadsApi } from "@/lib/api";
import type { SessionData } from "@/lib/types";

/** GET /api/leads — fetch all leads from Express backend. */
export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.isLoggedIn || !session.token) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { data: response } = await leadsApi.getAll(session.token);
    return NextResponse.json(response);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const axiosError = error as {
        response: { status: number; data: { message?: string } };
      };
      return NextResponse.json(
        {
          status: "error",
          message: axiosError.response.data.message || "Failed to fetch leads",
        },
        { status: axiosError.response.status },
      );
    }
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 },
    );
  }
}

/** POST /api/leads — create a new lead via Express backend. */
export async function POST(request: Request) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.isLoggedIn || !session.token) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { data: response } = await leadsApi.create(session.token, body);
    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const axiosError = error as {
        response: { status: number; data: { message?: string } };
      };
      return NextResponse.json(
        {
          status: "error",
          message: axiosError.response.data.message || "Failed to create lead",
        },
        { status: axiosError.response.status },
      );
    }
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 },
    );
  }
}

