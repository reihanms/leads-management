import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import { leadsApi } from "@/lib/api";
import type { SessionData, Lead } from "@/lib/types";
import { LeadDashboardClient } from "@/components/lead-dashboard-client";

export default async function DashboardPage() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  let initialLeads: Lead[] = [];

  if (session.isLoggedIn && session.token) {
    try {
      const { data: response } = await leadsApi.getAll(session.token);
      initialLeads = response.data || [];
    } catch (error) {
      console.error("[Dashboard] Failed to fetch leads server-side:", error);
    }
  }

  return <LeadDashboardClient initialLeads={initialLeads} />;
}

