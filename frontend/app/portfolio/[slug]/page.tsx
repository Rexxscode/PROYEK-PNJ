"use client";

import { use } from "react";
import Link from "next/link";
import { getStudentBySlug } from "../../lib/mock-data";
import { getInitials } from "../../lib/utils";
import { Briefcase, ArrowLeft } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import SkillRadar from "../../components/charts/skillradar";

export default function PublicPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const student = getStudentBySlug(slug);

  if (!student) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="text-center py-12 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">?</span>
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Portfolio Tidak Ditemukan</h1>
          <p className="text-sm text-muted mb-6">Portfolio dengan URL ini tidak tersedia atau sudah tidak aktif.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </Card>
      </div>
    );
  }

  const { profile, hardSkills, softSkills, projects, careerMatches } = student;
  const allSkills = [...hardSkills, ...softSkills];
  const avgScore = Math.round(careerMatches.reduce((sum, c) => sum + c.matchPercentage, 0) / careerMatches.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-3xl mx-auto px-4 py-10 text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-2 border-white/40">
            <span className="text-2xl font-bold text-white">{getInitials(profile.name)}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{profile.name}</h1>
          <p className="text-white/80 text-sm">{profile.major} — Kelas {profile.grade}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full">
            <span className="text-sm text-white/90">Readiness Score</span>
            <span className="text-lg font-bold text-white">{avgScore}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Skills Radar */}
        <Card>
          <h2 className="font-semibold text-foreground mb-4">Profil Skill</h2>
          <div className="max-w-sm mx-auto">
            <SkillRadar skills={allSkills} />
          </div>
        </Card>

        {/* Skills List */}
        <Card>
          <h2 className="font-semibold text-foreground mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((sk) => (
              <Badge key={sk.id} variant="default">
                {sk.name} ({sk.level}%)
              </Badge>
            ))}
          </div>
        </Card>

        {/* Projects */}
        <Card>
          <h2 className="font-semibold text-foreground mb-3">Proyek</h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-border">
                <p className="font-medium text-foreground text-sm">{p.title}</p>
                <p className="text-xs text-muted mt-1">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.skills.map((sk) => (
                    <span key={sk} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-medium">{sk}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Career Matches */}
        <Card>
          <h2 className="font-semibold text-foreground mb-3">Top Career Matches</h2>
          <div className="space-y-2">
            {careerMatches.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-border">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{c.title}</p>
                    <p className="text-xs text-muted truncate">{c.category}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary flex-shrink-0 ml-2">{c.matchPercentage}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-xs text-muted">Portfolio by SkillMatch — Career Readiness Platform</p>
        </div>
      </div>
    </div>
  );
}
