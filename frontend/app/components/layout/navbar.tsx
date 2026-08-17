"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../lib/theme-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SkillMatch
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Fitur
            </a>
            <a href="#about" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Tentang
            </a>
            <a href="#impact" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Dampak
            </a>
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

        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <a href="#features" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Fitur
              </a>
              <a href="#about" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Tentang
              </a>
              <a href="#impact" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Dampak
              </a>
              <hr className="my-2 border-border" />
              <button
                onClick={toggleTheme}
                className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left flex items-center gap-2"
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
        )}
      </div>
    </nav>
  );
}