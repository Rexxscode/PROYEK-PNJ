"use client";

import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Target,
  Map,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";
import Card from "../components/ui/card";
import Badge from "../components/ui/badge";
import DashboardHeader from "../components/layout/dashboardheader";
import DoughnutChart from "../components/charts/doughnutchart";
import LineChart from "../components/charts/linechart";
import { getCurrentStudent } from "../lib/mock-data";
import { getMatchColor } from "../lib/utils";

export default function StudentDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const student = getCurrentStudent();
  if (!student) return null;

  const { profile, hardSkills, careerMatches, roadmapMilestones, projects, jobOpportunities } = student;
  const readinessScore = Math.round(careerMatches.reduce((sum, c) => sum + c.matchPercentage, 0) / careerMatches.length);
  const completedMilestones = roadmapMilestones.filter((m) => m.status === "completed").length;
  const totalMilestones = roadmapMilestones.length;
  const inProgressMilestones = roadmapMilestones.filter((m) => m.status === "in_progress").length;
  const availableMilestones = roadmapMilestones.filter((m) => m.status === "available").length;
  const lockedMilestones = roadmapMilestones.filter((m) => m.status === "locked").length;

  const skillProgressLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
  const skillProgressData = [
    Math.round(readinessScore * 0.30),
    Math.round(readinessScore * 0.50),
    100,
    100,
    100,
    readinessScore,
  ];

  return (
    <div>
      <DashboardHeader
        title={`Selamat datang, ${profile.name}!`}
        subtitle={`${profile.major} - Kelas ${profile.grade}`}
      />

      {/* Readiness Score Card */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Career Readiness Score</p>
              <p className="text-5xl font-bold">{readinessScore}%</p>
              <p className="text-white/70 text-sm mt-2">{getReadinessLabel(readinessScore)}</p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${readinessScore}%` }} />
            </div>
          </div>
        </Card>

        <Card>
          <DoughnutChart
            labels={["Selesai", "Dalam Progres", "Tersedia", "Terkunci"]}
            data={[completedMilestones, inProgressMilestones, availableMilestones, lockedMilestones]}
            title="Progress Roadmap"
            colors={["#10b981", "#f59e0b", "#3b82f6", "#94a3b8"]}
            centerLabel={`${Math.round((completedMilestones / totalMilestones) * 100)}%`}
          />
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Skills Dinilai", value: student.hardSkills.length.toString(), icon: ClipboardCheck, color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" },
          { label: "Career Matches", value: careerMatches.length.toString(), icon: Target, color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400" },
          { label: "Proyek Selesai", value: projects.length.toString(), icon: Star, color: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" },
          { label: "Lowongan Cocok", value: jobOpportunities.filter((j) => j.matchPercentage >= 70).length.toString(), icon: Briefcase, color: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" },
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
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <LineChart
            labels={skillProgressLabels}
            datasets={[{ label: "Skill Progress (%)", data: skillProgressData, fill: true }]}
            title="Progress Skill (6 Bulan)"
            yMax={100}
          />
        </Card>

        <Card>
          <DoughnutChart
            labels={careerMatches.map((c) => c.title)}
            data={careerMatches.map((c) => c.matchPercentage)}
            title="Distribusi Kecocokan Karir"
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
                  <p className="font-medium text-foreground text-sm">{match.title}</p>
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
                  <p className="font-medium text-foreground text-sm">{project.title}</p>
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

function getReadinessLabel(score: number): string {
  if (score >= 85) return "Sangat Siap";
  if (score >= 70) return "Siap";
  if (score >= 50) return "Perlu Persiapan";
  return "Mulai Belajar";
}
