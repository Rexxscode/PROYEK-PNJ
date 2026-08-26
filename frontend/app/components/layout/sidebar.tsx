"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
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
  Menu,
  X,
  UserPlus,
  Lock,
} from "lucide-react";
import { cn, getInitials } from "../../lib/utils";
import { getCurrentStudent } from "../../lib/mock-data";

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
    { label: "Data Industry", href: "/admin/industries", icon: Building2 },
    { label: "Kelola Admin", href: "/admin/accounts", icon: UserPlus },
    { label: "Statistik", href: "/admin/statistics", icon: BarChart3 },
  ],
  industry: [
    { label: "Dashboard", href: "/industry", icon: LayoutDashboard },
    { label: "Cari Kandidat", href: "/industry/candidates", icon: Users },
    { label: "Lowongan Saya", href: "/industry/my-jobs", icon: Briefcase },
    { label: "Post Lowongan", href: "/industry/post-job", icon: Building2 },
  ],
};

const roleLabels = {
  student: "Siswa",
  admin: "Admin/Guru",
  industry: "Industri/HRD",
};

const roleColors = {
  student: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  admin: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
  industry: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
};

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-card border border-border shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <Menu className="w-5 h-5 text-foreground" />
    </button>
  );
}

export default function Sidebar({ role, currentPath, isCollapsed = false, onToggle }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: { open: mobileOpen } }));
  }, [mobileOpen]);
  const [profilePhoto, setProfilePhoto] = useState("");
  useEffect(() => {
    setMounted(true);
    const photo = localStorage.getItem("profilePhoto");
    if (photo) setProfilePhoto(photo);
    const handlePhotoUpdate = () => {
      const photo = localStorage.getItem("profilePhoto");
      setProfilePhoto(photo || "");
    };
    window.addEventListener("profile-photo-updated", handlePhotoUpdate as EventListener);
    return () => window.removeEventListener("profile-photo-updated", handlePhotoUpdate as EventListener);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  const studentData = mounted ? getCurrentStudent() : null;
  const storedName = mounted ? localStorage.getItem("loggedUserName") : null;
  const storedEmail = mounted ? localStorage.getItem("studentEmail") : null;
  const user = role === "student" && studentData
    ? studentData.profile
    : { id: "", name: storedName || (role === "admin" ? "Admin" : "Industry"), email: storedEmail || "", role, major: "", grade: "", avatar: "", createdAt: "" };

  const items = navItems[role];

  return (
    <>
      <MobileMenuButton onClick={() => setMobileOpen(true)} />

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "h-screen bg-sidebar-bg border-r border-border flex flex-col transition-all duration-300 fixed left-0 top-0 z-40",
          isCollapsed ? "w-[72px]" : "w-64",
          "max-lg:hidden"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/" className={cn("flex items-center gap-2", isCollapsed && "justify-center flex-1")}>
            <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-8 h-8 rounded-lg object-contain flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
                SkillMatch
              </span>
            )}
          </Link>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            const isJobsLocked = role === "student" && item.href === "/student/jobs" && user.grade !== "XII";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                {!isCollapsed && (
                  <span className="flex-1">{item.label}</span>
                )}
                {!isCollapsed && isJobsLocked && (
                  <span className="flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 whitespace-nowrap">
                    <Lock className="w-2.5 h-2.5" />
                    XII
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className={cn("flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800", isCollapsed && "justify-center")}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-white">{getInitials(user.name)}</span>
              )}
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

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "lg:hidden h-screen bg-sidebar-bg border-r border-border flex flex-col transition-all duration-300 fixed left-0 top-0 z-50 w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SkillMatch
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            const isJobsLocked = role === "student" && item.href === "/student/jobs" && user.grade !== "XII";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                <span className="flex-1">{item.label}</span>
                {isJobsLocked && (
                  <span className="flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 whitespace-nowrap">
                    <Lock className="w-2.5 h-2.5" />
                    XII
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-white">{getInitials(user.name)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", roleColors[role])}>
                {roleLabels[role]}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
