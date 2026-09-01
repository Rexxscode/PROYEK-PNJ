"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import Card from "../../components/ui/card";
import dynamic from "next/dynamic";
import DashboardHeader from "../../components/layout/dashboardheader";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";

const SkillBarChart = dynamic(() => import("../../components/charts/barchart"), { ssr: false });
const LineChart = dynamic(() => import("../../components/charts/linechart"), { ssr: false });

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

type DashboardStats = {
  totalStudents: number;
  assessedStudents: number;
  assessedPercentage: number;
  avgReadinessScore: number;
  totalIndustries: number;
  pendingIndustries: number;
  pendingCards: number;
  topCareers: { name: string; count: number }[];
  readinessByMajor: { major: string; score: number }[];
  monthlyRegistrations: { month: string; count: number }[];
};

type ReadinessBucket = { label: string; key: string; count: number };

function shortMonth(ym: string): string {
  const m = parseInt(ym.split("-")[1], 10);
  return MONTH_NAMES[m - 1] || ym;
}

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [distribution, setDistribution] = useState<ReadinessBucket[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, distRes] = await Promise.all([
          api.get<{ success: boolean; data: DashboardStats }>(BACKEND_ENDPOINTS.statistics.dashboard),
          api.get<{ success: boolean; data: ReadinessBucket[] }>(BACKEND_ENDPOINTS.statistics.readiness),
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (distRes.success) setDistribution(distRes.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!mounted || loading) return <div className="min-h-[300px]" />;

  const s = stats || {
    totalStudents: 0,
    assessedStudents: 0,
    assessedPercentage: 0,
    avgReadinessScore: 0,
    totalIndustries: 0,
    pendingIndustries: 0,
    pendingCards: 0,
    topCareers: [],
    readinessByMajor: [],
    monthlyRegistrations: [],
  };

  const monthlyLabels = s.monthlyRegistrations.map((d) => shortMonth(d.month)) || ({ length: 0 } as never);
  const monthlyCounts = s.monthlyRegistrations.map((d) => d.count);
  const distLabels = distribution.map((b) => b.label);
  const distData = distribution.map((b) => b.count);

  return (
    <div>
      <DashboardHeader
        title="Statistik"
        subtitle="Analisis data kesiapan kerja siswa"
        role="admin"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Siswa</p>
              <p className="text-2xl font-bold text-foreground">{s.totalStudents}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Avg Readiness</p>
              <p className="text-2xl font-bold text-foreground">{s.avgReadinessScore}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Jurusan</p>
              <p className="text-2xl font-bold text-foreground">{s.readinessByMajor.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Karier Populer</p>
              <p className="text-2xl font-bold text-foreground">{s.topCareers.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <LineChart
            labels={monthlyLabels}
            datasets={[{ label: "Pendaftar", data: monthlyCounts, fill: true }]}
            title="Pendaftar per Bulan"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={s.topCareers.map((c) => c.name)}
            data={s.topCareers.map((c) => c.count)}
            title="Top Karier Pilihan Siswa"
            color="rgba(124, 58, 237, 0.8)"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <SkillBarChart
            labels={s.readinessByMajor.map((m) => m.major)}
            data={s.readinessByMajor.map((m) => m.score)}
            title="Readiness Score per Jurusan"
            color="rgba(16, 185, 129, 0.8)"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={distLabels}
            data={distData}
            title="Distribusi Readiness Siswa"
            color="rgba(245, 158, 11, 0.8)"
          />
        </Card>
        <Card>
          <SkillBarChart
            labels={s.readinessByMajor.map((m) => m.major)}
            data={s.readinessByMajor.map((m) => m.score)}
            title="Readiness per Jurusan"
            color="rgba(37, 99, 235, 0.8)"
          />
        </Card>
      </div>
    </div>
  );
}