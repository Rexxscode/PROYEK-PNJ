"use client";

import { useState, useEffect } from "react";
import { Search, Check, X, Building2 } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getAllIndustries, approveIndustry, rejectIndustry, UserCredential } from "../../lib/mock-data";
import { useToast } from "../../lib/toast-context";

export default function IndustriesPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [industries, setIndustries] = useState<UserCredential[]>([]);

  const refresh = () => setIndustries(getAllIndustries());

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

  const filtered = industries.filter((i) => {
    const q = search.toLowerCase();
    return !q || i.name.toLowerCase().includes(q) || (i.company || "").toLowerCase().includes(q) || i.email.toLowerCase().includes(q);
  });

  const handleApprove = (email: string) => {
    approveIndustry(email);
    refresh();
    window.dispatchEvent(new CustomEvent("industries-updated"));
    toast(`Akun ${email} berhasil disetujui`, "success");
  };

  const handleReject = (email: string) => {
    rejectIndustry(email);
    refresh();
    window.dispatchEvent(new CustomEvent("industries-updated"));
    toast(`Akun ${email} ditolak`, "warning");
  };

  const pending = filtered.filter((i) => i.status === "pending");
  const approved = filtered.filter((i) => i.status === "approved" || !i.status);

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
                      onClick={() => handleApprove(ind.email)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      <Check className="w-4 h-4" /> Setujui
                    </button>
                    <button
                      onClick={() => handleReject(ind.email)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
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

      {/* Approved Industries Table */}
      {approved.length === 0 && pending.length === 0 ? (
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
