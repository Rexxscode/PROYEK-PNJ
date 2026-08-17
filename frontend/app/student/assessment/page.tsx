"use client";

import { useState } from "react";
import { ClipboardCheck, ChevronRight, ChevronLeft, CheckCircle2, Sparkles } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import SkillRadar from "../../components/charts/skillradar";
import DashboardHeader from "../../components/layout/dashboardheader";
import { hardSkills, softSkills, currentUser } from "../../lib/mock-data";
import type { Skill, AssessmentAnswer } from "../../lib/type";

const totalSteps = 4;

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [resultSkills, setResultSkills] = useState<Skill[]>([]);

  const hardSkillAnswers = answers.filter((a) =>
    hardSkills.some((s) => s.id === a.skillId)
  );
  const softSkillAnswers = answers.filter((a) =>
    softSkills.some((s) => s.id === a.skillId)
  );

  const hardProgress = hardSkills.length > 0 ? (hardSkillAnswers.length / hardSkills.length) * 100 : 0;
  const softProgress = softSkills.length > 0 ? (softSkillAnswers.length / softSkills.length) * 100 : 0;

  const handleAnswer = (skillId: string, level: number) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.skillId === skillId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { skillId, level };
        return updated;
      }
      return [...prev, { skillId, level }];
    });
  };

  const goToStep = (step: number) => {
    if (step === 4) {
      const skills: Skill[] = [
        ...hardSkills.map((s) => {
          const answer = answers.find((a) => a.skillId === s.id);
          return { ...s, level: answer?.level || 0 };
        }),
        ...softSkills.map((s) => {
          const answer = answers.find((a) => a.skillId === s.id);
          return { ...s, level: answer?.level || 0 };
        }),
      ].filter((s) => s.level > 0);
      setResultSkills(skills);
    }
    setCurrentStep(step);
  };

  const getLevelLabel = (level: number): string => {
    const labels = ["", "Belum", "Dasar", "Menengah", "Mahir", "Ahli"];
    return labels[level] || "";
  };

  const getLevelColor = (level: number): "danger" | "warning" | "default" | "primary" | "success" => {
    if (level <= 1) return "danger";
    if (level <= 2) return "warning";
    if (level <= 3) return "default";
    if (level <= 4) return "primary";
    return "success";
  };

  return (
    <div>
      <DashboardHeader
        title="Know Yourself"
        subtitle="Asesmen kemampuan skill kamu"
      />

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {["Selamat Datang", "Hard Skill", "Soft Skill", "Hasil"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > i + 1
                    ? "bg-emerald-500 text-white"
                    : currentStep === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${currentStep === i + 1 ? "font-medium text-foreground" : "text-muted"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Welcome */}
      {currentStep === 1 && (
        <Card className="text-center py-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Selamat datang, {currentUser.name}!</h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            Asesmen ini akan membantu memetakan kemampuan skill kamu saat ini.
            Jawab dengan jujur untuk hasil yang akurat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <div className="bg-blue-50 rounded-lg px-4 py-2">
              <p className="text-sm font-medium text-blue-700">{hardSkills.length} Hard Skills</p>
            </div>
            <div className="bg-purple-50 rounded-lg px-4 py-2">
              <p className="text-sm font-medium text-purple-700">{softSkills.length} Soft Skills</p>
            </div>
          </div>
          <button
            onClick={() => goToStep(2)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            Mulai Asesmen <ChevronRight className="w-4 h-4" />
          </button>
        </Card>
      )}

      {/* Step 2: Hard Skills */}
      {currentStep === 2 && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Hard Skills Assessment</h2>
              <p className="text-sm text-muted">Beri penilaian pada skill teknis yang kamu kuasai</p>
            </div>
            <Badge variant="primary">{Math.round(hardProgress)}% selesai</Badge>
          </div>
          <div className="space-y-3">
            {hardSkills.map((skill) => {
              const answer = answers.find((a) => a.skillId === skill.id);
              return (
                <Card key={skill.id} className="!p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{skill.name}</p>
                      {answer && (
                        <Badge variant={getLevelColor(answer.level)} className="mt-1">
                          {getLevelLabel(answer.level)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleAnswer(skill.id, level)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                            answer?.level === level
                              ? "bg-primary text-white scale-110 shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => goToStep(1)}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
            <button
              onClick={() => goToStep(3)}
              disabled={hardProgress < 100}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lanjut <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Soft Skills */}
      {currentStep === 3 && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Soft Skills Assessment</h2>
              <p className="text-sm text-muted">Beri penilaian pada kemampuan non-teknis kamu</p>
            </div>
            <Badge variant="secondary">{Math.round(softProgress)}% selesai</Badge>
          </div>
          <div className="space-y-3">
            {softSkills.map((skill) => {
              const answer = answers.find((a) => a.skillId === skill.id);
              return (
                <Card key={skill.id} className="!p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{skill.name}</p>
                      {answer && (
                        <Badge variant={getLevelColor(answer.level)} className="mt-1">
                          {getLevelLabel(answer.level)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleAnswer(skill.id, level)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                            answer?.level === level
                              ? "bg-secondary text-white scale-110 shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => goToStep(2)}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>
            <button
              onClick={() => goToStep(4)}
              disabled={softProgress < 100}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lihat Hasil <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {currentStep === 4 && resultSkills.length > 0 && (
        <div className="animate-fade-in">
          <Card className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="font-semibold text-emerald-800">Asesmen Selesai!</h3>
                <p className="text-sm text-emerald-600">
                  Skill profile kamu sudah berhasil dibuat. Lihat hasilnya di bawah.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
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
                                i <= skill.level ? "bg-primary" : "bg-gray-200"
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
                setCurrentStep(1);
                setAnswers([]);
                setResultSkills([]);
              }}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Ulangi Asesmen
            </button>
            <a
              href="/student/career-match"
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              Lanjut ke Career Match <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}