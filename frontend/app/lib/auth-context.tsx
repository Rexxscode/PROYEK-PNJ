"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api, setToken, removeToken, getToken } from "./api";
import { BACKEND_ENDPOINTS } from "./api-contract";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "industry";
  created_at: string;
  student?: {
    major: string;
    major_name: string;
    grade: string;
    card_status: "none" | "pending" | "approved";
    student_card?: string | null;
    avatar?: string | null;
  };
  industry?: {
    company_name: string;
    status: string;
  };
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

interface MeResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (data: RegisterData) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: "student" | "industry";
  major?: string;
  grade?: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get<MeResponse>(BACKEND_ENDPOINTS.auth.me);
      setUser(res.data.user);
      try {
        if (res.data.user.role === "student") {
          localStorage.setItem("studentEmail", res.data.user.email);
        }
      } catch {}
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<LoginResponse>(BACKEND_ENDPOINTS.auth.login, {
      email,
      password,
    });
    setToken(res.data.token);
    setUser(res.data.user);
    try {
      if (res.data.user.role === "student") {
        localStorage.setItem("studentEmail", res.data.user.email);
      }
    } catch {}
    return res.data.user;
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await api.post<LoginResponse>(BACKEND_ENDPOINTS.auth.register, data);
    setToken(res.data.token);
    setUser(res.data.user);
    try {
      if (res.data.user.role === "student") {
        localStorage.setItem("studentEmail", res.data.user.email);
      }
    } catch {}
    return res.data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post(BACKEND_ENDPOINTS.auth.logout);
    } catch {
      // ignore logout errors
    }
    removeToken();
    setUser(null);
    try {
      const email = localStorage.getItem("studentEmail");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("profilePhoto");
      localStorage.removeItem("loggedUserRole");
      localStorage.removeItem("loggedUserName");
      localStorage.removeItem("loggedUserCompany");
      if (email) {
        const { clearAssessmentData } = await import("./major-roadmap");
        clearAssessmentData(email);
        localStorage.removeItem(`portfolio_projects_${email.toLowerCase()}`);
      }
      const variants = email ? [email, email.toLowerCase()] : [];
      const keysToClear: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          (key === "career_matches" ||
            key === "major_quiz_result" ||
            key === "major_quiz_answers" ||
            key === "roadmap_progress" ||
            key === "roadmap_resources_viewed" ||
            variants.some(
              (v) =>
                key.startsWith(`career_matches_${v}`) ||
                key.startsWith(`major_quiz_result_${v}`) ||
                key.startsWith(`major_quiz_answers_${v}`) ||
                key.startsWith(`roadmap_progress_${v}`) ||
                key.startsWith(`roadmap_resources_viewed_${v}`),
            ))
        ) {
          keysToClear.push(key);
        }
      }
      keysToClear.forEach((key) => localStorage.removeItem(key));
    } catch {}
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    await api.post(BACKEND_ENDPOINTS.auth.changePassword, {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPassword,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        changePassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
