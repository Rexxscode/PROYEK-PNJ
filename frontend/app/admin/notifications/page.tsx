"use client";

import { useState, useEffect } from "react";
import { Bell, Check, CheckCheck, Clock, Filter } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useAuth } from "../../lib/auth-context";
import { getNotificationsFor, markAsRead, markAllAsRead, type AppNotification } from "../../lib/notifications";

type FilterType = "all" | "unread";

const typeConfig: Record<string, { label: string; variant: "success" | "warning" | "danger" | "primary" }> = {
  assessment_done: { label: "Asesmen", variant: "primary" },
  materi_passed: { label: "Sertifikat", variant: "success" },
  roadmap_update: { label: "Roadmap", variant: "primary" },
  card_approval: { label: "Kartu", variant: "warning" },
  registration: { label: "Registrasi", variant: "warning" },
  system: { label: "Sistem", variant: "primary" },
};

export default function AdminNotificationsPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !user) return;
    const load = async () => {
      const data = await getNotificationsFor("admin", user.email);
      setNotifications(data);
      setLoading(false);
    };
    load();
  }, [mounted, user]);

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  if (!mounted || !user || loading) {
    return <div className="p-6"><SkeletonDashboard /></div>;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div>
      <DashboardHeader
        title="Notifikasi"
        subtitle={`${unreadCount} notifikasi belum dibaca`}
        showNotifications={false}
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-muted hover:text-foreground"
            }`}
          >
            Semua ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === "unread"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-muted hover:text-foreground"
            }`}
          >
            Belum Dibaca ({unreadCount})
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-16">
          <Bell className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">
            {filter === "unread" ? "Semua notifikasi sudah dibaca" : "Belum ada notifikasi"}
          </p>
          <p className="text-sm text-muted mt-1">
            {filter === "unread"
              ? "Tidak ada notifikasi baru yang perlu dibaca."
              : "Notifikasi akan muncul di sini saat ada aktivitas sistem."}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((notif) => {
            const cfg = typeConfig[notif.type] || typeConfig.system;
            return (
              <Card
                key={notif.id}
                className={`transition-colors ${
                  !notif.read
                    ? "bg-primary/5 border-primary/20"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    !notif.read
                      ? "bg-primary/10 text-primary"
                      : "bg-gray-100 dark:bg-gray-700 text-muted"
                  }`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground text-sm">{notif.text}</h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notif.time ? new Date(notif.time).toLocaleString("id-ID") : "-"}
                      </span>
                    </div>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:text-primary-dark font-medium transition-colors flex-shrink-0"
                    >
                      <Check className="w-3 h-3" />
                      Dibaca
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
