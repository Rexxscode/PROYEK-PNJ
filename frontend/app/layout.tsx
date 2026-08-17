import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillMatch - Career Readiness Platform",
  description:
    "Platform career readiness yang menjembatani kesenjangan kompetensi antara siswa vokasi dan kebutuhan industri.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import Sidebar from "@/components/layout/Sidebar";

export default function StudentLayout({ children }: LayoutProps<"/student">) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" currentPath="/student" />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}

import Sidebar from "@/components/layout/Sidebar";

export default function StudentLayout({ children }: LayoutProps<"/student">) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" currentPath="/student" />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}