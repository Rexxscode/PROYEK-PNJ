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

export function getQuizForMateri(materiId: string): QuizQuestion[] | null {
  const quiz = allMateriQuiz[materiId];
  return quiz && quiz.length > 0 ? quiz : null;
}