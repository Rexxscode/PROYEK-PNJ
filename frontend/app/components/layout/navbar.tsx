"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Route,
  BarChart,
  TrendingUp,
  Mail,
} from "lucide-react";

import { useTheme } from "../../lib/theme-context";

const navLinks = [
  { href: "#features", label: "Fitur", icon: Sparkles },
  { href: "#about", label: "Cara Kerja", icon: Route },
  { href: "#stats", label: "Statistik", icon: BarChart },
  { href: "#impact", label: "Dampak", icon: TrendingUp },
  { href: "#contact", label: "Kontak", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-xl font-bold text-primary">
              SkillMatch
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-sm font-medium text-muted hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? "560px" : "0px", opacity: isOpen ? 1 : 0 }}
        >
          <div className="flex flex-col gap-1 pb-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-foreground rounded-lg transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </a>
            ))}
            <div className="my-2 border-t border-border" />
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-foreground rounded-lg transition-colors"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {theme === "light" ? "Mode Gelap" : "Mode Terang"}
            </button>
            <Link href="/auth/login" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
              Masuk
            </Link>
            <Link href="/auth/register" className="px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors text-center">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}