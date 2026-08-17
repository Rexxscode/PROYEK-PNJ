"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
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
            <Link href="/#features" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Fitur
            </Link>
            <Link href="/#about" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Tentang
            </Link>
            <Link href="/#impact" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
              Dampak
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
               href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-gray-50 transition-colors"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link href="/#features" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 rounded-lg transition-colors">
                Fitur
              </Link>
              <Link href="/#about" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 rounded-lg transition-colors">
                Tentang
              </Link>
              <Link href="/#impact" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 rounded-lg transition-colors">
                Dampak
              </Link>
              <hr className="my-2 border-border" />
              <Link href="/auth/login" className="px-3 py-2 text-sm font-medium text-muted hover:bg-gray-50 rounded-lg transition-colors">
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