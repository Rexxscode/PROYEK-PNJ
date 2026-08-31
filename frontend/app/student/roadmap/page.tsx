"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  ExternalLink,
  BarChart3,
  ClipboardCheck,
  BookOpen,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useAuth } from "../../lib/auth-context";
import { cn } from "../../lib/utils";
import { type QuizResult } from "../../lib/major-quiz";
import {
  getRoadmapForScore,
  getQuizResult,
  getScoreLevel,
  type RoadmapMilestone,
} from "../../lib/major-roadmap";
import { loadCareerMatches, generateCareerMatches, saveCareerMatches } from "../../lib/career-match";
import type { CareerMatch } from "../../lib/type";

const levelConfig: Record<string, { label: string; color: string }> = {
  fundamental: { label: "Fundamental", color: "bg-emerald-500" },
  intermediate: { label: "Intermediate", color: "bg-amber-500" },
  advanced: { label: "Advanced", color: "bg-red-500" },
};

const resourceTypeLabel: Record<string, { label: string; color: string }> = {
  article: { label: "Artikel", color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" },
  video: { label: "Video", color: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400" },
  course: { label: "Kursus", color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400" },
  practice: { label: "Praktik", color: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" },
};

export default function RoadmapPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !user) return;

    const qr = getQuizResult();
    setQuizResult(qr);

    const major = user.student?.major || "";
    const roadmap = getRoadmapForScore(major, qr?.score || 0);
    setMilestones(roadmap);

    const matches = loadCareerMatches() || [];
    if (qr && matches.length > 0 && matches.some((m) => !m.skillGaps || m.skillGaps.length === 0)) {
      const fresh = generateCareerMatches(major, qr);
      saveCareerMatches(fresh);
      setCareerMatches(fresh);
      if (fresh.length > 0) setSelectedCareer(fresh[0]);
    } else {
      setCareerMatches(matches);
      if (matches.length > 0) setSelectedCareer(matches[0]);
    }
  }, [mounted, user]);

  if (!mounted || !user) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;

  const gapSkillNames = (selectedCareer?.skillGaps || []).map((g) => g.name.toLowerCase());
  const unlockedMilestones = gapSkillNames.length > 0
    ? milestones.filter((m) => m.skills.some((s) => gapSkillNames.includes(s.toLowerCase())))
    : milestones.filter((m) => m.status !== "locked");

  return (
    <div>
      <DashboardHeader
        title="Learning Recommendation"
        subtitle="Rekomendasi belajar berdasarkan skill gap kamu"
      />

      {/* No Quiz Taken */}
      {!quizResult && (
        <Card className="mb-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <div className="flex flex-col items-center text-center py-8 px-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4">
              <ClipboardCheck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Isi Tes Know Yourself Dulu!</h3>
            <p className="text-sm text-muted max-w-md mb-6">
              Sebelum melihat rekomendasi belajar, kamu harus mengikuti tes jurusan terlebih dahulu.
              Hasil tes akan menentukan skill gap dan rekomendasi yang sesuai.
            </p>
            <Link
              href="/student/assessment"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              <ClipboardCheck className="w-4 h-4" />
              Mulai Tes Sekarang
            </Link>
          </div>
        </Card>
      )}

      {/* Quiz Result Summary */}
      {quizResult && (
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Hasil Tes Jurusan</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-card rounded-xl border border-border">
              <p className="text-2xl font-bold text-primary">{quizResult.score}%</p>
              <p className="text-xs text-muted mt-1">Skor</p>
            </div>
            <div className="text-center p-3 bg-card rounded-xl border border-border">
              <p className="text-2xl font-bold text-foreground">{getScoreLevel(quizResult.score).label}</p>
              <p className="text-xs text-muted mt-1">Tingkatan {getScoreLevel(quizResult.score).level}/5</p>
            </div>
            <div className="text-center p-3 bg-card rounded-xl border border-border">
              <p className="text-lg font-bold text-emerald-500">
                {getScoreLevel(quizResult.score).trackLabel}
              </p>
              <p className="text-xs text-muted mt-1">Jalur Belajar</p>
            </div>
          </div>
        </Card>
      )}

      {quizResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Career + Skill Gap */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Skill Gap per Karier</h3>
            {careerMatches.map((career) => {
              const tier = getReadinessTier(career.readinessScore || 0);
              return (
                <button
                  key={career.id}
                  onClick={() => setSelectedCareer(career)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border transition-all",
                    selectedCareer?.id === career.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground text-sm">{career.title}</span>
                    <span className={`text-xs font-bold ${getMatchBg(career.matchPercentage)} px-2 py-0.5 rounded-full`}>
                      {career.matchPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{career.category}</span>
                    <span className={`text-[10px] font-medium ${tier.color}`}>
                      {tier.icon} {career.readinessScore || 0}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detail */}
          <div className="lg:col-span-2 space-y-6">
            {selectedCareer && (
              <>
                {/* Career Header */}
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="primary" className="mb-2">{selectedCareer.category}</Badge>
                      <h2 className="text-xl font-bold text-foreground">{selectedCareer.title}</h2>
                      <p className="text-sm text-muted mt-1">{selectedCareer.description}</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-2xl ${getMatchBg(selectedCareer.matchPercentage)} flex items-center justify-center`}>
                        <span className="text-xl font-bold">{selectedCareer.matchPercentage}%</span>
                      </div>
                      <p className="text-xs text-muted mt-1">Match</p>
                    </div>
                  </div>

                  {/* Match vs Readiness */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                      <p className="text-xs text-muted mb-1">Career Match</p>
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{selectedCareer.matchPercentage}%</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                      <p className="text-xs text-muted mb-1">Readiness</p>
                      <p className={cn("text-lg font-bold", getReadinessTier(selectedCareer.readinessScore || 0).color)}>
                        {selectedCareer.readinessScore || 0}%
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Skill Gap */}
                {(selectedCareer.skillGaps || []).length > 0 && (
                  <Card>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Prioritas Belajar</h3>
                        <p className="text-sm text-muted">Skill yang perlu kamu tingkatkan</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {(selectedCareer.skillGaps || []).map((gap, i) => (
                        <div key={gap.name} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                              <span className="text-sm font-medium text-foreground">{gap.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted">Kamu: {gap.current}/5</span>
                              <XCircle className="w-3 h-3 text-red-400" />
                              <span className="text-xs font-medium text-foreground">Butuh: {gap.required}/5</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                              <div className="h-full rounded-full bg-red-400" style={{ width: `${(gap.current / 5) * 100}%` }} />
                            </div>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${(gap.required / 5) * 100}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {(selectedCareer.skillGaps || []).length === 0 && (
                  <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        Semua skill kamu sudah memenuhi standar untuk role ini!
                      </p>
                    </div>
                  </Card>
                )}

                {/* Learning Milestones */}
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Rekomendasi Materi Belajar</h3>
                      <p className="text-sm text-muted">
                        {selectedCareer ? `Berdasarkan skill gap untuk ${selectedCareer.title}` : "Sumber belajar untuk meningkatkan skill kamu"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {unlockedMilestones.length === 0 && (
                      <p className="text-sm text-muted text-center py-4">
                        Tidak ada materi belajar yang cocok untuk skill gap karir ini.
                      </p>
                    )}
                    {unlockedMilestones.map((milestone) => (
                      <div key={milestone.id} className="border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedId(expandedId === milestone.id ? null : milestone.id)}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", levelConfig[milestone.level].color)}>
                              {milestone.status === "completed" ? (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              ) : (
                                <BookOpen className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">{milestone.title}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium text-white", levelConfig[milestone.level].color)}>
                                  {levelConfig[milestone.level].label}
                                </span>
                                <span className="text-xs text-muted">~{milestone.estimatedHours} jam</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {milestone.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="primary" className="text-[10px]">{skill}</Badge>
                            ))}
                          </div>
                        </button>

                        {expandedId === milestone.id && (
                          <div className="px-3 pb-3 border-t border-border">
                            <p className="text-sm text-muted mt-3 mb-3">{milestone.description}</p>
                            <div className="space-y-2">
                              {milestone.resources.map((resource) => {
                                const typeInfo = resourceTypeLabel[resource.type] || resourceTypeLabel.article;
                                return (
                                  <a
                                    key={resource.title}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", typeInfo.color)}>
                                      {typeInfo.label}
                                    </span>
                                    <span className="text-sm text-foreground flex-1">{resource.title}</span>
                                    <ExternalLink className="w-3 h-3 text-muted flex-shrink-0" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Re-Assessment CTA */}
                <Card className="border-primary/20 bg-primary/5">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <h3 className="font-semibold text-foreground">Re-Assessment</h3>
                      <p className="text-sm text-muted">Setelah belajar, lakukan tes ulang untuk melihat peningkatan skill kamu.</p>
                    </div>
                    <Link
                      href="/student/assessment?retake=true"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm whitespace-nowrap"
                    >
                      Tes Ulang
                    </Link>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getReadinessTier(score: number) {
  if (score >= 85) return { level: 4, label: "Job Ready", status: "Siap Bekerja", color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-100 dark:bg-emerald-900/50", borderColor: "border-emerald-300 dark:border-emerald-700", icon: "🟢", description: "Skill kamu sudah memenuhi standar industri." };
  if (score >= 70) return { level: 3, label: "Almost Ready", status: "Hampir Siap", color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/50", borderColor: "border-amber-300 dark:border-amber-700", icon: "🟡", description: "Kamu sudah memiliki dasar yang kuat." };
  if (score >= 50) return { level: 2, label: "Developing", status: "Sedang Berkembang", color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/50", borderColor: "border-orange-300 dark:border-orange-700", icon: "🟠", description: "Kamu sedang dalam proses belajar." };
  return { level: 1, label: "Exploration", status: "Eksplorasi", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/50", borderColor: "border-red-300 dark:border-red-700", icon: "🔴", description: "Mulai petualangan karier kamu!" };
}

function getMatchBg(percentage: number): string {
  if (percentage >= 80) return "bg-emerald-100 text-emerald-700";
  if (percentage >= 60) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-600";
}
