"use client";

import { useEffect } from "react";
import { useLeadStore } from "@/lib/store";
import type { Lead } from "@/lib/types";
import { LeadTable } from "@/components/lead-table";
import { CreateLeadDialog } from "@/components/create-lead-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface LeadDashboardClientProps {
  initialLeads: Lead[];
}

export function LeadDashboardClient({
  initialLeads,
}: LeadDashboardClientProps) {
  const { leads, setLeads, openCreateDialog } = useLeadStore();

  // Initialize store with server-fetched leads on mount
  useEffect(() => {
    setLeads(initialLeads);
  }, [initialLeads, setLeads]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Manage your sales pipeline leads.
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>

      <LeadTable leads={leads.length > 0 ? leads : initialLeads} />

      <CreateLeadDialog />
    </div>
  );
}

