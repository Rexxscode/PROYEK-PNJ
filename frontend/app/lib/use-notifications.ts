"use client";

import { useCallback, useEffect, useState } from "react";
import { getStoredToken, notificationAPI } from "./api";
import type { AppNotification } from "./notifications";

/**
 * Daftar notifikasi user yang sedang login dari backend,
 * menggantikan penyimpanan localStorage pada lib/notifications.ts.
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getStoredToken();
    if (!token) return;

    const list = await notificationAPI.getAll(token);
    setNotifications(list);
  }, []);

  useEffect(() => {
    let cancelled = false;
    // Data fetching: setState hanya terjadi setelah request selesai.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
      .catch(() => {
        /* biarkan daftar terakhir saat gagal */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const onUpdate = () => {
      void refresh();
    };
    window.addEventListener("notifications-updated", onUpdate);
    return () => {
      cancelled = true;
      window.removeEventListener("notifications-updated", onUpdate);
    };
  }, [refresh]);

  const markRead = useCallback(
    async (id: number) => {
      const token = getStoredToken();
      if (!token) return;
      await notificationAPI.markAsRead(id, token);
      await refresh();
    },
    [refresh]
  );

  const markAllRead = useCallback(async () => {
    const token = getStoredToken();
    if (!token) return;
    await notificationAPI.markAllAsRead(token);
    await refresh();
  }, [refresh]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, loading, markRead, markAllRead, refresh };
}
