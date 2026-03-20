/** Lead pipeline status matching the backend Prisma enum. */
export type LeadStatus =
  | "New"
  | "Engaged"
  | "ProposalSent"
  | "ClosedWon"
  | "ClosedLost";

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

/** Standard API response wrapper from the Express backend. */
export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: { field: string; message: string }[];
}

/** iron-session data stored in the encrypted cookie. */
export interface SessionData {
  token?: string;
  user?: User;
  isLoggedIn: boolean;
}

