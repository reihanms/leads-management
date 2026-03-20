import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import { authApi } from "@/lib/api";
import type { SessionData } from "@/lib/types";
import { handleApiError } from "@/lib/route-utils";

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
  } catch (error) {
    return handleApiError(error, "Login failed");
  }
}

