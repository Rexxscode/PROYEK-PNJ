"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Bell, LogOut, Camera, User, Moon, Sun, Check } from "lucide-react";
import { useToast } from "../../lib/toast-context";
import { useTheme } from "../../lib/theme-context";
import { useAuth } from "../../lib/auth-context";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";

interface DashboardNavbarProps {
  role: "student" | "admin" | "industry";
  enableSearch?: boolean;
  showNotifications?: boolean;
}

export default function DashboardNavbar({ role, enableSearch = true, showNotifications = true }: DashboardNavbarProps) {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState<{ id: string; text: string; type: string; read: boolean; createdAt: string }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [editName, setEditName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const refreshNotifs = useCallback(async () => {
    if (!showNotifications) return;
    try {
      const [notifsRes, unreadRes] = await Promise.all([
        api.get<{ success: boolean; data: { id: string; text: string; type: string; read: boolean; created_at: string }[] }>(BACKEND_ENDPOINTS.notifications.list).catch(() => ({ success: false, data: [] })),
        api.get<{ success: boolean; data: { count: number } }>(BACKEND_ENDPOINTS.notifications.unreadCount).catch(() => ({ success: false, data: { count: 0 } })),
      ]);
      if (notifsRes.success) setActiveNotifications(notifsRes.data.map((n) => ({ ...n, createdAt: n.created_at })));
      if (unreadRes.success) setUnreadCount(unreadRes.data.count);
    } catch {
      // silently fail
    }
  }, [showNotifications]);

  useEffect(() => {
    setMounted(true);
    if (user) setEditName(user.name);
    setProfilePhoto(user?.student?.avatar || "");
    refreshNotifs();
    const handler = () => refreshNotifs();
    window.addEventListener("notifications-updated", handler);
    return () => window.removeEventListener("notifications-updated", handler);
  }, [user, refreshNotifs]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await api.post(BACKEND_ENDPOINTS.notifications.markAllRead);
      refreshNotifs();
      toast("Semua notifikasi ditandai sudah dibaca", "success");
    } catch {
      // silently fail
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await api.post(BACKEND_ENDPOINTS.notifications.markRead(id));
      refreshNotifs();
    } catch {
      // silently fail
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-2 px-4 lg:px-8 h-16">
        <div className="flex-1" />

        {/* Right icons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />}
          </button>

          {/* Notification */}
          {showNotifications && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-xl shadow-lg z-50">
                  <div className="p-3 border-b border-border flex items-center justify-between">
                    <p className="font-semibold text-sm text-foreground">
                      Notifikasi
                      {unreadCount > 0 && <span className="ml-2 text-xs font-normal text-primary">({unreadCount} baru)</span>}
                    </p>
                    {unreadCount > 0 && (
                      <span onClick={handleMarkAllRead} className="text-xs text-primary cursor-pointer hover:underline">
                        Tandai semua dibaca
                      </span>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {activeNotifications.length === 0 ? (
                      <div className="px-3 py-6 text-center text-sm text-muted">Tidak ada notifikasi baru</div>
                    ) : (
                      activeNotifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleMarkRead(n.id)}
                          className={`px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-border/50 last:border-0 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
                        >
                          <div className="flex items-start gap-2">
                            {!n.read && <span className="mt-1.5 w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${!n.read ? "text-foreground font-medium" : "text-muted"}`}>{n.text}</p>
                              <p className="text-xs text-muted mt-1">{n.createdAt}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile - photo + name */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
              className="flex items-center gap-2 pl-1.5 pr-2 sm:pr-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              {mounted && user && (
                <span className="hidden sm:inline text-sm font-medium text-foreground max-w-[120px] truncate">{user.name}</span>
              )}
            </button>
            {showProfile && (
              <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-xl shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{mounted ? editName || user?.name : ""}</p>
                      <p className="text-xs text-muted capitalize truncate">{mounted ? localStorage.getItem("loggedUserRole") || role : ""}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
                    <p className="text-sm text-foreground bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2 truncate">{user?.email || ""}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Role</label>
                    <p className="text-sm text-foreground bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2 capitalize">{user?.role || role}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Edit Nama</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 min-w-0 text-sm px-3 py-2 border border-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      <button
                        onClick={() => toast("Nama berhasil disimpan!", "success")}
                        className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex-shrink-0"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-border">
                  <Link
                    href="/"
                    onClick={async () => {
                      await logout();
                      toast("Berhasil keluar", "info");
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}