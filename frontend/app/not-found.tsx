"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <span className="text-[120px] font-bold text-primary/10 dark:text-primary/5 leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-muted mb-8">Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
