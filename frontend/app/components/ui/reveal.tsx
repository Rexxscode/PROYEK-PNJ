"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay sebelum animasi (ms), untuk stagger berurutan. */
  delay?: number;
  /** Jika true, langsung tampil saat mount (tanpa menunggu scroll). Cocok hero. */
  whenVisible?: boolean;
  /** Arah masuk elemen. Default fade-up. */
  direction?: "up" | "left" | "right";
}

export default function Reveal({
  children,
  className,
  delay = 0,
  whenVisible = true,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!whenVisible) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [whenVisible]);

  return (
    <div
      ref={ref}
      className={cn(whenVisible ? "reveal" : "reveal-load", `reveal-${direction}`, className)}
      style={{ transitionDelay: whenVisible ? `${delay}ms` : undefined }}
      data-inview={inView || undefined}
    >
      {children}
    </div>
  );
}