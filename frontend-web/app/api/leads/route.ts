import { NextResponse } from "next/server";
import { leadsApi } from "@/lib/api";
import { handleApiError, getAuthSession } from "@/lib/route-utils";

/** GET /api/leads — fetch all leads from Express backend. */
export async function GET() {
  const { session, errorResponse } = await getAuthSession();
  if (errorResponse) return errorResponse;

  try {
    const { data: response } = await leadsApi.getAll(session.token!);
    return NextResponse.json(response);
  } catch (error) {
    return handleApiError(error, "Failed to fetch leads");
  }
}

/** POST /api/leads — create a new lead via Express backend. */
export async function POST(request: Request) {
  const { session, errorResponse } = await getAuthSession();
  if (errorResponse) return errorResponse;

  try {
    const body = await request.json();
    const { data: response } = await leadsApi.create(session.token!, body);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return handleApiError(error, "Failed to create lead");
  }
}

