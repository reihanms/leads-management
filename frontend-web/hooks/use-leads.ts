import { useState } from "react";
import { toast } from "sonner";
import { useLeadStore } from "@/lib/store";
import type { CreateLeadFormSchema } from "@/lib/schemas";

export function useLeads() {
  const [isCreating, setIsCreating] = useState(false);
  const { addLead, closeCreateDialog } = useLeadStore();

  const createLead = async (data: CreateLeadFormSchema) => {
    setIsCreating(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to create lead");
        return { success: false };
      }

      addLead(result.data);
      toast.success("Lead created successfully!");
      closeCreateDialog();
      return { success: true };
    } catch {
      toast.error("Network error. Please try again.");
      return { success: false };
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createLead,
    isCreating,
  };
}

