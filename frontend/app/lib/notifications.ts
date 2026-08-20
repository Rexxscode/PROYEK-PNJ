"use client";

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

const STORAGE_KEY = "app_notifications";

function generateId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getAllNotifications(): AppNotification[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAll(notifs: AppNotification[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs));
}

export function getNotificationsFor(role: string, email?: string): AppNotification[] {
  const all = getAllNotifications();
  return all
    .filter((n) => {
      if (n.targetRole !== role) return false;
      if (n.targetEmail && email && n.targetEmail !== email) return false;
      return true;
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getUnreadCount(role: string, email?: string): number {
  return getNotificationsFor(role, email).filter((n) => !n.read).length;
}

export function addNotification(notif: Omit<AppNotification, "id" | "createdAt" | "read" | "time">) {
  const all = getAllNotifications();
  const newNotif: AppNotification = {
    ...notif,
    id: generateId(),
    createdAt: Date.now(),
    read: false,
    time: "Baru saja",
  };
  all.unshift(newNotif);
  saveAll(all);
  return newNotif;
}

export function markAsRead(id: string) {
  const all = getAllNotifications();
  const updated = all.map((n) => (n.id === id ? { ...n, read: true } : n));
  saveAll(updated);
}

export function markAllAsRead(role: string, email?: string) {
  const all = getAllNotifications();
  const updated = all.map((n) => {
    if (n.targetRole !== role) return n;
    if (n.targetEmail && email && n.targetEmail !== email) return n;
    return { ...n, read: true };
  });
  saveAll(updated);
}

export function clearAllFor(role: string) {
  const all = getAllNotifications();
  saveAll(all.filter((n) => n.targetRole !== role));
}
