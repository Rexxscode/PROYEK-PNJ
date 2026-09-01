"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getInitials } from "../../lib/utils";
import { Briefcase, ArrowLeft } from "lucide-react";
import Card from "../../components/ui/card";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";

interface PublicProject {
  id: number;
  title: string;
  description: string;
  skills: string[];
  projectUrl?: string | null;
  completedAt?: string | null;
}

interface PublicPortfolioData {
  user: { name: string; email: string; major: string | null };
  projects: PublicProject[];
}

export default function PublicPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [data, setData] = useState<PublicPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [backLink, setBackLink] = useState("/");

  useEffect(() => {
    const email = localStorage.getItem("studentEmail");
    setBackLink(email ? "/student" : "/");
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await api.get<{ success: boolean; data: PublicPortfolioData }>(BACKEND_ENDPOINTS.portfolios.public(slug));
        if (cancelled) return;
        if (res.success && res.data) setData(res.data);
        else setNotFound(true);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="text-center py-12 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">?</span>
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Portfolio Tidak Ditemukan</h1>
          <p className="text-sm text-muted mb-6">Portfolio dengan URL ini tidak tersedia atau sudah tidak aktif.</p>
          <Link href={backLink} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </Card>
      </div>
    );
  }

  const { user, projects } = data;
  const name = user.name || "Student";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-3xl mx-auto px-4 py-10 text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-2 border-white/40">
            <span className="text-2xl font-bold text-white">{getInitials(name)}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{name}</h1>
          <p className="text-white/80 text-sm">{user.major || "Student"}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Projects */}
        <Card>
          <h2 className="font-semibold text-foreground mb-3">Proyek</h2>
          {projects.length === 0 ? (
            <p className="text-sm text-muted">Belum ada proyek yang ditampilkan.</p>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-border">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-foreground text-sm">{p.title}</p>
                    {p.projectUrl && (
                      <a href={p.projectUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">
                        Buka Proyek
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.skills.map((sk) => (
                      <span key={sk} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-medium">{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-xs text-muted">Portfolio by SkillMatch — Career Readiness Platform</p>
        </div>
      </div>
    </div>
  );
}
