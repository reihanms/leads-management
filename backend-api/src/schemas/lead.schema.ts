import { z } from "zod";

/** Valid lead statuses matching the Prisma LeadStatus enum. */
const leadStatusEnum = z.enum([
  "New",
  "Engaged",
  "ProposalSent",
  "ClosedWon",
  "ClosedLost",
]);

/** Schema for POST /api/leads */
export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  status: leadStatusEnum.optional().default("New"),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
