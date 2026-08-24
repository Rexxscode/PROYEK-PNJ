"use client";

import { useState, useEffect } from "react";
import {
  Target,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import ProgressBar from "../../components/ui/progressbar";
import dynamic from "next/dynamic";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useStudentData } from "../../lib/use-student-data";
import { getMatchBg, getGapStatusColor, getGapStatusLabel, getReadinessLabel } from "../../lib/utils";
import type { CareerMatch } from "../../lib/type";

const SkillRadar = dynamic(() => import("../../components/charts/skillradar"), { ssr: false });

export default function CareerMatchPage() {
  const [selectedCareer, setSelectedCareer] = useState<CareerMatch | null>(null);

  const { data: student, loading } = useStudentData();
  const careerMatches = student?.careerMatches || [];
  const skillGaps = student?.skillGaps || [];

  useEffect(() => {
    if (careerMatches.length > 0 && !selectedCareer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCareer(careerMatches[0]);
    }
  }, [careerMatches, selectedCareer]);

  if (loading || !student || !selectedCareer) return null;
  const readinessScore = selectedCareer.matchPercentage;

  return (
    <div>
      <DashboardHeader
        title="Know Your Path"
        subtitle="Temukan kecocokan karier berdasarkan skill kamu"
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Career List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-semibold text-foreground mb-2">Rekomendasi Karier</h3>
          {careerMatches.map((career) => (
            <button
              key={career.id}
              onClick={() => setSelectedCareer(career)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedCareer.id === career.id
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
              <p className="text-xs text-muted">{career.category}</p>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Career Header */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="primary" className="mb-2">{selectedCareer.category}</Badge>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{selectedCareer.title}</h2>
                <p className="text-muted text-sm max-w-lg">{selectedCareer.description}</p>
              </div>
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl ${getMatchBg(selectedCareer.matchPercentage)} flex items-center justify-center`}>
                  <span className="text-2xl font-bold">{selectedCareer.matchPercentage}%</span>
                </div>
                <p className="text-xs text-muted mt-1">Match</p>
              </div>
            </div>
          </Card>

          {/* Readiness Score */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Readiness Score</h3>
                <p className="text-sm text-muted">{getReadinessLabel(readinessScore)}</p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-foreground">{readinessScore}%</span>
              <div className="flex-1">
                <ProgressBar
                  value={readinessScore}
                  size="lg"
                  color={readinessScore >= 80 ? "success" : readinessScore >= 60 ? "primary" : "warning"}
                  showValue={false}
                />
              </div>
            </div>
          </Card>

          {/* Skill Gap Analysis */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Skill Gap Analysis</h3>
                <p className="text-sm text-muted">Perbandingan skill kamu dengan yang dibutuhkan</p>
              </div>
            </div>

            <div className="space-y-4">
              {skillGaps.map((gap) => (
                <div key={gap.skillName} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${getGapStatusColor(gap.status)}`} />
                      <span className="text-sm font-medium text-foreground">{gap.skillName}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-xs text-muted">
                        Kamu: {gap.currentLevel}/5 → Butuh: {gap.requiredLevel}/5
                      </span>
                      <Badge
                        variant={
                          gap.status === "mastered"
                            ? "success"
                            : gap.status === "improving"
                            ? "warning"
                            : "danger"
                        }
                        className="text-[10px]"
                      >
                        {getGapStatusLabel(gap.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/40 transition-all"
                        style={{ width: `${(gap.currentLevel / 5) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(gap.requiredLevel / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-primary/40" /> Level Kamu
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-primary" /> Level Dibutuhkan
              </div>
            </div>
          </Card>

          {/* Skill Profile Radar Chart */}
          <Card>
            <SkillRadar
              skills={student.hardSkills.slice(0, 8)}
              title="Profil Skill Kamu"
            />
          </Card>

          {/* Action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/student/roadmap"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Lihat Roadmap Belajar
            </a>
            <a
              href="/student/jobs"
              className="flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Lihat Lowongan
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}