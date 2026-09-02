"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Users,
  Target,
  Briefcase,
  TrendingUp,
  Search,
  ArrowRight,
  Edit3,
  X,
  CheckCircle2,
  MapPin,
  Globe,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import { SkeletonDashboard } from "../components/ui/skeleton";
import DashboardHeader from "../components/layout/dashboardheader";
import { getMatchBg, getInitials } from "../lib/utils";
import { useAuth } from "../lib/auth-context";
import { api, BACKEND_ENDPOINTS } from "../lib/api";
import { useCountUp } from "../lib/use-count-up";
import { useToast } from "../lib/toast-context";

const PROFILE_KEY = "industryProfile";

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
  "Telekomunikasi",
  "Design & Kreatif",
  "Manufacturing",
  "Financial Services",
  "E-Commerce",
  "Media & Entertainment",
  "Konsultan",
];

const employeeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

function getAllStudentsWithMatch(jobSkills: string[]) {
  return [];
}



export default function IndustryDashboard() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<IndustryProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editForm, setEditForm] = useState<IndustryProfile>({
    company: "",
    industry: "",
    location: "",
    website: "",
    description: "",
    founded: "",
    employeeCount: "",
  });
  const [industryJobs, setIndustryJobs] = useState<{ id: string; title: string; skills: string[] }[]>([]);
  const [candidates, setCandidates] = useState<{ name: string; major: string; score: number; matchedSkills: string[]; matchFor: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [profileRes, jobsRes, candidatesRes] = await Promise.all([
          api.get<{ success: boolean; data: IndustryProfile }>(BACKEND_ENDPOINTS.industries.me).catch(() => null),
          api.get<{ success: boolean; data: { id: string; title: string; skills: string[] }[] }>(BACKEND_ENDPOINTS.jobs.mine).catch(() => ({ success: false, data: [] })),
          api.get<{ success: boolean; data: { name: string; major: string; score: number; matchedSkills: string[]; matchFor: string }[] }>(BACKEND_ENDPOINTS.industries.candidates).catch(() => ({ success: false, data: [] })),
        ]);

        if (profileRes?.success) {
          setProfile(profileRes.data);
          setEditForm(profileRes.data);
        } else {
          const defaultProfile: IndustryProfile = {
            company: user.industry?.company_name || user.name,
            industry: "Teknologi Informasi",
            location: "Jakarta, Indonesia",
            website: "",
            description: "",
            founded: "",
            employeeCount: "11-50",
          };
          setProfile(defaultProfile);
          setEditForm(defaultProfile);
        }

        if (jobsRes?.success) {
          setIndustryJobs(jobsRes.data);
        }

        if (candidatesRes?.success && Array.isArray(candidatesRes.data)) {
          setCandidates(candidatesRes.data);
        } else {
          setCandidates([]);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };
    fetchData();
  }, [user]);

  const allJobSkills = [...new Set(industryJobs.flatMap((j) => j.skills))];
  const candidateList = Array.isArray(candidates) ? candidates : [];
  const totalCandidates = candidateList.length;
  const matchedCandidates = candidateList.filter((s) => s.score > 0).length;
  const avgMatch = matchedCandidates > 0
    ? Math.round(candidateList.filter((s) => s.score > 0).reduce((sum, s) => sum + s.score, 0) / matchedCandidates)
    : 0;
  const jobsCount = industryJobs.length;

  const animTotal = useCountUp(totalCandidates);
  const animMatched = useCountUp(matchedCandidates);
  const animJobs = useCountUp(jobsCount);
  const animAvgMatch = useCountUp(avgMatch);

  const openEditProfile = () => {
    if (profile) setEditForm({ ...profile });
    setShowProfileModal(true);
  };

  const handleSaveProfile = async () => {
    if (!editForm.company.trim()) {
      toast("Nama perusahaan harus diisi", "error");
      return;
    }
    try {
      await api.put(BACKEND_ENDPOINTS.industries.profile, editForm);
      setProfile(editForm);
      setShowProfileModal(false);
      toast("Profil perusahaan berhasil diperbarui", "success");
    } catch {
      toast("Gagal menyimpan profil", "error");
    }
  };

  if (loading || !user) return <div className="p-6"><SkeletonDashboard /></div>;
  return (
    <div>
      <DashboardHeader
        title={`Selamat datang, ${user.name}!`}
        subtitle="Temukan kandidat terbaik berdasarkan kebutuhan skill"
        role="industry"
        showNotifications
      />

      {/* Company Profile Card */}
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg font-bold text-foreground truncate">{profile?.company || "Perusahaan"}</h2>
              <Badge variant="primary">{profile?.industry || "-"}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              {profile?.location && (
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{profile.location}</span>
              )}
              {profile?.website && (
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{profile.website}</span>
              )}
              {profile?.employeeCount && (
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{profile.employeeCount} karyawan</span>
              )}
              {profile?.founded && (
                <span>Didirikan {profile.founded}</span>
              )}
            </div>
            {profile?.description && (
              <p className="text-sm text-muted mt-2 line-clamp-2">{profile.description}</p>
            )}
          </div>
          <button
            onClick={openEditProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profil
          </button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-in">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Kandidat</p>
              <p className="text-2xl font-bold text-foreground">{animTotal}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Kandidat Cocok</p>
              <p className="text-2xl font-bold text-foreground">{animMatched}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Lowongan Aktif</p>
              <p className="text-2xl font-bold text-foreground">{animJobs}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Avg Match</p>
              <p className="text-2xl font-bold text-foreground">{animAvgMatch}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Candidates */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Kandidat Terbaru</h3>
          <Link href="/industry/candidates" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {candidates
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((candidate, index) => (
            <div key={candidate.name} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">{getInitials(candidate.name)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{candidate.name}</p>
                    <p className="text-xs text-muted truncate">{candidate.major}</p>
                  </div>
                </div>
                <span className={`text-lg font-bold ${getMatchBg(candidate.score)} px-3 py-1 rounded-full flex-shrink-0`}>
                  {candidate.score}%
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 pl-13">
                <div className="min-w-0">
                  <p className="text-[10px] text-muted">Skill Cocok</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.matchedSkills.slice(0, 3).map((sk) => (
                      <Badge key={sk} variant="primary" className="text-[10px]">{sk}</Badge>
                    ))}
                    {candidate.matchedSkills.length === 0 && (
                      <Badge variant="default" className="text-[10px]">Tidak ada</Badge>
                    )}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted">Cocok untuk</p>
                  <p className="text-xs font-medium text-foreground truncate">{candidate.matchFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/industry/candidates">
          <Card hover>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Cari Kandidat</h4>
                <p className="text-sm text-muted">Temukan kandidat berdasarkan skill spesifik</p>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/industry/post-job">
          <Card hover>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Post Lowongan</h4>
                <p className="text-sm text-muted">Buat lowongan baru untuk menarik kandidat</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Edit Profile Modal */}
      {showProfileModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-sm" onClick={() => setShowProfileModal(false)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-bold text-foreground text-lg">Edit Profil Perusahaan</h3>
              <button onClick={() => setShowProfileModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nama Perusahaan *</label>
                <input type="text" value={editForm.company} onChange={(e) => setEditForm((p) => ({ ...p, company: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Bidang Industri</label>
                  <select value={editForm.industry} onChange={(e) => setEditForm((p) => ({ ...p, industry: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 dark:text-gray-200">
                    {industryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Lokasi</label>
                  <input type="text" value={editForm.location} onChange={(e) => setEditForm((p) => ({ ...p, location: e.target.value }))} placeholder="Kota, Negara"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Website</label>
                  <input type="text" value={editForm.website} onChange={(e) => setEditForm((p) => ({ ...p, website: e.target.value }))} placeholder="www.perusahaan.com"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Jumlah Karyawan</label>
                  <select value={editForm.employeeCount} onChange={(e) => setEditForm((p) => ({ ...p, employeeCount: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 dark:text-gray-200">
                    {employeeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Tahun Berdiri</label>
                <input type="text" value={editForm.founded} onChange={(e) => setEditForm((p) => ({ ...p, founded: e.target.value }))} placeholder="Contoh: 2015"
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Deskripsi Perusahaan</label>
                <textarea rows={3} value={editForm.description} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} placeholder="Ceritakan tentang perusahaan Anda..."
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border">
              <button onClick={() => setShowProfileModal(false)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Batal
              </button>
              <button onClick={handleSaveProfile}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Simpan Profil
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
