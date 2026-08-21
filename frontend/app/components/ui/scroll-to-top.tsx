"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    const onSidebar = (e: Event) => setSidebarOpen((e as CustomEvent).detail.open);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("sidebar-toggle", onSidebar);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("sidebar-toggle", onSidebar);
    };
  }, []);

  if (!visible || sidebarOpen) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed top-20 left-1/2 -translate-x-1/2 z-50 p-2 sm:p-2.5 rounded-full",
        "bg-primary text-white shadow-lg shadow-primary/25",
        "hover:bg-primary-dark hover:shadow-xl transition-all",
        "animate-fade-in"
      )}
    >
      <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
    </button>
  );
}
