import { NextResponse } from "next/server";
import { authApi } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { data: response } = await authApi.register(email, password);

    return NextResponse.json({
      status: "success",
      message: "Registration successful",
      data: response.data,
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
          message: axiosError.response.data.message || "Registration failed",
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

