"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const themeRef = useRef<Theme>("light");
  const transitionRef = useRef<{
    finished: Promise<void>;
    ready: Promise<void>;
    skipTransition: () => void;
  } | null>(null);

  const applyTheme = useCallback((next: Theme) => {
    themeRef.current = next;
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    applyTheme(initial);
    setTheme(initial);
    setMounted(true);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const next = themeRef.current === "light" ? "dark" : "light";

    if (typeof document === "undefined" || !("startViewTransition" in document)) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    // Batalkan transisi yang sedang berjalan agar tidak terjadi tabrakan saat toggle cepat.
    const prev = transitionRef.current;
    try {
      prev?.skipTransition();
    } catch {
      // Abaikan bila transisi sudah selesai/dibatalkan.
    }

    const viewTransition = (
      document as unknown as {
        startViewTransition: (fn: () => void) => {
          finished: Promise<void>;
          ready: Promise<void>;
          skipTransition: () => void;
        };
      }
    ).startViewTransition(() => applyTheme(next));

    transitionRef.current = viewTransition;

    // Tangkap rejection dari transisi yang dibatalkan ("Transition was skipped" / AbortError)
    // di finished & ready agar tidak menjadi unhandled promise rejection.
    if (prev) {
      prev.finished.catch(() => {});
      prev.ready.catch(() => {});
    }
    viewTransition.finished.catch(() => {});
    viewTransition.ready.catch(() => {});

    setTheme(next);
  }, [applyTheme]);

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
