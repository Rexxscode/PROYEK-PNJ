"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ClipboardCheck,
  Target,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Star,
  BookOpen,
  Sparkles,
  BarChart3,
} from "lucide-react";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import DashboardHeader from "../components/layout/dashboardheader";
import dynamic from "next/dynamic";
import { getCurrentStudent } from "../lib/mock-data";
import { getMatchColor, getReadinessTier } from "../lib/utils";
import { useCountUp } from "../lib/use-count-up";
import { getQuizResult } from "../lib/major-roadmap";
import { loadCareerMatches, generateCareerMatches, saveCareerMatches } from "../lib/career-match";
import type { CareerMatch } from "../lib/type";
import Link from "next/link";

const DoughnutChart = dynamic(() => import("../components/charts/doughnutchart"), { ssr: false });

export default function StudentDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const student = mounted ? getCurrentStudent() : null;

  const animProjects = useCountUp(mounted && student ? student.projects.length : 0);

  const { profile, projects } = student || { profile: null, hardSkills: [], projects: [], jobOpportunities: [] };

  const [hasQuiz, setHasQuiz] = useState(false);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);

  useEffect(() => {
    if (!student || !profile) return;
    const qr = getQuizResult();
    setHasQuiz(!!qr);
    const savedMatches = loadCareerMatches();
    if (qr && savedMatches && savedMatches.length > 0 && savedMatches.some((m) => !m.skillGaps || m.skillGaps.length === 0)) {
      const fresh = generateCareerMatches(student.profile.major, qr);
      saveCareerMatches(fresh);
      setCareerMatches(fresh);
    } else if (savedMatches && savedMatches.length > 0) {
      setCareerMatches(savedMatches);
    } else {
      setCareerMatches(student.careerMatches);
    }
  }, [mounted]);

  const readinessScore = careerMatches.length ? Math.round(careerMatches.reduce((s, c) => s + (c.readinessScore || 0), 0) / careerMatches.length) : 0;
  const readinessTier = getReadinessTier(readinessScore);

  const animReadiness = useCountUp(mounted ? readinessScore : 0);
  const animMatches = useCountUp(mounted ? careerMatches.length : 0);
  const animSkills = useCountUp(mounted && student ? student.hardSkills.length : 0);

  const doughnutLabels = useMemo(() => careerMatches.map((c) => c.title), [careerMatches]);
  const doughnutData = useMemo(() => careerMatches.map((c) => c.matchPercentage), [careerMatches]);

  if (!student || !profile) return null;

  return (
    <div>
      <DashboardHeader
        title={`Selamat datang, ${profile.name}!`}
        subtitle={`${profile.major} - Kelas ${profile.grade}`}
        showNotifications
      />

      {/* Assessment CTA */}
      {!hasQuiz && (
        <Card className="mb-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-semibold text-foreground">Isi Tes Know Yourself!</h3>
              <p className="text-sm text-muted">Ikuti tes jurusan untuk mengetahui profil skill dan rekomendasi karier kamu.</p>
            </div>
            <Link
              href="/student/assessment"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm whitespace-nowrap"
            >
              <ClipboardCheck className="w-4 h-4" />
              Mulai Tes
            </Link>
          </div>
        </Card>
      )}

      {/* Readiness Score Card */}
      {hasQuiz && readinessScore > 0 && (
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className={`lg:col-span-2 ${readinessTier.bgColor} border ${readinessTier.borderColor}`}>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{readinessTier.icon}</span>
                  <p className={`text-xs sm:text-sm font-medium ${readinessTier.color}`}>{readinessTier.label}</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold text-foreground">{animReadiness}%</p>
                <p className={`text-xs sm:text-sm mt-2 ${readinessTier.color}`}>{readinessTier.description}</p>
              </div>
              <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 ${readinessTier.borderColor} flex items-center justify-center flex-shrink-0`}>
                <BarChart3 className={`w-8 h-8 sm:w-10 sm:h-10 ${readinessTier.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-black/10 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-700 ${readinessTier.level >= 4 ? "bg-emerald-500" : readinessTier.level >= 3 ? "bg-amber-500" : readinessTier.level >= 2 ? "bg-orange-500" : "bg-red-500"}`} style={{ width: `${animReadiness}%` }} />
              </div>
            </div>
          </Card>

          <Card>
            <DoughnutChart
              labels={doughnutLabels}
              data={doughnutData}
              title="Distribusi Kecocokan Karir"
            />
          </Card>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 stagger-in">
        {[
          { label: "Career Matches", value: animMatches.toString(), icon: Target, color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400" },
          { label: "Skills Dinilai", value: animSkills.toString(), icon: ClipboardCheck, color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" },
          { label: "Proyek Selesai", value: animProjects.toString(), icon: Star, color: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Learning Recommendation CTA */}
      {hasQuiz && readinessTier.level <= 2 && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-semibold text-foreground">Learning Recommendation</h3>
              <p className="text-sm text-muted">Lihat skill gap kamu dan temukan sumber belajar yang direkomendasikan berdasarkan profilmu.</p>
            </div>
            <Link
              href="/student/roadmap"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              Lihat Rekomendasi
            </Link>
          </div>
        </Card>
      )}

      {/* Top Career Matches */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Top Career Matches</h3>
            <a href="/student/career-match" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {careerMatches.slice(0, 3).map((match) => (
              <div key={match.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground text-sm truncate">{match.title}</p>
                  <span className={`text-sm font-bold ${getMatchColor(match.matchPercentage)}`}>
                    {match.matchPercentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted">{match.category}</p>
                  <span className={`text-xs font-medium ${getReadinessTier(match.readinessScore || 0).color}`}>
                    Readiness: {match.readinessScore || 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Projects</h3>
            <a href="/student/portofolio" className="text-sm text-primary hover:text-primary-dark flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground text-sm truncate">{project.title}</p>
                  <div className="flex gap-1 mt-1">
                    {project.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="primary" className="text-[10px]">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Star className="w-4 h-4 text-muted" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
