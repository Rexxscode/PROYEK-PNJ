"use client";

import {
  Users,
  Target,
  Briefcase,
  TrendingUp,
  Search,
  ArrowRight,
  Star,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import DashboardHeader from "../components/layout/dashboardheader";
import { getMatchBg, getInitials } from "../lib/utils";

const recentCandidates = [
  { name: "Budi Santoso", major: "Rekayasa Perangkat Lunak", score: 85, topSkill: "Node.js", matchFor: "Backend Developer Intern" },
  { name: "Rina Wulandari", major: "Desain Komunikasi Visual", score: 92, topSkill: "React/Next.js", matchFor: "Frontend Developer" },
  { name: "Andi Pratama", major: "Rekayasa Perangkat Lunak", score: 78, topSkill: "HTML/CSS", matchFor: "Fullstack Developer" },
  { name: "Rizky Aditya", major: "Rekayasa Perangkat Lunak", score: 71, topSkill: "JavaScript", matchFor: "Backend Developer Intern" },
  { name: "Fajar Nugroho", major: "Teknik Komputer dan Jaringan", score: 68, topSkill: "Python", matchFor: "Data Analyst Intern" },
];

const candidateColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-red-500 to-rose-500",
];

export default function IndustryDashboard() {
  return (
    <div>
      <DashboardHeader
        title="Dashboard Industri"
        subtitle="Temukan kandidat terbaik berdasarkan kebutuhan skill"
        role="industry"
      />

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Kandidat</p>
              <p className="text-2xl font-bold text-foreground">195</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Kandidat Cocok</p>
              <p className="text-2xl font-bold text-foreground">42</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Lowongan Aktif</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Avg Match</p>
              <p className="text-2xl font-bold text-foreground">78%</p>
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
            <div key={candidate.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${candidateColors[index % candidateColors.length]} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">{getInitials(candidate.name)}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{candidate.name}</p>
                  <p className="text-xs text-muted">{candidate.major}</p>
                </div>
              </div>
              <div className="text-center px-4">
                <p className="text-xs text-muted">Top Skill</p>
                <Badge variant="primary" className="text-[10px]">{candidate.topSkill}</Badge>
              </div>
              <div className="text-center px-4">
                <p className="text-xs text-muted">Cocok untuk</p>
                <p className="text-sm font-medium text-foreground">{candidate.matchFor}</p>
              </div>
              <span className={`text-lg font-bold ${getMatchBg(candidate.score)} px-3 py-1 rounded-full`}>
                {candidate.score}%
              </span>
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
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-600" />
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
