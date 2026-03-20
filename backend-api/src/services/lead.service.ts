import { prisma } from "../config/prisma";
import type { CreateLeadInput } from "../schemas/lead.schema";

/**
 * Lead service — encapsulates all lead-related business logic.
 */
export class LeadService {
  /**
   * Create a new lead in the database.
   * Prisma will throw P2002 if the email is already taken,
   * which is caught by the global error handler.
   */
  async createLead(data: CreateLeadInput) {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        status: data.status,
      },
    });

    return lead;
  }

  /** Retrieve all leads, ordered by most recently created first. */
  async getAllLeads() {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return leads;
  }
}

export const leadService = new LeadService();

