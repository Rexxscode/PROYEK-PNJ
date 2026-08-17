"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/layout/sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" currentPath={pathname} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
