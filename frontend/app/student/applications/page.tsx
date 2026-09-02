"use client";

import { useState, useEffect } from "react";
import { Briefcase, MapPin, Calendar, Send, Clock } from "lucide-react";
import Link from "next/link";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import { SkeletonTable } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useAuth } from "../../lib/auth-context";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";
import { getMatchBg, formatDate } from "../../lib/utils";

interface Application {
  id: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary?: string;
    matchPercentage: number;
    deadline: string;
    requiredSkills: string[];
  };
}

const typeLabels: Record<string, string> = { magang: "Magang", fulltime: "Full-time", parttime: "Part-time", freelance: "Freelance" };

const statusConfig: Record<string, { label: string; variant: "warning" | "success" | "danger" }> = {
  pending: { label: "Menunggu", variant: "warning" },
  accepted: { label: "Diterima", variant: "success" },
  rejected: { label: "Ditolak", variant: "danger" },
};

export default function StudentApplicationsPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !user) return;
    const fetchApplications = async () => {
      try {
        const res = await api.get<{ success: boolean; data: Application[] }>(BACKEND_ENDPOINTS.jobs.myApplications);
        if (res.success) {
          setApplications(Array.isArray(res.data) ? res.data : []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [mounted, user]);

  if (!mounted || !user || loading) return <div className="p-6"><SkeletonTable /></div>;

  const statusCount = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <DashboardHeader
        title="Lamaran Saya"
        subtitle="Pantau status lamaran yang sudah kamu kirim"
        showNotifications
      />

      {applications.length === 0 ? (
        <Card className="text-center py-16">
          <Send className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Belum ada lamaran</p>
          <p className="text-sm text-muted mt-1 mb-4">Mulai cari lowongan dan lamar pekerjaan yang cocok dengan skillmu.</p>
          <Link href="/student/jobs" className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
            <Briefcase className="w-4 h-4" />
            Cari Lowongan
          </Link>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="!p-4 text-center">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{statusCount.pending || 0}</p>
              <p className="text-xs text-muted mt-1">Menunggu</p>
            </Card>
            <Card className="!p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{statusCount.accepted || 0}</p>
              <p className="text-xs text-muted mt-1">Diterima</p>
            </Card>
            <Card className="!p-4 text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{statusCount.rejected || 0}</p>
              <p className="text-xs text-muted mt-1">Ditolak</p>
            </Card>
          </div>

          <div className="space-y-4">
            {applications.map((app) => {
              const cfg = statusConfig[app.status] || statusConfig.pending;
              return (
                <Card key={app.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{app.job.title}</h3>
                        <Badge variant="primary">{typeLabels[app.job.type] || app.job.type}</Badge>
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </div>
                      <p className="text-sm text-muted">{app.job.company}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Dilamar: {formatDate(app.appliedAt)}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Deadline: {formatDate(app.job.deadline)}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {app.job.requiredSkills.map((sk) => (
                          <Badge key={sk} variant="default" className="text-[10px]">{sk}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className={`text-right px-4 py-2 rounded-xl shrink-0 ${getMatchBg(app.job.matchPercentage)}`}>
                      <div className="text-2xl font-bold">{app.job.matchPercentage}%</div>
                      <div className="text-xs opacity-80">Match</div>
                    </div>
                  </div>
                  {app.status === "accepted" && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      <Briefcase className="w-4 h-4" />
                      Selamat! Lamaranmu diterima. Tim {app.job.company} akan menghubungimu.
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}