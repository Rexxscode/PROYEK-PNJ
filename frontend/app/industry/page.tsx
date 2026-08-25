"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Target,
  Briefcase,
  TrendingUp,
  Search,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import DashboardHeader from "../components/layout/dashboardheader";
import { getMatchBg, getInitials } from "../lib/utils";
import { useCountUp } from "../lib/use-count-up";
import { getStoredToken, industryAPI } from "../lib/api";
import type { IndustryCandidate } from "../lib/type";

interface IndustryStats {
  totalCandidates: number;
  matched: number;
  activeJobs: number;
  avgMatch: number;
}

const candidateColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-red-500 to-rose-500",
];

export default function IndustryDashboard() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<IndustryStats | null>(null);
  const [recentCandidates, setRecentCandidates] = useState<IndustryCandidate[]>([]);

  useEffect(() => {
    const token = getStoredToken();
    const load = token
      ? Promise.all([
          industryAPI.getStats(token),
          industryAPI.getCandidates(token).then((r) => r.candidates),
        ])
      : Promise.reject(new Error("Sesi tidak ditemukan"));

    load
      .then(([s, cands]) => {
        setStats(s);
        setRecentCandidates(cands.slice(0, 5));
        setError("");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Gagal memuat data"))
      .finally(() => setMounted(true));
  }, []);

  const animTotal = useCountUp(stats?.totalCandidates ?? 0);
  const animMatched = useCountUp(stats?.matched ?? 0);
  const animJobs = useCountUp(stats?.activeJobs ?? 0);
  const animAvgMatch = useCountUp(stats?.avgMatch ?? 0);

  if (!mounted || !stats) return null;

  if (error) {
    return (
      <div>
        <DashboardHeader
          title="Dashboard Industri"
          subtitle="Temukan kandidat terbaik berdasarkan kebutuhan skill"
          role="industry"
          showNotifications
        />
        <Card className="text-center py-12">
          <p className="text-foreground font-medium">{error || "Memuat data..."}</p>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <DashboardHeader
        title="Dashboard Industri"
        subtitle="Temukan kandidat terbaik berdasarkan kebutuhan skill"
        role="industry"
        showNotifications
      />

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-in">
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
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
          <a href="/industry/candidates" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="space-y-3">
          {recentCandidates.map((candidate, index) => (
            <div key={candidate.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${candidateColors[index % candidateColors.length]} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-bold text-white">{getInitials(candidate.name)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{candidate.name}</p>
                    <p className="text-xs text-muted truncate">{candidate.major || "-"}</p>
                  </div>
                </div>
                <span className={`text-lg font-bold ${getMatchBg(candidate.score)} px-3 py-1 rounded-full flex-shrink-0`}>
                  {candidate.score}%
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 pl-13">
                <div>
                  <p className="text-[10px] text-muted">Top Skill</p>
                  <Badge variant="primary" className="text-[10px]">{candidate.skills[0] || "-"}</Badge>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted">Cocok untuk</p>
                  <p className="text-xs font-medium text-foreground truncate">{candidate.topCareer || "-"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
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
    </div>
  );
}
