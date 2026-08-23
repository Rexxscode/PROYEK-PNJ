/**
 * API Service Layer
 * 
 * Semua panggilan data melewati file ini.
 * Untuk backend: ganti BASE_URL dan implementasikan endpoint sesuai contract di bawah.
 * 
 * ===== ENDPOINT CONTRACT =====
 * 
 * Auth:
 *   POST /api/auth/login          { email, password }           → { token, user: UserProfile }
 *   POST /api/auth/register       { name, email, password, major, grade } → { token, user: UserProfile }
 *   GET  /api/auth/me             (header: Authorization)       → { user: UserProfile }
 * 
 * Students:
 *   GET    /api/students                  → UserProfile[]
 *   GET    /api/students/:id              → { profile, hardSkills, softSkills, careerMatches, skillGaps, roadmapMilestones, projects, jobOpportunities }
 *   PUT    /api/students/:id              (body: partial UserProfile) → UserProfile
 *   GET    /api/students/:id/portfolio    → Portfolio
 *   POST   /api/students/:id/assessment   (body: AssessmentAnswer[]) → { careerMatches, skillGaps }
 *   GET    /api/students/:id/roadmap      → RoadmapMilestone[]
 *   PUT    /api/students/:id/roadmap/:milestoneId  (body: { status }) → RoadmapMilestone
 * 
 * Jobs:
 *   GET    /api/jobs                       → JobOpportunity[]
 *   POST   /api/jobs                       (body: job data) → JobOpportunity
 *   PUT    /api/jobs/:id                   (body: job data) → JobOpportunity
 *   DELETE /api/jobs/:id                   → { success: boolean }
 * 
 * Industry:
 *   GET    /api/industry/candidates        → { candidates: UserProfile[], skills: string[] }
 *   GET    /api/industry/stats             → { totalCandidates, matched, activeJobs, avgMatch }
 * 
 * Admin:
 *   GET    /api/admin/stats                → StudentStats
 *   GET    /api/admin/students             → UserProfile[]
 *   GET    /api/admin/notifications        → Notification[]
 *   POST   /api/admin/notifications        → { success: boolean }
 * 
 * Notifications:
 *   GET    /api/notifications              → Notification[]
 *   PUT    /api/notifications/:id/read     → { success: boolean }
 *   PUT    /api/notifications/read-all     → { success: boolean }
 * 
 * Portfolio (public):
 *   GET    /api/portfolio/:slug            → Portfolio
 * 
 * ===== AUTH HEADER =====
 *   Authorization: Bearer <token>
 */

const BASE_URL = "http://localhost:8000"; // URL backend Laravel

// ===== TOKEN STORAGE =====
const TOKEN_KEY = "auth_token";

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

interface FetchOptions extends RequestInit {
  token?: string;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }
  return res.json();
}

// ===== AUTH =====
export const authAPI = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; user: import("./type").UserProfile }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (data: { name: string; email: string; password: string; major: string; grade: string }) =>
    apiFetch<{ token: string; user: import("./type").UserProfile }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: (token: string) =>
    apiFetch<{ user: import("./type").UserProfile }>("/api/auth/me", { token }),
};

// ===== STUDENTS =====
export const studentAPI = {
  getAll: (token: string) =>
    apiFetch<import("./type").UserProfile[]>("/api/students", { token }),

  getById: (id: string, token: string) =>
    apiFetch<import("./mock-data").StudentData>(`/api/students/${id}`, { token }),

  update: (id: string, data: Partial<import("./type").UserProfile>, token: string) =>
    apiFetch<import("./type").UserProfile>(`/api/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      token,
    }),

  getPortfolio: (id: string, token: string) =>
    apiFetch<import("./type").Portfolio>(`/api/students/${id}/portfolio`, { token }),

  submitAssessment: (id: string, answers: import("./type").AssessmentAnswer[], token: string) =>
    apiFetch<{ careerMatches: import("./type").CareerMatch[]; skillGaps: import("./type").SkillGap[] }>(
      `/api/students/${id}/assessment`, { method: "POST", body: JSON.stringify(answers), token }
    ),

  getRoadmap: (id: string, token: string) =>
    apiFetch<import("./type").RoadmapMilestone[]>(`/api/students/${id}/roadmap`, { token }),

  updateMilestone: (id: string, milestoneId: string, data: { status: string }, token: string) =>
    apiFetch<import("./type").RoadmapMilestone>(`/api/students/${id}/roadmap/${milestoneId}`, {
      method: "PUT", body: JSON.stringify(data), token
    }),
};

// ===== JOBS =====
export const jobAPI = {
  getAll: (token?: string) =>
    apiFetch<import("./type").JobOpportunity[]>("/api/jobs", { token }),

  create: (data: Omit<import("./type").JobOpportunity, "id" | "postedAt" | "matchPercentage" | "companyLogo">, token: string) =>
    apiFetch<import("./type").JobOpportunity>("/api/jobs", {
      method: "POST", body: JSON.stringify(data), token
    }),

  update: (id: string, data: Partial<import("./type").JobOpportunity>, token: string) =>
    apiFetch<import("./type").JobOpportunity>(`/api/jobs/${id}`, {
      method: "PUT", body: JSON.stringify(data), token
    }),

  delete: (id: string, token: string) =>
    apiFetch<{ success: boolean }>(`/api/jobs/${id}`, { method: "DELETE", token }),
};

// ===== INDUSTRY =====
export const industryAPI = {
  getCandidates: (token: string) =>
    apiFetch<{ candidates: import("./type").UserProfile[]; skills: string[] }>("/api/industry/candidates", { token }),

  getStats: (token: string) =>
    apiFetch<{ totalCandidates: number; matched: number; activeJobs: number; avgMatch: number }>("/api/industry/stats", { token }),
};

// ===== ADMIN =====
export const adminAPI = {
  getStats: (token: string) =>
    apiFetch<import("./type").StudentStats>("/api/admin/stats", { token }),

  getStudents: (token: string) =>
    apiFetch<import("./type").UserProfile[]>("/api/admin/students", { token }),
};

// ===== NOTIFICATIONS =====
export const notificationAPI = {
  getAll: (token: string) =>
    apiFetch<import("./notifications").AppNotification[]>("/api/notifications", { token }),

  markAsRead: (id: string, token: string) =>
    apiFetch<{ success: boolean }>(`/api/notifications/${id}/read`, { method: "PUT", token }),

  markAllAsRead: (token: string) =>
    apiFetch<{ success: boolean }>("/api/notifications/read-all", { method: "PUT", token }),

  create: (data: { text: string; type: string; targetRole: string }, token: string) =>
    apiFetch<{ success: boolean }>("/api/notifications", {
      method: "POST", body: JSON.stringify(data), token
    }),
};

// ===== PORTFOLIO (PUBLIC) =====
export const portfolioAPI = {
  getBySlug: (slug: string) =>
    apiFetch<import("./type").Portfolio>(`/api/portfolio/${slug}`),
};
