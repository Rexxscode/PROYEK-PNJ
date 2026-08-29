"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  CircleDot,
  RefreshCcw,
  Play,
  Eye,
} from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import ProgressBar from "../../components/ui/progressbar";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { MAJORS, materiList } from "../../lib/materi-catalog";
import { getCurrentStudent } from "../../lib/mock-data";
import { getCertificateResults } from "../../lib/certificates";
import type { CertificateResult } from "../../lib/certificates";

type MateriStatus = {
  result?: CertificateResult;
  status: "not-started" | "in-progress" | "passed";
};

export default function SertifikatPage() {
  const [mounted, setMounted] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, MateriStatus>>({});

  useEffect(() => {
    setMounted(true);
    const student = getCurrentStudent();
    if (!student) return;
    const results = getCertificateResults(student.profile.email);
    const map: Record<string, MateriStatus> = {};
    materiList.forEach((m) => {
      const r = results[m.id];
      map[m.id] = r
        ? { result: r, status: r.passed ? "passed" : "in-progress" }
        : { status: "not-started" };
    });
    setStatusMap(map);
  }, []);

  if (!mounted) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;

  const student = getCurrentStudent();
  const studentMajor = MAJORS.find((m) => m.name === student?.profile.major) ?? MAJORS[0];
  const majorEntries = [studentMajor];
  const majorMateri = materiList.filter((m) => m.major === studentMajor.name);

  const totalMateri = majorMateri.length;
  const passedCount = majorMateri.filter((m) => statusMap[m.id]?.status === "passed").length;
  const passedPercent = Math.round((passedCount / totalMateri) * 100);

  return (
    <div>
      <DashboardHeader
        title="Sertifikat Materi"
        subtitle="Kerjakan tes 20 soal, lulus minimal 80% (16 benar) dan dapatkan sertifikat"
      />

      {/* Ringkasan */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalMateri}</p>
              <p className="text-xs text-muted">Total Materi</p>
            </div>
          </div>
        </Card>
        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{passedCount}</p>
              <p className="text-xs text-muted">Sertifikat Diperoleh</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-muted">Progres Keseluruhan</p>
            <span className="text-sm font-bold text-foreground">{passedPercent}%</span>
          </div>
          <ProgressBar value={passedPercent} size="md" color={passedPercent >= 80 ? "success" : "primary"} showValue={false} />
        </Card>
      </div>

      {/* Daftar materi per jurusan siswa */}
      {majorEntries.map((major) => {
        const items = materiList.filter((m) => m.major === major.name);
        if (items.length === 0) return null;
        return (
          <div key={major.name} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold uppercase tracking-wider">
                {major.short}
              </span>
              <h3 className="text-lg font-bold text-foreground">{major.name}</h3>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((materi) => {
                const st = statusMap[materi.id];
                const { result } = st;
                return (
                  <Card key={materi.id} className="flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      {st.status === "passed" && (
                        <Badge variant="success">Lulus</Badge>
                      )}
                      {st.status === "in-progress" && (
                        <Badge variant="warning">
                          Belum Lulus ({result?.score}/{result?.total})
                        </Badge>
                      )}
                      {st.status === "not-started" && (
                        <Badge variant="default">Belum Dikerjakan</Badge>
                      )}
                    </div>

                    <h4 className="font-semibold text-foreground mb-1">{materi.title}</h4>
                    <p className="text-xs text-muted mb-3 flex-1">{materi.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {materi.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-muted rounded text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
                      {st.status === "passed" ? (
                        <>
                          <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            {result?.date}
                          </span>
                          <Link
                            href={`/student/sertifikat/${materi.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Lihat Sertifikat
                          </Link>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-1.5 text-xs text-muted">
                            <CircleDot className="w-4 h-4" />
                            20 soal · min 80%
                          </span>
                          <Link
                            href={`/student/sertifikat/${materi.id}`}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                              st.status === "in-progress"
                                ? "bg-amber-500 text-white hover:bg-amber-600"
                                : "bg-primary text-white hover:bg-primary-dark"
                            }`}
                          >
                            {st.status === "in-progress" ? (
                              <>
                                <RefreshCcw className="w-3.5 h-3.5" />
                                Coba Lagi
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" />
                                Mulai Tes
                              </>
                            )}
                          </Link>
                        </>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}