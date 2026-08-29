import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMatchColor(percentage: number): string {
  if (percentage >= 80) return "text-emerald-600";
  if (percentage >= 60) return "text-amber-600";
  return "text-red-500";
}

export function getMatchBg(percentage: number): string {
  if (percentage >= 80) return "bg-emerald-100 text-emerald-700";
  if (percentage >= 60) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-600";
}

export interface ReadinessTier {
  level: number;
  label: string;
  status: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
}

export function getReadinessTier(score: number): ReadinessTier {
  if (score >= 85) return { level: 4, label: "Job Ready", status: "Siap Bekerja", color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-100 dark:bg-emerald-900/50", borderColor: "border-emerald-300 dark:border-emerald-700", icon: "🟢", description: "Skill kamu sudah memenuhi standar industri. Siap melamar pekerjaan!" };
  if (score >= 70) return { level: 3, label: "Almost Ready", status: "Hampir Siap", color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/50", borderColor: "border-amber-300 dark:border-amber-700", icon: "🟡", description: "Kamu sudah memiliki dasar yang kuat. Tingkatkan skill gap yang tersisa." };
  if (score >= 50) return { level: 2, label: "Developing", status: "Sedang Berkembang", color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/50", borderColor: "border-orange-300 dark:border-orange-700", icon: "🟠", description: "Kamu sedang dalam proses belajar. Fokus pada skill gap utama." };
  return { level: 1, label: "Exploration", status: "Eksplorasi", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/50", borderColor: "border-red-300 dark:border-red-700", icon: "🔴", description: "Mulai petualangan karier kamu! Ikuti assessment untuk mengetahui potensimu." };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}