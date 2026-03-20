"use client";

import type { Lead, LeadStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Map lead status to badge visual style. */
const statusVariant: Record<
  LeadStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  New: "default",
  Engaged: "secondary",
  ProposalSent: "outline",
  ClosedWon: "default",
  ClosedLost: "destructive",
};

/** Human-readable status labels. */
const statusLabel: Record<LeadStatus, string> = {
  New: "New",
  Engaged: "Engaged",
  ProposalSent: "Proposal Sent",
  ClosedWon: "Closed Won",
  ClosedLost: "Closed Lost",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface LeadTableProps {
  leads: Lead[];
}

export function LeadTable({ leads }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
        <p className="text-lg font-medium text-muted-foreground">
          No leads yet
        </p>
        <p className="text-sm text-muted-foreground">
          Click &quot;New Lead&quot; to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[lead.status]}>
                  {statusLabel[lead.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(lead.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

