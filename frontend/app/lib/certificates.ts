import { PASS_THRESHOLD, QUESTIONS_PER_MATERI } from "./materi-catalog";

export interface CertificateResult {
  materiId: string;
  studentName: string;
  major: string;
  score: number;
  total: number;
  passed: boolean;
  date: string;
}

const storageKey = (email: string) => `certificate_results_${email}`;

export function getCertificateResults(email: string): Record<string, CertificateResult> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(storageKey(email));
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, CertificateResult>;
  } catch {
    return {};
  }
}

export function getCertificateResult(email: string, materiId: string): CertificateResult | null {
  return getCertificateResults(email)[materiId] || null;
}

export function saveCertificateResult(email: string, result: CertificateResult): void {
  if (typeof window === "undefined") return;
  const all = getCertificateResults(email);
  all[result.materiId] = result;
  localStorage.setItem(storageKey(email), JSON.stringify(all));
}

export function hasPassedMateri(email: string, materiId: string): boolean {
  const result = getCertificateResult(email, materiId);
  return !!result && result.passed;
}

export function isPassingScore(score: number, total: number): boolean {
  return total > 0 && score / total >= PASS_THRESHOLD;
}

export function getRequiredCorrect(): number {
  return Math.ceil(QUESTIONS_PER_MATERI * PASS_THRESHOLD);
}