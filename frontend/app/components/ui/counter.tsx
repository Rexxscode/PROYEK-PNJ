"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  /** Nilai akhir yang dituju. */
  to: number;
  /** Sufiks seperti "+" atau "%". */
  suffix?: string;
  /** Durasi animasi dalam detik. */
  duration?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Counter({ to, suffix = "", duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / (duration * 1000), 1);
        const eased = easeOutCubic(progress);
        setValue(Math.round(eased * to));
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    if (reduced) {
      setValue(to);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}