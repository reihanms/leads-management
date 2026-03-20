import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginFormSchema, RegisterFormSchema } from "@/lib/schemas";

export function useAuth() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = async (data: LoginFormSchema) => {
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Login failed");
        return { success: false };
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
      return { success: true };
    } catch {
      toast.error("Network error. Please try again.");
      return { success: false };
    } finally {
      setIsLoggingIn(false);
    }
  };

  const register = async (data: RegisterFormSchema) => {
    setIsRegistering(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Registration failed");
        return { success: false };
      }

      toast.success("Account created! Please sign in.");
      router.push("/login");
      return { success: true };
    } catch {
      toast.error("Network error. Please try again.");
      return { success: false };
    } finally {
      setIsRegistering(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      toast.success("Logged out");
      router.push("/login");
    } catch {
      toast.error("Failed to log out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    login,
    register,
    logout,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
  };
}

