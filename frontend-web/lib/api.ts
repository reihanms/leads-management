import axios from "axios";
import type { ApiResponse, User, Lead } from "./types";

/** Axios instance pointing at the Express backend. */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

/** Auth-related API calls to the Express backend. */
export const authApi = {
  register: (email: string, password: string) =>
    api.post<ApiResponse<User>>("/auth/register", { email, password }),

  login: (email: string, password: string) =>
    api.post<ApiResponse<{ token: string; user: User }>>("/auth/login", {
      email,
      password,
    }),
};

/** Lead-related API calls (require Bearer token). */
export const leadsApi = {
  getAll: (token: string) =>
    api.get<ApiResponse<Lead[]>>("/leads", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (
    token: string,
    data: { name: string; email: string; status?: string },
  ) =>
    api.post<ApiResponse<Lead>>("/leads", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

