"use client";

import { api, BACKEND_ENDPOINTS } from "./api";

export interface AppNotification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  createdAt: number;
  type: string;
  targetRole: "student" | "admin" | "industry";
  targetEmail?: string;
}

export async function addNotification(notif: Omit<AppNotification, "id" | "createdAt" | "read" | "time">) {
  try {
    await api.post(BACKEND_ENDPOINTS.notifications.create, {
      text: notif.text,
      type: notif.type,
      role: notif.targetRole,
      target_email: notif.targetEmail ?? null,
    });
  } catch {
    // Silently ignore notification failures; never block the primary action.
  }
}

export async function getNotificationsFor(role: string, email?: string): Promise<AppNotification[]> {
  try {
    const res = await api.get<{ success: boolean; data: { id: string; text: string; type: string; read: boolean; role?: string; target_email?: string | null; created_at?: string }[] }>(
      BACKEND_ENDPOINTS.notifications.list,
    );
    if (!res.success) return [];
    return res.data
      .filter((n) => !n.role || n.role === role)
      .filter((n) => !n.target_email || !email || n.target_email === email)
      .map((n) => ({
        id: n.id,
        text: n.text,
        time: n.created_at ?? "",
        createdAt: n.created_at ? new Date(n.created_at).getTime() : Date.now(),
        read: n.read,
        type: n.type,
        targetRole: (n.role as AppNotification["targetRole"]) || role,
        targetEmail: n.target_email ?? undefined,
      }));
  } catch {
    return [];
  }
}

export async function getUnreadCount(role: string, email?: string): Promise<number> {
  try {
    const res = await api.get<{ success: boolean; data: { count: number } }>(BACKEND_ENDPOINTS.notifications.unreadCount);
    return res.success ? res.data.count : 0;
  } catch {
    return 0;
  }
}

export async function markAsRead(id: string) {
  try {
    await api.post(BACKEND_ENDPOINTS.notifications.markRead(id));
  } catch {
    // ignore
  }
}

export async function markAllAsRead(_role?: string, _email?: string) {
  try {
    await api.post(BACKEND_ENDPOINTS.notifications.markAllRead);
  } catch {
    // ignore
  }
}