"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLeadStore } from "@/lib/store";
import type { Lead } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { LeadTable } from "@/components/lead-table";
import { CreateLeadDialog } from "@/components/create-lead-dialog";

export default function DashboardPage() {
  const { leads, setLeads, openCreateDialog } = useLeadStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message || "Failed to fetch leads");
          return;
        }

        setLeads(result.data || []);
      } catch {
        toast.error("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [setLeads]);

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

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <LeadTable leads={leads} />
      )}

      <CreateLeadDialog />
    </div>
  );
}

