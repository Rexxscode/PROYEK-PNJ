"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authAPI, clearStoredToken, getStoredToken } from "../lib/api";

interface AuthGuardProps {
  allowedRoles: ("student" | "admin" | "industry")[];
  children: React.ReactNode;
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const roleKey = allowedRoles.join(",");

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    let cancelled = false;

    authAPI
      .me(token)
      .then(({ user }) => {
        if (cancelled) return;

        if (!allowedRoles.includes(user.role)) {
          if (user.role === "admin") router.replace("/admin");
          else if (user.role === "industry") router.replace("/industry");
          else router.replace("/student");
          return;
        }

        // Sinkronkan sesi lokal agar halaman lain tetap berfungsi
        localStorage.setItem("studentEmail", user.email);
        localStorage.setItem("loggedUserName", user.name);
        localStorage.setItem("loggedUserRole", user.role);

        setAuthorized(true);
      })
      .catch(() => {
        if (cancelled) return;
        clearStoredToken();
        router.replace("/auth/login");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, roleKey]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
