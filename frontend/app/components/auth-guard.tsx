"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "../lib/mock-data";

interface AuthGuardProps {
  allowedRoles: ("student" | "admin" | "industry")[];
  children: React.ReactNode;
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("studentEmail");
    if (!email) {
      router.replace("/auth/login");
      return;
    }
    const role = getUserRole(email);
    if (!allowedRoles.includes(role)) {
      if (role === "admin") router.replace("/admin");
      else if (role === "industry") router.replace("/industry");
      else router.replace("/student");
      return;
    }
    setAuthorized(true);
  }, [allowedRoles, router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
