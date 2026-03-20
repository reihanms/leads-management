import { NextResponse } from "next/server";
import { authApi } from "@/lib/api";
import { handleApiError } from "@/lib/route-utils";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { data: response } = await authApi.register(email, password);

    return NextResponse.json({
      status: "success",
      message: "Registration successful",
      data: response.data,
    });
  } catch (error) {
    return handleApiError(error, "Registration failed");
  }
}
