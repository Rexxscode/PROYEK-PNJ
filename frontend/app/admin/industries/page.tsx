"use client";

import { useState, useEffect } from "react";
import { Search, Check, X, Building2, Loader2 } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";
import { useToast } from "../../lib/toast-context";
import { addNotification } from "../../lib/notifications";

type IndustryRow = { id: number; email: string; name: string; company: string | null; status: string };
type IndustryAction = "approve" | "reject";

export default function IndustriesPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [industries, setIndustries] = useState<IndustryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyEmail, setBusyEmail] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await api.get<{ success: boolean; data: IndustryRow[] }>(BACKEND_ENDPOINTS.industries.list);
      if (res.success) setIndustries(res.data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("industries-updated", handler);
    return () => window.removeEventListener("industries-updated", handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => setSearch((e as CustomEvent).detail || "");
    window.addEventListener("global-search", handler);
    return () => window.removeEventListener("global-search", handler);
  }, []);

  const handleApproval = async (email: string, action: IndustryAction) => {
    setBusyEmail(email);
    try {
      await api.post(BACKEND_ENDPOINTS.industries.approval(email), { action });
      await refresh();
      window.dispatchEvent(new CustomEvent("industries-updated"));
      if (action === "approve") {
        addNotification({
          text: "Akun perusahaan kamu telah disetujui! Kamu kini bisa membuka profil, memposting lowongan, dan melihat kandidat.",
          type: "registration",
          targetRole: "industry",
          targetEmail: email,
        });
        toast(`Akun ${email} berhasil disetujui`, "success");
      } else {
        addNotification({
          text: "Pendaftaran akun perusahaan kamu ditolak oleh admin.",
          type: "registration",
          targetRole: "industry",
          targetEmail: email,
        });
        toast(`Akun ${email} ditolak`, "warning");
      }
      window.dispatchEvent(new CustomEvent("notifications-updated"));
    } catch (err) {
      if (err instanceof Error) toast(err.message, "warning");
    } finally {
      setBusyEmail(null);
    }
  };

  const filtered = industries.filter((i) => {
    const q = search.toLowerCase();
    return !q || i.name.toLowerCase().includes(q) || (i.company || "").toLowerCase().includes(q) || i.email.toLowerCase().includes(q);
  });

  const pending = filtered.filter((i) => i.status === "pending");
  const approved = filtered.filter((i) => i.status === "approved");

  return (
    <div>
      <DashboardHeader
        title="Data Industry"
        subtitle="Kelola akun perusahaan yang terdaftar di platform"
        role="admin"
      />

      {/* Pending Approval Section */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Menunggu Persetujuan ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((ind) => (
              <Card key={ind.email}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{ind.company || ind.name}</p>
                      <p className="text-xs text-muted break-all">{ind.name} &middot; {ind.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => handleApproval(ind.email, "approve")}
                      disabled={busyEmail === ind.email}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors disabled:opacity-60"
                    >
                      {busyEmail === ind.email ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Setujui
                    </button>
                    <button
                      onClick={() => handleApproval(ind.email, "reject")}
                      disabled={busyEmail === ind.email}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-60"
                    >
                      <X className="w-4 h-4" /> Tolak
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Cari nama, perusahaan, atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : approved.length === 0 && pending.length === 0 ? (
        <Card className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Tidak ada industry ditemukan</p>
          <p className="text-sm text-muted mt-1">Coba ubah kata kunci pencarian</p>
        </Card>
      ) : approved.length > 0 ? (
        <>
          <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3">Disetujui ({approved.length})</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-medium text-muted">No</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Perusahaan</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">PIC</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Email</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.map((ind, idx) => (
                    <tr key={ind.email} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-3 text-muted">{idx + 1}</td>
                      <td className="py-3 px-3 font-medium text-foreground">{ind.company || "-"}</td>
                      <td className="py-3 px-3 text-muted">{ind.name}</td>
                      <td className="py-3 px-3 text-muted break-all">{ind.email}</td>
                      <td className="py-3 px-3">
                        <Badge variant="success">Disetujui</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted mt-4">Menampilkan {approved.length} dari {industries.length} akun industry</p>
          </Card>
        </>
      ) : null}
    </div>
  );
}