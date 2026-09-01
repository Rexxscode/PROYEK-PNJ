"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileQuestion,
  RotateCcw,
  Download,
  Loader2,
  Award,
  Clock,
  ListChecks,
  X,
} from "lucide-react";
import Card from "../../../components/ui/card";
import Badge from "../../../components/ui/badge";
import ProgressBar from "../../../components/ui/progressbar";
import { SkeletonDashboard } from "../../../components/ui/skeleton";
import DashboardHeader from "../../../components/layout/dashboardheader";
import CertificateView, {
  formatIndonesianDate,
} from "../../../components/certificate/certificate-view";
import { getMateriById } from "../../../lib/materi-catalog";
import { useAuth } from "../../../lib/auth-context";
import { api, BACKEND_ENDPOINTS } from "../../../lib/api";
import {
  getRequiredCorrect,
} from "../../../lib/certificates";
import type { QuizQuestion } from "../../../lib/major-quiz";

export default function MateriTesPage() {
  const { user } = useAuth();
  const params = useParams<{ materiId: string }>();
  const materiId = params?.materiId || "";
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean; date: string } | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const certRef = useRef<HTMLDivElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = previewWrapRef.current;
    if (!el) return;
    const update = () => {
      const k = el.clientWidth / 842.25;
      setPreviewScale(Math.min(1.6, k));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [result]);

  const materi = useMemo(() => getMateriById(materiId), [materiId]);

  useEffect(() => {
    setMounted(true);
    if (!materi || !user) return;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await api.get<{ success: boolean; data: QuizQuestion[] }>(BACKEND_ENDPOINTS.materiQuiz.questions(materiId));
        if (cancelled) return;
        if (!res.success || !res.data || res.data.length === 0) {
          setQuestions([]);
          setLoadError("Soal untuk materi ini belum tersedia.");
          return;
        }
        const qs = res.data.map((q) => ({ ...q, id: String(q.id) }));
        setQuestions(qs);
      } catch {
        if (!cancelled) setLoadError("Gagal memuat soal. Periksa koneksi atau coba lagi.");
      }
    };
    load();
    return () => { cancelled = true; };
  }, [materi, materiId, user]);

  if (!mounted || !user) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;

  if (!materi) {
    return (
      <div>
        <DashboardHeader title="Tes Materi" subtitle="Materi tidak ditemukan" />
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <FileQuestion className="w-12 h-12 text-muted mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Materi tidak ditemukan</h3>
          <p className="text-sm text-muted mb-6">Materi atau soal belum tersedia.</p>
          <Link href="/student/sertifikat" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            Kembali ke Daftar Materi
          </Link>
        </Card>
      </div>
    );
  }

  const studentMajor = user.student?.major || "";
  const studentGrade = user.student?.grade || "";

  if (materi.major !== studentMajor || materi.grade !== studentGrade) {
    return (
      <div>
        <DashboardHeader title="Tes Materi" subtitle="Materi tidak tersedia" />
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <FileQuestion className="w-12 h-12 text-muted mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Materi tidak tersedia untuk kelasmu</h3>
          <p className="text-sm text-muted mb-6">Materi ini bukan bagian dari jurusan atau tingkatan kelasmu saat ini (Kelas {studentGrade}). Setiap jurusan memiliki materi berbeda per kelas.</p>
          <Link href="/student/sertifikat" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            Kembali ke Daftar Materi
          </Link>
        </Card>
      </div>
    );
  }

  const studentName = user.name || "";
  const total = questions.length;
  const required = getRequiredCorrect();
  const answeredCount = Object.values(answers).filter((a) => a >= 0).length;

  const selectAnswer = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [questions[current].id]: idx }));
  };

  const goNext = () => {
    if (current < total - 1) setCurrent((c) => c + 1);
  };
  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const computeResult = () => {
    const score = questions.reduce(
      (sum, q, i) => {
        const active = answers[q.id];
        return sum + (active !== undefined && active === q.correct ? 1 : 0);
      },
      0
    );
    const passed = total > 0 && score / total >= 0.8;
    const date = formatIndonesianDate(new Date());
    const res = { score, total, passed, date };
    setResult(res);
    api.post(BACKEND_ENDPOINTS.materiQuiz.submit(materiId), {
      materiId,
      answers,
    }).catch(() => {});
  };

  const restart = () => {
    setAnswers({});
    setCurrent(0);
    setResult(null);
    setConfirmSubmit(false);
  };

  const handleDownloadPdf = async () => {
    if (generatingPdf || !certRef.current) return;
    setGeneratingPdf(true);
    try {
      const { domToPng } = await import("modern-screenshot");
      const { jsPDF } = await import("jspdf");
      const dataUrl = await domToPng(certRef.current, {
        scale: 1,
        backgroundColor: "#ffffff",
      });
      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((r) => { img.onload = () => r(); });
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfW = 297;
      const pdfH = (img.height * pdfW) / img.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfW, pdfH);
      pdf.save(`Sertifikat_${studentName.replace(/\s+/g, "_")}_${materi.title.replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  // ── Hasil / Sertifikat ───────────────────────────────────────────────────
  if (result) {
    if (result.passed) {
      return (
        <div>
          <DashboardHeader
            title="Sertifikat"
            subtitle={`Selamat, kamu berhasil menyelesaikan materi ${materi.title}!`}
          />
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Kamu LULUS!</h3>
                  <p className="text-sm text-muted">
                    Nilai {result.score}/{result.total} — syarat lulus minimal {required}/{result.total}.
                  </p>
                </div>
              </div>
              <ProgressBar
                value={Math.round((result.score / result.total) * 100)}
                size="md"
                color="success"
                showValue
                className="sm:w-64"
              />
            </div>
          </Card>

          <div className="overflow-x-auto pb-4">
            <div ref={previewWrapRef} className="w-full">
              <CertificateView
                studentName={studentName}
                materiTitle={materi.title}
                majorName={materi.major}
                date={result.date}
                scale={previewScale}
              />
            </div>
          </div>

          {/* Node tersembunyi untuk capture PDF resolusi tinggi */}
          <div
            aria-hidden
            style={{ position: "fixed", left: -9999, top: 0, opacity: 0, pointerEvents: "none" }}
          >
<CertificateView
                ref={certRef}
                studentName={studentName}
                materiTitle={materi.title}
                majorName={materi.major}
                date={result.date}
                scale={2}
              />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={generatingPdf}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-primary text-white border border-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {generatingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {generatingPdf ? "Menyiapkan..." : "Download Sertifikat PDF"}
            </button>
            <button
              onClick={restart}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
            >
              <RotateCcw className="w-4 h-4" />
              Kerjakan Ulang
            </button>
            <Link
              href="/student/sertifikat"
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Daftar Materi
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div>
        <DashboardHeader
          title="Hasil Tes"
          subtitle={materi.title}
        />
        <Card className="max-w-xl mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-5">
            <X className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Belum Lulus</h3>
          <p className="text-sm text-muted mb-6">
            Nilai kamu {result.score}/{result.total}. Syarat lulus minimal {required}/{result.total} ({Math.round((required / total) * 100)}%).
            Jangan menyerah, coba lagi setelah mempelajari materi!
          </p>
          <div className="max-w-xs mx-auto mb-8">
            <ProgressBar
              value={Math.round((result.score / result.total) * 100)}
              size="md"
              color={result.score >= required ? "success" : "warning"}
              showValue
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={restart}
              className="flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Lagi
            </button>
            <Link
              href="/student/sertifikat"
              className="flex items-center gap-2 px-5 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
            >
              Kembali ke Daftar
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (loadError || questions.length === 0) {
    return (
      <div>
        <DashboardHeader title="Tes Materi" subtitle={materi.title} />
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <FileQuestion className="w-12 h-12 text-muted mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {loadError ? "Soal tidak dapat dimuat" : "Soal belum tersedia"}
          </h3>
          <p className="text-sm text-muted mb-6">{loadError || "Soal untuk materi ini belum tersedia."}</p>
          <Link href="/student/sertifikat" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            Kembali ke Daftar Materi
          </Link>
        </Card>
      </div>
    );
  }

  const q = questions[current];

  // ── Form Tes ─────────────────────────────────────────────────────────────
  return (
    <div>
      <DashboardHeader
        title={`Tes Materi: ${materi.title}`}
        subtitle={`${materi.major} — ${total} soal pilihan ganda, syarat lulus ${required} benar`}
      />

      <Card className="mb-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm text-muted">
            <ListChecks className="w-4 h-4" />
            Soal {current + 1} dari {total}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Clock className="w-4 h-4" />
            Tidak ada batas waktu
          </div>
        </div>
        <ProgressBar
          value={Math.round(((current + 1) / total) * 100)}
          size="sm"
          color="primary"
          showValue={false}
        />
      </Card>

      <Card key={q.id} className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary">{q.skill}</Badge>
          <Badge variant="secondary">Tingkat: {q.difficulty}</Badge>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground mt-3 mb-5">
          {q.question}
        </h3>
        <div className="space-y-2.5">
          {q.options.map((opt, idx) => {
            const isSelected = answers[q.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm rounded-xl border transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/30"
                    : "border-border bg-card hover:bg-gray-50 dark:hover:bg-gray-700 text-foreground"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border ${
                    isSelected
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-100 dark:bg-gray-700 text-muted border-border"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-card border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        {current === total - 1 ? (
          <button
            onClick={() => setConfirmSubmit(true)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Selesai & Kirim
          </button>
        ) : (
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-5 py-2.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Berikutnya
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {confirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Kirim Jawaban?</h3>
            <p className="text-sm text-muted mb-1">
              Kamu telah menjawab <strong className="text-foreground">{answeredCount}</strong> dari{" "}
              <strong className="text-foreground">{total}</strong> soal.
            </p>
            <p className="text-sm text-muted mb-6">
              {answeredCount < total
                ? "Soal yang belum dijawab akan dianggap salah. Kamu yakin ingin mengirim?"
                : "Setelah dikirim, hasil tidak dapat diubah."}
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setConfirmSubmit(false)}
                className="px-4 py-2 text-sm bg-card border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  setConfirmSubmit(false);
                  computeResult();
                }}
                className="px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Kirim Jawaban
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}