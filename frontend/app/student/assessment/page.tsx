"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ClipboardCheck, ChevronRight, ChevronLeft, CheckCircle2, Brain } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { getCurrentStudent } from "../../lib/mock-data";
import { addNotification } from "../../lib/notifications";
import { getQuizForMajor, gradeQuiz, type QuizQuestion, type QuizResult } from "../../lib/major-quiz";
import { generateCareerMatches, saveCareerMatches } from "../../lib/career-match";
import type { Skill } from "../../lib/type";
import { MAJORS } from "../../lib/materi-catalog";

const SkillRadar = dynamic(() => import("../../components/charts/skillradar"), { ssr: false });

const totalSteps = 3;
const stepLabels = ["Selamat Datang", "Tes Jurusan", "Hasil"];

const MAJOR_TABS = [
  { label: "Semua", key: "all" },
  ...MAJORS.map((m) => ({ label: m.short, key: m.short.toLowerCase() })),
];

const difficultyColor: Record<string, "success" | "primary" | "warning" | "danger"> = {
  basic: "success",
  intermediate: "primary",
  advanced: "warning",
  expert: "danger",
};
const difficultyLabel: Record<string, string> = {
  basic: "Dasar",
  intermediate: "Menengah",
  advanced: "Lanjut",
  expert: "Ahli",
};

function getLevelFromScore(correct: number, total: number): number {
  const pct = total > 0 ? correct / total : 0;
  if (pct >= 0.9) return 5;
  if (pct >= 0.7) return 4;
  if (pct >= 0.5) return 3;
  if (pct >= 0.3) return 2;
  return 1;
}

function getLevelLabel(level: number): string {
  const labels = ["", "Belum", "Dasar", "Menengah", "Mahir", "Ahli"];
  return labels[level] || "";
}

