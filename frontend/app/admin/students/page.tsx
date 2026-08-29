"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, ChevronDown, ChevronUp, Check, X, Users, Eye, Clock } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import {
  getAllStudentsList,
  getPendingStudentRegistrations,
  getPendingStudentApprovals,
  setRegistrationStatus,
  setGradeOverride,
  normalizeGrade,
  getStudentCardDataUrl,
  getStudentCardStatus,
  approveStudentCard,
  type RegisteredUser,
} from "../../lib/mock-data";
import { addNotification } from "../../lib/notifications";
import { useToast } from "../../lib/toast-context";

const GRADE_CHOICES = ["X", "XI", "XII", "Alumni"];

type StudentRow = {
  name: string;
  email: string;
  major: string;
  grade: string;
  source: "seed" | "registered";
};

export default function StudentsPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [majorOpen, setMajorOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const majorTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [pending, setPending] = useState<RegisteredUser[]>([]);
  const [approvals, setApprovals] = useState<RegisteredUser[]>([]);
  const [preview, setPreview] = useState<{ name: string; img: string } | null>(null);

  const refresh = () => {
    setRows(getAllStudentsList());
    setPending(getPendingStudentRegistrations());
    setApprovals(getPendingStudentApprovals());
  };

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("students-updated", handler);
    return () => window.removeEventListener("students-updated", handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => setSearch((e as CustomEvent).detail || "");
    window.addEventListener("global-search", handler);
    return () => window.removeEventListener("global-search", handler);
  }, []);

  const registeredStatus = (email: string) => {
    const reg = pending.find((p) => p.email.toLowerCase() === email.toLowerCase());
    return reg?.status;
  };

  const approvedRows = rows.filter((s) => {
    if (s.source === "registered" && registeredStatus(s.email) !== "approved") return false;
    return true;
  });

  const filtered = approvedRows.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.major.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q);
    const matchesMajor = majorFilter === "all" || s.major === majorFilter;
    const st = s.source === "registered" ? "registered" : "seed";
    const matchesStatus = statusFilter === "all" || statusFilter === st;
    return matchesSearch && matchesMajor && matchesStatus;
  });

  const majors = [...new Set(approvedRows.map((s) => s.major))];

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

  const handleGradeChange = (email: string, grade: string) => {
    setGradeOverride(email, normalizeGrade(grade));
    refresh();
    window.dispatchEvent(new CustomEvent("students-updated"));
    toast(`Kelas ${email} diubah menjadi ${normalizeGrade(grade)}`);
  };

  const handleApproveRegistration = (email: string, name: string) => {
    setRegistrationStatus(email, "approved");
    refresh();
    window.dispatchEvent(new CustomEvent("students-updated"));
    addNotification({
      text: `Akun kamu telah disetujui! Silakan masuk dan unggah kartu pelajar agar semua fitur terbuka. Selamat datang, ${name}!`,
      type: "registration",
      targetRole: "student",
      targetEmail: email,
    });
    window.dispatchEvent(new CustomEvent("notifications-updated"));
    toast(`Akun ${email} disetujui — siswa dapat masuk`);
  };

  const handleRejectRegistration = (email: string) => {
    setRegistrationStatus(email, "rejected");
    refresh();
    window.dispatchEvent(new CustomEvent("students-updated"));
    addNotification({
      text: "Pendaftaran akun kamu ditolak oleh admin. Hubungi sekolah untuk informasi lebih lanjut.",
      type: "registration",
      targetRole: "student",
      targetEmail: email,
    });
    window.dispatchEvent(new CustomEvent("notifications-updated"));
    toast("Akun siswa ditolak", "warning");
  };

  return (
    <div>
      <DashboardHeader
        title="Data Siswa"
        subtitle="Kelola data siswa dan atur tingkatan kelas"
        role="admin"
      />

      {/* Persetujuan Akun Siswa */}
      {approvals.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Persetujuan Akun Siswa ({approvals.length})
          </h2>
          <div className="space-y-3">
            {approvals.map((a) => (
              <Card key={a.email}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">{a.name}</p>
                    <p className="text-xs text-muted break-all">{a.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{a.major || "-"}</Badge>
                      <Badge variant="secondary">Kelas {normalizeGrade(a.grade || "XI")}</Badge>
                      <Badge variant={a.status === "pending" ? "warning" : "danger"}>
                        {a.status === "pending" ? "Menunggu Persetujuan" : "Ditolak"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => handleApproveRegistration(a.email, a.name)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      <Check className="w-4 h-4" /> Setujui
                    </button>
                    {a.status !== "rejected" && (
                      <button
                        onClick={() => handleRejectRegistration(a.email)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <X className="w-4 h-4" /> Tolak
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Cari nama, jurusan, atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
          />
        </div>
        <div className="relative">
          <select
            value={majorFilter}
            onChange={(e) => { setMajorFilter(e.target.value); setMajorOpen(false); }}
            onClick={() => { clearTimeout(majorTimer.current); setMajorOpen((v) => !v); }}
            onBlur={() => { majorTimer.current = setTimeout(() => setMajorOpen(false), 200); }}
            className="w-full appearance-none px-4 py-2 pr-9 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
          >
            <option value="all">Semua Jurusan</option>
            {majors.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {majorOpen ? (
            <ChevronUp className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          )}
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setStatusOpen(false); }}
            onClick={() => { clearTimeout(statusTimer.current); setStatusOpen((v) => !v); }}
            onBlur={() => { statusTimer.current = setTimeout(() => setStatusOpen(false), 200); }}
            className="w-full appearance-none px-4 py-2 pr-9 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
          >
            <option value="all">Semua Status</option>
            <option value="seed">Terdaftar</option>
            <option value="registered">Registrasi Baru</option>
          </select>
          {statusOpen ? (
            <ChevronUp className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Tidak ada siswa ditemukan</p>
          <p className="text-sm text-muted mt-1">Coba ubah filter atau kata kunci pencarian</p>
        </Card>
      ) : (
        <>
        {/* Table — Desktop */}
        <Card className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-medium text-muted">No</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Nama</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Email</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Jurusan</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Kelas</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Status</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Kartu</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, index) => (
                  <tr key={student.email} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-3 text-muted">{index + 1}</td>
                    <td className="py-3 px-3 font-medium text-foreground">{student.name}</td>
                    <td className="py-3 px-3 text-muted break-all">{student.email}</td>
                    <td className="py-3 px-3 text-muted">{student.major}</td>
                    <td className="py-3 px-3">
                      <select
                        value={student.grade}
                        onChange={(e) => handleGradeChange(student.email, e.target.value)}
                        className={`px-2.5 py-1.5 rounded-lg text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-bg text-foreground ${
                          student.grade === "XII"
                            ? "border-emerald-300 dark:border-emerald-700"
                            : "border-border"
                        }`}
                      >
                        {GRADE_CHOICES.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={student.source === "registered" ? "primary" : "secondary"}>
                        {student.source === "registered" ? "Registrasi Baru" : "Terdaftar"}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      {student.source === "registered" ? (
                        getStudentCardStatus(student.email) === "approved" ? (
                          <Badge variant="success">Aktif</Badge>
                        ) : getStudentCardStatus(student.email) === "pending" ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => setPreview({ name: student.name, img: getStudentCardDataUrl(student.email) as string })}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" /> Lihat
                            </button>
                            <Badge variant="warning">Menunggu</Badge>
                            <button
                              onClick={() => handleApprove(student.email)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                            >
                              <Check className="w-3 h-3" /> Setujui
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted">Terkunci</span>
                        )
                      ) : (
                        <Badge variant="success">Aktif</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-4">Menampilkan {filtered.length} dari {approvedRows.length} siswa</p>
        </Card>

        {/* Cards — Mobile */}
        <div className="md:hidden space-y-3">
          {filtered.map((student) => (
            <Card key={student.email}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-xs text-muted break-all">{student.email}</p>
                </div>
                <Badge variant={student.source === "registered" ? "primary" : "secondary"}>
                  {student.source === "registered" ? "Baru" : "Terdaftar"}
                </Badge>
              </div>
              <p className="text-xs text-muted mb-2">{student.major}</p>
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted">Kelas</label>
                <select
                  value={student.grade}
                  onChange={(e) => handleGradeChange(student.email, e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg text-sm font-medium border border-border bg-input-bg text-foreground"
                >
                  {GRADE_CHOICES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {student.source === "registered" ? (
                  getStudentCardStatus(student.email) === "approved" ? (
                    <Badge variant="success">Kartu Aktif</Badge>
                  ) : getStudentCardStatus(student.email) === "pending" ? (
                    <>
                      <Badge variant="warning">Menunggu Verifikasi</Badge>
                      <button
                        onClick={() => setPreview({ name: student.name, img: getStudentCardDataUrl(student.email) as string })}
                        className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                      >
                        Lihat
                      </button>
                      <button
                        onClick={() => handleApprove(student.email)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      >
                        <Check className="w-3 h-3" /> Setujui
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-muted">Kartu belum diunggah — fitur terkunci</span>
                  )
                ) : (
                  <Badge variant="success">Kartu Aktif</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
        <p className="md:hidden text-xs text-muted mt-2">Menampilkan {filtered.length} dari {approvedRows.length} siswa</p>
        </>
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