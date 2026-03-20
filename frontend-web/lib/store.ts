import { create } from "zustand";
import type { Lead } from "./types";

interface LeadStore {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  isCreateDialogOpen: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
  addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
  isCreateDialogOpen: false,
  openCreateDialog: () => set({ isCreateDialogOpen: true }),
  closeCreateDialog: () => set({ isCreateDialogOpen: false }),
}));

