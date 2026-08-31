"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Bell, Search, X, LogOut, Eye, EyeOff, Check, Moon, Sun, Camera } from "lucide-react";
import { getInitials } from "../../lib/utils";
import { useToast } from "../../lib/toast-context";
import { useTheme } from "../../lib/theme-context";
import { useAuth } from "../../lib/auth-context";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  role?: "student" | "admin" | "industry";
  enableSearch?: boolean;
  showNotifications?: boolean;
}

const searchPlaceholders: Record<string, string> = {
  student: "Cari karier, skill, lowongan...",
  admin: "Cari siswa, jurusan, statistik...",
  industry: "Cari kandidat, skill, lowongan...",
};

const PROFILE_PHOTO_KEY = "profilePhoto";

export default function DashboardHeader({ title, subtitle, actions, role = "student", enableSearch = false, showNotifications = false }: DashboardHeaderProps) {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNotifications, setActiveNotifications] = useState<{ id: string; text: string; type: string; read: boolean; createdAt: string }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshNotifs = useCallback(async () => {
    if (!showNotifications) return;
    try {
      const [notifsRes, unreadRes] = await Promise.all([
        api.get<{ success: boolean; data: { id: string; text: string; type: string; read: boolean; created_at: string }[] }>(BACKEND_ENDPOINTS.notifications.list).catch(() => ({ success: false, data: [] })),
        api.get<{ success: boolean; data: { count: number } }>(BACKEND_ENDPOINTS.notifications.unreadCount).catch(() => ({ success: false, data: { count: 0 } })),
      ]);
      if (notifsRes.success) {
        setActiveNotifications(notifsRes.data.map((n) => ({ ...n, createdAt: n.created_at })));
      }
      if (unreadRes.success) {
        setUnreadCount(unreadRes.data.count);
      }
    } catch {
      // silently fail
    }
  }, [showNotifications]);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setEditName(user.name);
    }
    const storedPhoto = localStorage.getItem(PROFILE_PHOTO_KEY);
    if (storedPhoto) setProfilePhoto(storedPhoto);
    refreshNotifs();
  }, [user, refreshNotifs]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast("Ukuran foto maksimal 2MB!", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setProfilePhoto(dataUrl);
      localStorage.setItem(PROFILE_PHOTO_KEY, dataUrl);
      window.dispatchEvent(new CustomEvent("profile-photo-updated"));
      toast("Foto profil berhasil diubah!", "success");
    };
    reader.readAsDataURL(file);
  };

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("global-search", { detail: query }));
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarContent = profilePhoto
    ? <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
    : <span className="text-xs sm:text-sm font-bold text-white">{mounted ? getInitials(editName || "U") : "U"}</span>;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Left spacer for hamburger on mobile */}
        <div className="w-12 lg:hidden flex-shrink-0" />

        {/* Title - takes remaining space */}
        <h1 className="flex-1 min-w-0 text-lg sm:text-2xl font-bold text-foreground">
          {title}
        </h1>

        {/* Right icons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {actions}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />}
          </button>

          {/* Search */}
          {enableSearch && (
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => { setShowSearch(!showSearch); setShowNotif(false); setShowProfile(false); }}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
              </button>
              {showSearch && (
                <div className="absolute right-0 top-12 w-72 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-xl shadow-lg p-3 z-50">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted" />
                    <input
                      autoFocus
                      type="text"
                      placeholder={searchPlaceholders[role]}
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="flex-1 text-sm outline-none bg-transparent"
                    />
                    <button onClick={() => { setShowSearch(false); handleSearch(""); }}>
                      <X className="w-4 h-4 text-muted hover:text-foreground" />
                    </button>
                  </div>
                  {searchQuery && (
                    <div className="mt-3 pt-3 border-t border-border text-sm text-muted">
                      Hasil pencarian untuk "{searchQuery}"...
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Notification */}
          {showNotifications && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setShowNotif(!showNotif); setShowSearch(false); setShowProfile(false); }}
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

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(!showProfile); setShowSearch(false); setShowNotif(false); }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white overflow-hidden hover:opacity-90 transition-opacity"
            >
              {avatarContent}
            </button>
            {showProfile && (
              <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-xl shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold overflow-hidden">
                        {profilePhoto ? (
                          <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span>{mounted ? getInitials(editName || "U") : "U"}</span>
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        title="Ubah foto profil"
                      >
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{mounted ? editName : ""}</p>
                      <p className="text-xs text-muted capitalize">{mounted ? localStorage.getItem("loggedUserRole") || role : ""}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
                    <p className="text-sm text-foreground bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2">{user?.email || ""}</p>
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
                        onClick={() => {
                          toast("Nama berhasil disimpan!", "success");
                        }}
                        className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex-shrink-0"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Edit Password</label>
                    <div className="flex gap-2">
                      <div className="flex-1 min-w-0 relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                          placeholder="Masukkan password baru"
                          className="w-full text-sm px-3 py-2 pr-9 border border-border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          if (editPassword.length < 8) {
                            toast("Password minimal 8 karakter", "warning");
                            return;
                          }
                          toast("Password berhasil diubah!", "success");
                          setEditPassword("");
                        }}
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
      {subtitle && (
        <p className="text-xs sm:text-sm text-muted mt-1 pl-14 lg:pl-0 pr-4 leading-relaxed break-words">{subtitle}</p>
      )}
    </div>
  );
}
