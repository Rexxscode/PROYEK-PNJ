"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, Check, X, IdCard, Users, Eye, BadgeCheck } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import {
  getRegisteredUsers,
  approveStudentCard,
  removeStudentCard,
  majorCodeToName,
  normalizeGrade,
  type RegisteredUser,
} from "../../lib/mock-data";
import { useToast } from "../../lib/toast-context";
import { addNotification } from "../../lib/notifications";

export default function CardVerificationPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<RegisteredUser[]>([]);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<{ name: string; img: string } | null>(null);

  const refresh = () => {
    const all = getRegisteredUsers().filter((u) => u.role === "student" && !!u.studentCard);
    all.sort((a, b) => {
      const aApproved = a.cardStatus === "approved" ? 1 : 0;
      const bApproved = b.cardStatus === "approved" ? 1 : 0;
      return aApproved - bApproved;
    });
    setRows(all);
  };

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("students-updated", handler);
    return () => window.removeEventListener("students-updated", handler);
  }, []);

  const pendingCount = rows.filter((r) => r.cardStatus !== "approved").length;

  const filtered = rows.filter((r) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const major = majorCodeToName(r.major || "");
    const grade = normalizeGrade(r.grade || "");
    return (
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      major.toLowerCase().includes(q) ||
      grade.toLowerCase().includes(q)
    );
  });

  const handleApprove = (email: string) => {
    approveStudentCard(email);
    refresh();
    window.dispatchEvent(new CustomEvent("students-updated"));
    addNotification({
      text: "Kartu pelajarmu telah disetujui — semua fitur siswa kini terbuka.",
      type: "card_approval",
      targetRole: "student",
      targetEmail: email,
    });
    window.dispatchEvent(new CustomEvent("notifications-updated"));
    toast("Kartu pelajar disetujui — fitur siswa terbuka");
  };

  const handleReject = (email: string) => {
    removeStudentCard(email);
    refresh();
    window.dispatchEvent(new CustomEvent("students-updated"));
    addNotification({
      text: "Kartu pelajarmu ditolak saat verifikasi. Silakan unggah ulang kartu yang jelas di halaman Profil.",
      type: "card_approval",
      targetRole: "student",
      targetEmail: email,
    });
    window.dispatchEvent(new CustomEvent("notifications-updated"));
    toast("Kartu pelajar ditolak — siswa dapat mengunggah ulang", "warning");
  };

  return (
    <div>
      <DashboardHeader
        title="Verifikasi Kartu Pelajar"
        subtitle="Periksa dan setujui kartu pelajar yang dikirim siswa"
        role="admin"
      />

      {pendingCount > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          {pendingCount} kartu menunggu verifikasi
        </div>
      )}

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Cari nama, email, jurusan, atau kelas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Belum ada kartu pelajar ditemukan</p>
          <p className="text-sm text-muted mt-1">
            {search
              ? "Coba ubah kata kunci pencarian"
              : "Siswa yang mengunggah kartu pelajar akan muncul di sini"}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const pending = p.cardStatus !== "approved";
            return (
              <Card key={p.email}>
                <div className="flex flex-col sm:flex-row gap-4">
                  {p.studentCard ? (
                    <button
                      type="button"
                      onClick={() => setPreview({ name: p.name, img: p.studentCard as string })}
                      title="Klik untuk memperbesar kartu pelajar"
                      className="flex-shrink-0 group"
                    >
                      <img
                        src={p.studentCard}
                        alt={`Kartu pelajar ${p.name}`}
                        className="h-28 w-40 object-cover rounded-xl border border-border transition-transform group-hover:scale-[1.02] group-hover:ring-2 group-hover:ring-primary/40 cursor-zoom-in"
                      />
                    </button>
                  ) : (
                    <div className="h-28 w-40 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <IdCard className="w-8 h-8 text-muted" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted break-all">{p.email}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="primary">{majorCodeToName(p.major || "")}</Badge>
                        <Badge variant="secondary">Kelas {normalizeGrade(p.grade || "")}</Badge>
                        {pending ? (
                          <Badge variant="warning">Menunggu Verifikasi</Badge>
                        ) : (
                          <Badge variant="success">
                            <span className="inline-flex items-center gap-1">
                              <BadgeCheck className="w-3 h-3" /> Disetujui
                            </span>
                          </Badge>
                        )}
                      </div>
                    </div>
                    {pending && (
                      <div className="flex gap-2 ml-auto sm:ml-0 flex-wrap">
                        <button
                          onClick={() => handleApprove(p.email)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                        >
                          <Check className="w-4 h-4" /> Setujui
                        </button>
                        <button
                          onClick={() => handleReject(p.email)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          <X className="w-4 h-4" /> Tolak
                        </button>
                      </div>
                    )}
                    {!pending && (
                      <Eye className="w-4 h-4 text-muted hidden sm:block" />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Kartu Pelajar Preview Modal */}
      {preview &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setPreview(null)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Kartu Pelajar — {preview.name}</h3>
                <button
                  onClick={() => setPreview(null)}
                  className="p-1.5 text-muted hover:text-foreground transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <img src={preview.img} alt={`Kartu pelajar ${preview.name}`} className="w-full rounded-xl border border-border object-contain" />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}