function getLevelColor(level: number): "danger" | "warning" | "default" | "primary" | "success" {
  if (level <= 1) return "danger";
  if (level <= 2) return "warning";
  if (level <= 3) return "default";
  if (level <= 4) return "primary";
  return "success";
}

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const isRetake = searchParams.get("retake") === "true";
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [quizBucket, setQuizBucket] = useState<Record<string, QuizQuestion[]>>({});
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [resultSkills, setResultSkills] = useState<Skill[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isRetake) setCurrentStep(2);
  }, [mounted, isRetake]);

  useEffect(() => {
    if (!mounted) return;
    const student = getCurrentStudent();
    if (!student) return;
    const bucket: Record<string, QuizQuestion[]> = {};
    let all: QuizQuestion[] = [];
    MAJORS.forEach((m) => {
      const qs = getQuizForMajor(m.name) || [];
      bucket[m.short.toLowerCase()] = qs;
      all = all.concat(qs);
    });
    setQuizBucket(bucket);
    setAllQuestions(all);
    const ownShort = MAJORS.find((m) => m.name === student.profile.major)?.short;
    setSelectedTab(ownShort ? ownShort.toLowerCase() : "all");
  }, [mounted]);

  if (!mounted) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;
  const student = getCurrentStudent();
  if (!student) return <div className="p-6 lg:pl-72"><SkeletonDashboard /></div>;
  const { profile: currentUser } = student;
  const quizQuestions = selectedTab === "all" ? allQuestions : quizBucket[selectedTab] || [];
  const quizProgress = quizQuestions.filter((q) => quizAnswers[q.id] !== undefined).length;
  const quizComplete = quizQuestions.length > 0 && quizQuestions.every((q) => quizAnswers[q.id] !== undefined);
  const quizLoaded = allQuestions.length > 0;
  const quizTitle = selectedTab === "all" ? "Semua Jurusan" : (MAJOR_TABS.find((t) => t.key === selectedTab)?.label || selectedTab);

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const switchTab = (key: string) => {
    if (key === selectedTab) return;
    setSelectedTab(key);
    setQuizCurrent(0);
  };

  const goToStep = (step: number) => {
    if (step === 3) {
      const result = gradeQuiz(quizAnswers, quizQuestions);
      setQuizResult(result);
      localStorage.setItem("major_quiz_result", JSON.stringify(result));
      localStorage.setItem("major_quiz_answers", JSON.stringify(quizAnswers));

      const careerMatches = generateCareerMatches(currentUser.major, result);
      saveCareerMatches(careerMatches);

      const skills: Skill[] = Object.entries(result.skillScores).map(([skillName, data]) => ({
        id: `skill-${skillName}`,
        name: skillName,
        category: "hard" as const,
        level: getLevelFromScore(data.correct, data.total),
      }));
      setResultSkills(skills);

      addNotification({
        text: `${currentUser.name} menyelesaikan asesmen dengan skor tes jurusan: ${result.score}%`,
        type: "assessment_done",
        targetRole: "admin",
      });
      window.dispatchEvent(new CustomEvent("notifications-updated"));
    }
    setCurrentStep(step);
  };

  return (
    <div>
      <DashboardHeader title="Know Yourself" subtitle="Asesmen kemampuan skill kamu" />

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > i + 1
                    ? "bg-emerald-500 text-white"
                    : currentStep === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {currentStep > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] sm:text-xs text-center ${currentStep === i + 1 ? "font-medium text-foreground" : "text-muted"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Welcome */}
      {currentStep === 1 && (
        <Card className="text-center py-8 sm:py-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Selamat datang, {currentUser.name}!</h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            Asesmen ini akan memetakan kemampuan skill kamu melalui tes pengetahuan jurusan.
            Hasil tes akan menentukan level skill hard skill kamu secara objektif.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg px-4 py-2 text-center">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300">100 Soal Tes Jurusan</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">{currentUser.major}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg px-4 py-2 text-center">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">10 Soal per Hard Skill</p>
            </div>
          </div>
          <p className="text-xs text-muted text-center mb-8">
            Gunakan tab jurusan (RPL, DKV, TKJ, Transmisi) untuk menampilkan soal per bidang, atau pilih {"Semua"} untuk seluruh bank soal (400 soal).
          </p>
          <button
            onClick={() => goToStep(2)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            Mulai Asesmen <ChevronRight className="w-4 h-4" />
          </button>
        </Card>
      )}

      {/* Step 2: Major Quiz */}
      {currentStep === 2 && quizLoaded && (
        <div className="animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tes Pengetahuan Jurusan</h2>
              <p className="text-sm text-muted">{quizTitle} — {quizQuestions.length} soal dari dasar hingga ahli</p>
            </div>
            <Badge variant="primary">{quizProgress}/{quizQuestions.length} soal</Badge>
          </div>

          {/* Major filter tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {MAJOR_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => switchTab(t.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedTab === t.key
                    ? "bg-primary text-white shadow"
                    : "bg-card border border-border text-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Skill nav pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[...new Set(quizQuestions.map((q) => q.skill))].map((skill) => {
              const qs = quizQuestions.filter((q) => q.skill === skill);
              const answered = qs.filter((q) => quizAnswers[q.id] !== undefined).length;
              return (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-muted">
                  {skill}: {answered}/{qs.length}
                </span>
              );
            })}
          </div>

          {/* Question progress */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-6">
            <div
              className="bg-primary rounded-full h-1.5 transition-all duration-300"
              style={{ width: `${((quizCurrent + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {(() => {
            const q = quizQuestions[quizCurrent];
            const selectedAnswer = quizAnswers[q.id];
            return (
              <Card className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    Soal {quizCurrent + 1}/{quizQuestions.length}
                  </span>
                  <Badge variant={difficultyColor[q.difficulty]} className="text-[10px]">
                    {difficultyLabel[q.difficulty]}
                  </Badge>
                  <Badge variant="default" className="text-[10px]">{q.skill}</Badge>
                </div>
                <p className="font-medium text-foreground mb-4">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(q.id, i)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-colors ${
                        selectedAnswer === i
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-foreground hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </Card>
            );
          })()}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                if (quizCurrent > 0) setQuizCurrent(quizCurrent - 1);
                else if (isRetake) window.location.href = "/student/roadmap";
                else goToStep(1);
              }}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> {quizCurrent > 0 ? "Sebelumnya" : "Kembali"}
            </button>
            <div className="flex gap-2">
              {quizCurrent < quizQuestions.length - 1 ? (
                <button
                  onClick={() => setQuizCurrent(quizCurrent + 1)}
                  disabled={quizAnswers[quizQuestions[quizCurrent].id] === undefined}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => goToStep(3)}
                  disabled={!quizComplete}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selesai & Lihat Hasil <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {currentStep === 3 && (resultSkills.length > 0 || quizResult) && (
        <div className="animate-fade-in">
          <Card className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Asesmen Selesai!</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Skill profile kamu sudah berhasil dibuat berdasarkan hasil tes.
                </p>
              </div>
            </div>
          </Card>

          {/* Quiz Result Summary */}
          {quizResult && (
            <Card className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Hasil Tes Jurusan — {currentUser.major}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-primary">{quizResult.score}%</p>
                  <p className="text-xs text-muted mt-1">Skor</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-foreground">{quizResult.level}/5</p>
                  <p className="text-xs text-muted mt-1">Level</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-500">
                    {Object.values(quizResult.skillScores).filter((s) => s.correct === s.total).length}
                  </p>
                  <p className="text-xs text-muted mt-1">Skill Dikuasai</p>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(quizResult.skillScores).map(([skill, data]) => {
                  const level = getLevelFromScore(data.correct, data.total);
                  return (
                    <div key={skill} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(data.correct / data.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-muted w-10 text-right">{data.correct}/{data.total}</span>
                        <Badge variant={getLevelColor(level)} className="text-[10px]">
                          {getLevelLabel(level)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <SkillRadar skills={resultSkills} title="Skill Profile Kamu" />
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground mb-4">Ringkasan Skill</h3>
              <div className="space-y-3">
                {resultSkills
                  .sort((a, b) => b.level - a.level)
                  .map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${skill.level >= 4 ? "bg-emerald-500" : skill.level >= 3 ? "bg-amber-400" : "bg-red-400"}`} />
                        <span className="text-sm text-foreground">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${
                                i <= skill.level ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant={getLevelColor(skill.level)} className="text-[10px]">
                          {getLevelLabel(skill.level)}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setCurrentStep(isRetake ? 2 : 1);
                setQuizAnswers({});
                setQuizCurrent(0);
                setQuizResult(null);
                setResultSkills([]);
              }}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Ulangi Asesmen
            </button>
            <Link
              href="/student/career-match"
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              Lanjut ke Career Match <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
