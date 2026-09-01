"use client";

import { useState, useEffect } from "react";
import { BadgeCheck, Lock, Sparkles, Upload, Clock } from "lucide-react";
import Card from "./ui/card";
import Link from "next/link";
import { useAuth } from "../lib/auth-context";

export default function StudentCardGate({ children, skip = false }: { children: React.ReactNode; skip?: boolean }) {
  const { user, loading } = useAuth();
  const [state, setState] = useState<"loading" | "locked" | "open">("loading");
  const [cardStatus, setCardStatus] = useState<"none" | "pending" | "approved">("none");

  useEffect(() => {
    if (skip) {
      setState("open");
      return;
    }
    if (loading) {
      setState("loading");
      return;
    }
    const status = user?.student?.card_status ?? "none";
    setCardStatus(status);
    setState(status === "approved" ? "open" : "locked");
  }, [skip, user, loading]);

  if (state === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (state === "locked") {
    const pending = cardStatus === "pending";
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-5">
            {pending ? (
              <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            ) : (
              <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            )}
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Fitur Terkunci</h2>
          <p className="text-sm text-muted mb-2">
            {pending
              ? "Kartu pelajarmu sedang menunggu verifikasi admin. Fitur asesmen, sertifikat, roadmap, dan lowongan akan terbuka otomatis setelah kartu disetujui."
              : "Kamu belum melengkapi Kartu Pelajar. Fitur asesmen, sertifikat, roadmap, dan lowongan baru bisa diakses setelah kartu pelajar diunggah di halaman Profil."}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 mb-6">
            {pending ? (
              <>
                <Clock className="w-3.5 h-3.5" />
                Menunggu persetujuan admin.
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                Unggah kartu pelajar untuk melanjutkan.
              </>
            )}
          </div>
          <Link
            href="/student/profile"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            <BadgeCheck className="w-4 h-4" />
            {pending ? "Cek Status Kartu" : "Ke Profil & Upload Kartu"}
          </Link>
          {pending && (
            <div className="mt-5 flex items-start gap-2 text-left text-xs text-muted bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p>Kartu pelajar yang diunggah akan dicek oleh admin sebelum fitur dibuka.</p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}