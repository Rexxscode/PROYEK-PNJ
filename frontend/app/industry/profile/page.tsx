"use client";

import { useState, useEffect } from "react";
import { Building2, Mail, User, MapPin, Globe, Briefcase, Calendar, Users, CheckCircle2, Save } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useAuth } from "../../lib/auth-context";
import { useToast } from "../../lib/toast-context";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";

interface IndustryProfile {
  company: string;
  industry: string;
  location: string;
  website: string;
  description: string;
  founded: string;
  employeeCount: string;
}

const industryOptions = [
  "Teknologi Informasi",
  "Manufaktur",
  "Perbankan",
  "E-Commerce",
  "Media & Entertainment",
  "Konsultan",
];

const employeeOptions = ["1-10", "11-50", "51-200", "201-500", "500+"];

export default function IndustryProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<IndustryProfile>({
    company: "",
    industry: "",
    location: "",
    website: "",
    description: "",
    founded: "",
    employeeCount: "",
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !user) return;
    const fetchProfile = async () => {
      try {
        const res = await api.get<{ success: boolean; data: IndustryProfile }>(BACKEND_ENDPOINTS.industries.me);
        if (res?.success && res.data) {
          setForm(res.data);
        } else {
          setForm({
            company: user.industry?.company_name || user.name,
            industry: "Teknologi Informasi",
            location: "Jakarta, Indonesia",
            website: "",
            description: "",
            founded: "",
            employeeCount: "11-50",
          });
        }
      } catch {
        setForm({
          company: user.industry?.company_name || user.name,
          industry: "Teknologi Informasi",
          location: "Jakarta, Indonesia",
          website: "",
          description: "",
          founded: "",
          employeeCount: "11-50",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [mounted, user]);

  const handleSave = async () => {
    if (!form.company.trim()) {
      toast("Nama perusahaan harus diisi", "error");
      return;
    }
    setSaving(true);
    try {
      await api.put(BACKEND_ENDPOINTS.industries.profile, form);
      toast("Profil perusahaan berhasil diperbarui", "success");
    } catch {
      toast("Gagal menyimpan profil", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!mounted || !user || loading) return <div className="p-6"><SkeletonDashboard /></div>;

  const email = user.email;
  const companyName = form.company || user.industry?.company_name || user.name;

  const inputClass =
    "w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground";

  return (
    <div>
      <DashboardHeader
        title="Profil Perusahaan"
        subtitle="Kelola informasi perusahaan dan akun"
        role="industry"
        showNotifications
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Info */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{companyName}</h3>
              <p className="text-xs text-muted">{email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="primary">{form.industry || "-"}</Badge>
                <Badge variant="secondary">{form.employeeCount || "-"}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <Mail className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-muted break-all">{email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <MapPin className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-foreground">{form.location || "-"}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <Globe className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-foreground">{form.website || "-"}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <Calendar className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-foreground">{form.founded || "-"}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <Users className="w-4 h-4 text-muted flex-shrink-0" />
              <span className="text-foreground">{form.employeeCount || "-"} karyawan</span>
            </div>
            {form.description && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="text-muted">{form.description}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Edit Form */}
        <Card>
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Informasi Perusahaan
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Nama Perusahaan *</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="PT Contoh Indonesia"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1.5">Bidang Industri</label>
                <select
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className={inputClass}
                >
                  {industryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1.5">Jumlah Karyawan</label>
                <select
                  value={form.employeeCount}
                  onChange={(e) => setForm({ ...form, employeeCount: e.target.value })}
                  className={inputClass}
                >
                  {employeeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Lokasi</label>
              <input
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Jakarta, Indonesia"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Website</label>
              <input
                value={form.website || ""}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://www.contoh.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Tahun Berdiri</label>
              <input
                value={form.founded || ""}
                onChange={(e) => setForm({ ...form, founded: e.target.value })}
                placeholder="2015"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1.5">Deskripsi Perusahaan</label>
              <textarea
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="Ceritakan tentang perusahaan Anda..."
                className={inputClass + " resize-none"}
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {saving ? <Save className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}