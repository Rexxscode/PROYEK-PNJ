"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../components/layout/sidebar";

export default function IndustryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="industry" currentPath={pathname} isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main className="flex-1 p-8 transition-all" style={{ marginLeft: isCollapsed ? "72px" : "256px" }}>{children}</main>
    </div>
  );
}
