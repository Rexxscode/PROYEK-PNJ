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

export function getGapStatusColor(status: "mastered" | "improving" | "needed"): string {
  switch (status) {
    case "mastered":
      return "bg-emerald-500";
    case "improving":
      return "bg-amber-400";
    case "needed":
      return "bg-red-500";
  }
}

export function getGapStatusLabel(status: "mastered" | "improving" | "needed"): string {
  switch (status) {
    case "mastered":
      return "Dikuasai";
    case "improving":
      return "Perlu Ditingkatkan";
    case "needed":
      return "Belum Dikuasai";
  }
}

export function getReadinessLabel(score: number): string {
  if (score >= 85) return "Sangat Siap";
  if (score >= 70) return "Siap";
  if (score >= 50) return "Perlu Persiapan";
  return "Mulai Belajar";
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