"use client";

import { useState, useEffect } from "react";
import {
  Target,
  TrendingUp,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  BadgeCheck,
  ClipboardCheck,
} from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import ProgressBar from "../../components/ui/progressbar";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useAuth } from "../../lib/auth-context";
import { useCardStatus } from "../../components/student-card-gate";
import { loadCareerMatches, generateCareerMatches, saveCareerMatches } from "../../lib/career-match";
import { getMatchBg, getReadinessTier } from "../../lib/utils";
import { getQuizResult } from "../../lib/major-roadmap";
import type { CareerMatch } from "../../lib/type";

const SkillRadar = dynamic(() => import("../../components/charts/skillradar"), { ssr: false });

export default function CareerMatchPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [hardSkills, setHardSkills] = useState<{ id: string; name: string; category: "hard"; level: number }[]>([]);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !user) return;
    const saved = loadCareerMatches();
    const qr = getQuizResult();
    const major = user.student?.major || "";
    let matches = saved && saved.length > 0 ? saved : [];
    if (qr && matches.length > 0 && matches.some((m) => !m.skillGaps || m.skillGaps.length === 0)) {
      matches = generateCareerMatches(major, qr);
      saveCareerMatches(matches);
    }
    setCareerMatches(matches);
    if (matches.length > 0 && !selectedCareer) {
      setSelectedCareer(matches[0]);
    }
    if (qr) {
      const skills: { id: string; name: string; category: "hard"; level: number }[] = Object.entries(qr.skillScores).map(([name, data]) => ({
        id: `skill-${name}`,
        name,
        category: "hard" as const,
        level: data.total > 0 ? Math.round((data.correct / data.total) * 5) : 0,
      }));
      setHardSkills(skills.slice(0, 8));
    }
  }, [mounted, user]);

  const { approved } = useCardStatus();

  if (!mounted || !user) return <div className="p-6"><SkeletonDashboard /></div>;

  if (!approved) {
    return (
      <div>
        <DashboardHeader title="Know Your Path" subtitle="Temukan kecocokan karier berdasarkan skill kamu" />
        <Card className="max-w-xl mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Career Match Terkunci</h2>
          <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
            Selesaikan Verifikasi Kartu Pelajar agar bisa melihat kecocokan karier dan skill gap analysis.
          </p>
          <Link
            href="/student/profile"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            <BadgeCheck className="w-4 h-4" />
            Ke Profil & Upload Kartu
          </Link>
        </Card>
      </div>
    );
  }

  const activeCareer = selectedCareer || careerMatches[0];
  if (!activeCareer) {
    return (
      <div>
        <DashboardHeader
          title="Know Your Path"
          subtitle="Temukan kecocokan karier berdasarkan skill kamu"
        />
        <Card className="max-w-xl mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-5">
            <ClipboardCheck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Isi Tes Know Yourself Dulu!</h2>
          <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
            Sebelum melihat rekomendasi karier dan skill gap, kamu harus mengikuti tes jurusan
            terlebih dahulu. Hasil tes akan menentukan kecocokan karier yang sesuai untukmu.
          </p>
          <Link
            href="/student/assessment"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Mulai Tes Sekarang
          </Link>
        </Card>
      </div>
    );
  }

  const readinessTier = getReadinessTier(activeCareer.readinessScore || 0);

  return (
    <div>
      <DashboardHeader
        title="Know Your Path"
        subtitle="Temukan kecocokan karier berdasarkan skill kamu"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Career List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold text-foreground mb-2">Rekomendasi Karier</h3>
          {careerMatches.map((career) => {
            const tier = getReadinessTier(career.readinessScore || 0);
            return (
              <button
                key={career.id}
                onClick={() => setSelectedCareer(career)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeCareer.id === career.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground text-sm">{career.title}</span>
                  <span className={`text-sm font-bold ${getMatchBg(career.matchPercentage)} px-2 py-0.5 rounded-full`}>
                    {career.matchPercentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted">{career.category}</p>
                  <span className={`text-[10px] font-medium ${tier.color}`}>
                    {tier.icon} Readiness {career.readinessScore || 0}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Career Header */}
          <Card className="bg-primary/5 border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="primary" className="mb-2">{activeCareer.category}</Badge>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{activeCareer.title}</h2>
                <p className="text-muted text-sm max-w-lg">{activeCareer.description}</p>
              </div>
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl ${getMatchBg(activeCareer.matchPercentage)} flex items-center justify-center`}>
                  <span className="text-2xl font-bold">{activeCareer.matchPercentage}%</span>
                </div>
                <p className="text-xs text-muted mt-1">Match</p>
              </div>
            </div>
          </Card>

          {/* Match vs Readiness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Career Match</h3>
                  <p className="text-xs text-muted">Seberapa cocok dengan profilmu</p>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-foreground">{activeCareer.matchPercentage}%</span>
                <ProgressBar
                  value={activeCareer.matchPercentage}
                  size="lg"
                  color={activeCareer.matchPercentage >= 80 ? "success" : activeCareer.matchPercentage >= 60 ? "primary" : "warning"}
                  showValue={false}
                />
              </div>
            </Card>

            <Card className={`border ${readinessTier.borderColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${readinessTier.bgColor} flex items-center justify-center`}>
                  <TrendingUp className={`w-5 h-5 ${readinessTier.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Career Readiness</h3>
                  <p className={`text-xs ${readinessTier.color}`}>{readinessTier.status}</p>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-foreground">{activeCareer.readinessScore || 0}%</span>
                <ProgressBar
                  value={activeCareer.readinessScore || 0}
                  size="lg"
                  color={(activeCareer.readinessScore || 0) >= 80 ? "success" : (activeCareer.readinessScore || 0) >= 60 ? "primary" : "warning"}
                  showValue={false}
                />
              </div>
            </Card>
          </div>

          {/* Readiness Context */}
          <Card className={`${readinessTier.bgColor} border ${readinessTier.borderColor}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{readinessTier.icon}</span>
              <div>
                <h3 className={`font-semibold ${readinessTier.color} mb-1`}>{readinessTier.label}</h3>
                <p className="text-sm text-foreground">{readinessTier.description}</p>
                {(activeCareer.skillGaps || []).length > 0 && (
                  <p className="text-sm text-muted mt-2">
                    Skill gap utama: <span className="font-medium text-foreground">{(activeCareer.skillGaps || []).map((g) => g.name).join(", ")}</span>
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Skill Gap Analysis */}
          {(activeCareer.skillGaps || []).length > 0 && (
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Skill Gap Analysis</h3>
                  <p className="text-sm text-muted">Skill yang perlu kamu tingkatkan untuk role ini</p>
                </div>
              </div>

              <div className="space-y-3">
                {(activeCareer.skillGaps || []).map((gap) => (
                  <div key={gap.name} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{gap.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted">Kamu: {gap.current}/5</span>
                        <XCircle className="w-3 h-3 text-red-400" />
                        <span className="text-xs font-medium text-foreground">Butuh: {gap.required}/5</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-red-400 transition-all"
                          style={{ width: `${(gap.current / 5) * 100}%` }}
                        />
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${(gap.required / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-red-400" /> Level Kamu
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-primary" /> Level Dibutuhkan
                </div>
              </div>
            </Card>
          )}

          {/* All Skills Status */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Skill Profile</h3>
                <p className="text-sm text-muted">Perbandingan skill kamu dengan kebutuhan role</p>
              </div>
            </div>

            <div className="space-y-2">
              {activeCareer.requiredSkills.map((skill) => {
                const hasGap = (activeCareer.skillGaps || []).some((g) => g.name === skill.name);
                return (
                  <div key={skill.name} className="flex items-center justify-between p-2 rounded-lg">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${hasGap ? "text-red-500" : "text-emerald-500"}`}>
                        Level {skill.level}/5
                      </span>
                      {hasGap ? (
                        <XCircle className="w-4 h-4 text-red-400" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Skill Radar */}
          <Card>
            <SkillRadar
              skills={hardSkills}
              title="Profil Skill Kamu"
            />
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/student/roadmap"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Lihat Rekomendasi Belajar
            </Link>
            {user.student?.grade === "XII" && (
              <Link
                href="/student/jobs"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Lihat Lowongan
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
