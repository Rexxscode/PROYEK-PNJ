"use client";

import Link from "next/link";
import {
  Zap,
  LayoutDashboard,
  ClipboardCheck,
  Target,
  Map,
  Briefcase,
  GraduationCap,
  Users,
  Building2,
  BarChart3,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { cn, getInitials } from "../../lib/utils";
import { currentUser, adminUser, industryUser } from "../../lib/mock-data";

interface SidebarProps {
  role: "student" | "admin" | "industry";
  currentPath: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const navItems = {
  student: [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "Know Yourself", href: "/student/assessment", icon: ClipboardCheck },
    { label: "Know Your Path", href: "/student/career-match", icon: Target },
    { label: "Roadmap Belajar", href: "/student/roadmap", icon: Map },
    { label: "Portfolio", href: "/student/portofolio", icon: GraduationCap },
    { label: "Lowongan", href: "/student/jobs", icon: Briefcase },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Data Siswa", href: "/admin/students", icon: Users },
    { label: "Statistik", href: "/admin", icon: BarChart3 },
  ],
  industry: [
    { label: "Dashboard", href: "/industry", icon: LayoutDashboard },
    { label: "Cari Kandidat", href: "/industry/candidates", icon: Users },
  ],
};

const roleLabels = {
  student: "Siswa",
  admin: "Admin/Guru",
  industry: "Industri/HRD",
};

const roleColors = {
  student: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
  industry: "bg-emerald-100 text-emerald-700",
};

const userData = {
  student: currentUser,
  admin: adminUser,
  industry: industryUser,
};

export default function Sidebar({ role, currentPath, isCollapsed = false, onToggle }: SidebarProps) {
  const items = navItems[role];
  const user = userData[role];

  return (
    <aside
      className={cn(
        "h-screen bg-white border-r border-border flex flex-col transition-all duration-300 fixed left-0 top-0 z-40",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
              SkillMatch
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = currentPath === item.href || (item.href !== `/` && currentPath.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-gray-50 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <div className={cn("flex items-center gap-3 p-2 rounded-lg bg-gray-50", isCollapsed && "justify-center")}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">{getInitials(user.name)}</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", roleColors[role])}>
                {roleLabels[role]}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
