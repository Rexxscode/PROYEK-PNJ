"use client";

import { useState, useEffect } from "react";
import { UserPlus, Eye, EyeOff, Shield, Loader2 } from "lucide-react";
import Card from "../../components/ui/card";
import DashboardHeader from "../../components/layout/dashboardheader";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";
import { useToast } from "../../lib/toast-context";

type AdminRow = { id: number; email: string; name: string; role: string };

export default function AccountsPage() {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<{ success: boolean; data: AdminRow[] }>(BACKEND_ENDPOINTS.admins.list);
        if (res.success) setAdmins(res.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [refreshKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast("Semua field wajib diisi", "warning");
      return;
    }
    if (form.password.length < 8) {
      toast("Password minimal 8 karakter", "warning");
      return;
    }
    setSubmitting(true);
    try {
      await api.post(BACKEND_ENDPOINTS.admins.create, { name: form.name, email: form.email, password: form.password });
      toast("Akun admin berhasil dibuat!", "success");
      setForm({ name: "", email: "", password: "" });
      setShowForm(false);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      if (err instanceof Error) {
        toast(err.message, "warning");
      } else {
        toast("Gagal membuat akun admin", "warning");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Kelola Admin"
        subtitle="Buat dan lihat akun admin yang mengelola aplikasi"
        role="admin"
      />

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Buat Akun Admin
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <Card className="mb-6">
          <h3 className="font-semibold text-foreground mb-4">Akun Admin Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input"
                  placeholder="Masukkan nama"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input"
                  placeholder="admin@smk.id"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2 pr-10 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input"
                    placeholder="Minimal 8 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-60"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Simpan
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm({ name: "", email: "", password: "" }); }}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Admin List */}
      <Card>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-medium text-muted">No</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Nama</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Email</th>
                  <th className="text-left py-3 px-3 font-medium text-muted">Role</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, idx) => (
                  <tr key={admin.email} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-3 text-muted">{idx + 1}</td>
                    <td className="py-3 px-3 font-medium text-foreground">{admin.name}</td>
                    <td className="py-3 px-3 text-muted">{admin.email}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-muted mt-4">Total {admins.length} akun admin</p>
      </Card>
    </div>
  );
}