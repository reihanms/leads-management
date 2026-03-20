import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import { authApi } from "@/lib/api";
import type { SessionData } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { data: response } = await authApi.login(email, password);

    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions,
    );

    session.token = response.data!.token;
    session.user = response.data!.user;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({
      status: "success",
      message: "Login successful",
      data: { user: response.data!.user },
    });
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
          message: axiosError.response.data.message || "Login failed",
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

