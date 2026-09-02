"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../components/layout/sidebar";
import DashboardNavbar from "../components/layout/dashboard-navbar";
import PageTransition from "../components/ui/page-transition";
import AuthGuard from "../components/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-background">
        <Sidebar role="admin" currentPath={pathname} isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
        <main className={`flex-1 min-w-0 transition-[margin] duration-300 ${isCollapsed ? "main-sidebar-collapsed" : "main-sidebar"}`}>
          <DashboardNavbar role="admin" />
          <div className="p-4 lg:p-8">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
