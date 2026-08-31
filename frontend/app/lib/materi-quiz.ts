import type { QuizQuestion } from "./major-quiz";
import { rplMateriQuiz } from "./materi-quiz-rpl";
import { dkvMateriQuiz } from "./materi-quiz-dkv";
import { tkjMateriQuiz } from "./materi-quiz-tkj";
import { transmisiMateriQuiz } from "./materi-quiz-tt";

export const allMateriQuiz: Record<string, QuizQuestion[]> = {
  ...rplMateriQuiz,
  ...dkvMateriQuiz,
  ...tkjMateriQuiz,
  ...transmisiMateriQuiz,
};

const QUIZ_OVERRIDE_PREFIX = "quiz_overrides_";

export function getQuizStorageKey(materiId: string): string {
  return `${QUIZ_OVERRIDE_PREFIX}${materiId}`;
}

function readOverride(materiId: string): QuizQuestion[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(getQuizStorageKey(materiId));
    if (!raw) return null;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.length > 0 ? (arr as QuizQuestion[]) : null;
  } catch {
    return null;
  }
}

export function hasMateriQuizOverride(materiId: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getQuizStorageKey(materiId)) !== null;
}

export function saveMateriQuiz(materiId: string, questions: QuizQuestion[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getQuizStorageKey(materiId), JSON.stringify(questions));
}

export function resetMateriQuiz(materiId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getQuizStorageKey(materiId));
}

export function getQuizForMateri(materiId: string): QuizQuestion[] | null {
  const override = readOverride(materiId);
  if (override) return override;
  const quiz = allMateriQuiz[materiId];
  return quiz && quiz.length > 0 ? quiz : null;
}