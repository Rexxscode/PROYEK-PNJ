"use client";

import { useMemo } from "react";
import {
  ClipboardCheck,
  Target,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import DashboardHeader from "../components/layout/dashboardheader";
import dynamic from "next/dynamic";
import { useStudentData } from "../lib/use-student-data";
import { getMatchColor, getReadinessLabel } from "../lib/utils";
import { useCountUp } from "../lib/use-count-up";

const LineChart = dynamic(() => import("../components/charts/linechart"), { ssr: false });
import SkillBarChart from "../components/charts/barchart";

export default function StudentDashboard() {
  const { data: student, loading } = useStudentData();

  const animReadiness = useCountUp(student ? Math.round(student.careerMatches.reduce((s, c) => s + c.matchPercentage, 0) / student.careerMatches.length) : 0);
  const animSkills = useCountUp(student ? student.hardSkills.length : 0);
  const animMatches = useCountUp(student ? student.careerMatches.length : 0);
  const animProjects = useCountUp(student ? student.projects.length : 0);
  const animJobs = useCountUp(student ? student.jobOpportunities.filter((j) => j.matchPercentage >= 70).length : 0);

  const { profile, careerMatches, roadmapMilestones, projects } = student || { profile: null, hardSkills: [], careerMatches: [], roadmapMilestones: [], projects: [], jobOpportunities: [] };
  const readinessScore = careerMatches.length ? Math.round(careerMatches.reduce((s, c) => s + c.matchPercentage, 0) / careerMatches.length) : 0;
  const completedMilestones = roadmapMilestones.filter((m) => m.status === "completed").length;
  const totalMilestones = roadmapMilestones.length || 1;
  const inProgressMilestones = roadmapMilestones.filter((m) => m.status === "in_progress").length;
  const availableMilestones = roadmapMilestones.filter((m) => m.status === "available").length;
  const lockedMilestones = roadmapMilestones.filter((m) => m.status === "locked").length;

  const studentStats = useMemo(() => {
    const readinessByMajor = roadmapMilestones.length > 0
      ? [{ major: profile?.major || "Semua Jurusan", score: Math.round((completedMilestones / Math.max(roadmapMilestones.length, 1)) * 100) }]
      : [];
    return {
      readinessByMajor,
    };
  }, [roadmapMilestones, profile?.major]);

  const doughnut1Labels = useMemo(() => ["Selesai", "Dalam Progres", "Tersedia", "Terkunci"], []);
  const doughnut1Data = useMemo(() => [completedMilestones, inProgressMilestones, availableMilestones, lockedMilestones], [completedMilestones, inProgressMilestones, availableMilestones, lockedMilestones]);
  const doughnut1Colors = useMemo(() => ["#10b981", "#f59e0b", "#3b82f6", "#94a3b8"], []);
  const doughnut1Center = useMemo(() => `${Math.round((completedMilestones / totalMilestones) * 100)}%`, [completedMilestones, totalMilestones]);

  const doughnut2Labels = useMemo(() => careerMatches.map((c) => c.title), [careerMatches]);
  const doughnut2Data = useMemo(() => careerMatches.map((c) => c.matchPercentage), [careerMatches]);

  const lineLabels = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"], []);
  const lineDatasets = useMemo(() => [{ label: "Skill Progress (%)", data: [
    Math.round(readinessScore * 0.30),
    Math.round(readinessScore * 0.50),
    100,
    100,
    100,
    readinessScore,
  ], fill: true }], [readinessScore]);

  if (!student || !profile) return null;

  return (
    <div>
      <DashboardHeader
        title={`Selamat datang, ${profile.name}!`}
        subtitle={`${profile.major} - Kelas ${profile.grade}`}
        showNotifications
      />

      {/* Readiness Score Card */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-white/80 text-xs sm:text-sm mb-1">Career Readiness Score</p>
              <p className="text-3xl sm:text-5xl font-bold">{animReadiness}%</p>
              <p className="text-white/70 text-xs sm:text-sm mt-2 truncate">{getReadinessLabel(readinessScore)}</p>
            </div>
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all duration-700" style={{ width: `${animReadiness}%` }} />
            </div>
          </div>
        </Card>

        <Card>
          <SkillBarChart
            labels={studentStats.readinessByMajor.map((m) => m.major)}
            data={studentStats.readinessByMajor.map((m) => m.score)}
            title="Readiness Score per Jurusan"
            color="rgba(124, 58, 237, 0.8)"
          />
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-in">
        {[
          { label: "Skills Dinilai", value: animSkills.toString(), icon: ClipboardCheck, color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" },
          { label: "Career Matches", value: animMatches.toString(), icon: Target, color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400" },
          { label: "Proyek Selesai", value: animProjects.toString(), icon: Star, color: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" },
          { label: "Lowongan Cocok", value: animJobs.toString(), icon: Briefcase, color: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" },
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

      {/* Skill Progress Line Chart */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8 min-w-0">
        <Card>
          <LineChart
            labels={lineLabels}
            datasets={lineDatasets}
            title="Progress Skill (6 Bulan)"
            yMax={100}
          />
        </Card>

        <Card>
          <LineChart
            labels={lineLabels}
            datasets={lineDatasets}
            title="Progress Skill (6 Bulan)"
            yMax={100}
          />
        </Card>
      </div>

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
              <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                   <p className="font-medium text-foreground text-sm truncate">{match.title}</p>
                  <p className="text-xs text-muted">{match.category}</p>
                </div>
                <span className={`text-sm font-bold ${getMatchColor(match.matchPercentage)}`}>
                  {match.matchPercentage}%
                </span>
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
                <Clock className="w-4 h-4 text-muted" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
