"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, X } from "lucide-react";

interface Notification {
  id: number;
  text: string;
  time: string;
}

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  role?: "student" | "admin" | "industry";
}

const notificationsByRole: Record<string, Notification[]> = {
  student: [
    { id: 1, text: "Lowongan baru: Frontend Developer di PT TechSol", time: "5 menit lalu" },
    { id: 2, text: "Roadmap belajar React sudah siap diikuti", time: "1 jam lalu" },
    { id: 3, text: "Portfolio kamu sudah dilihat 12 perusahaan", time: "3 jam lalu" },
  ],
  admin: [
    { id: 1, text: "Budi Santoso menyelesaikan asesmen", time: "5 menit lalu" },
    { id: 2, text: "10 siswa baru mendaftar minggu ini", time: "1 jam lalu" },
    { id: 3, text: "Rina Wulandari mengunggah portfolio", time: "3 jam lalu" },
  ],
  industry: [
    { id: 1, text: "3 kandidat baru sesuai kriteria kamu", time: "5 menit lalu" },
    { id: 2, text: "Lowongan Backend Developer sudah ditinjau 45 kandidat", time: "1 jam lalu" },
    { id: 3, text: "Andi Pratama tersedia untuk magang", time: "3 jam lalu" },
  ],
};

const searchPlaceholders: Record<string, string> = {
  student: "Cari karier, skill, lowongan...",
  admin: "Cari siswa, jurusan, statistik...",
  industry: "Cari kandidat, skill, lowongan...",
};

export default function DashboardHeader({ title, subtitle, actions, role = "student" }: DashboardHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnread, setHasUnread] = useState(true);
  const [activeNotifications, setActiveNotifications] = useState(notificationsByRole[role]);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}

        {/* Search */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => { setShowSearch(!showSearch); setShowNotif(false); }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Search className="w-5 h-5 text-muted" />
          </button>
          {showSearch && (
            <div className="absolute right-0 top-12 w-72 bg-white border border-border rounded-xl shadow-lg p-3 z-50">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted" />
                <input
                  autoFocus
                  type="text"
                  placeholder={searchPlaceholders[role]}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm outline-none bg-transparent"
                />
                <button onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
                  <X className="w-4 h-4 text-muted hover:text-foreground" />
                </button>
              </div>
              {searchQuery && (
                <div className="mt-3 pt-3 border-t border-border text-sm text-muted">
                  Hasil pencarian untuk &quot;{searchQuery}&quot;...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowSearch(false); }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted" />
            {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />}
          </button>
          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-border rounded-xl shadow-lg z-50">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <p className="font-semibold text-sm text-foreground">Notifikasi</p>
                <span onClick={() => { setHasUnread(false); setActiveNotifications([]); }} className="text-xs text-primary cursor-pointer hover:underline">Tandai semua dibaca</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {activeNotifications.length === 0 ? (
                  <div className="px-3 py-6 text-center text-sm text-muted">Tidak ada notifikasi baru</div>
                ) : (
                  activeNotifications.map((n) => (
                    <div key={n.id} className="px-3 py-3 hover:bg-gray-50 cursor-pointer border-b border-border/50 last:border-0">
                      <p className="text-sm text-foreground">{n.text}</p>
                      <p className="text-xs text-muted mt-1">{n.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
