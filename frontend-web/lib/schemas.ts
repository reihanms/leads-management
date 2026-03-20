import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;

export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  status: z.enum(["New", "Engaged", "ProposalSent", "ClosedWon", "ClosedLost"]),
});

export type CreateLeadFormSchema = z.infer<typeof createLeadSchema>;

