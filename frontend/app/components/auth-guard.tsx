"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";

interface AuthGuardProps {
  allowedRoles: ("student" | "admin" | "industry")[];
  children: React.ReactNode;
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.replace("/auth/login");
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "admin") router.replace("/admin");
    else if (user.role === "industry") router.replace("/industry");
    else router.replace("/student");
    return null;
  }

  return <>{children}</>;
}
