"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning" | "danger";
  animate?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const colorStyles = {
  primary: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-400",
  danger: "bg-red-500",
};

export default function ProgressBar({
  value,
  label,
  showValue = true,
  size = "md",
  color = "primary",
  animate = false,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const [mounted, setMounted] = useState(!animate);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(t);
    }
  }, [animate]);

  const displayValue = mounted ? clampedValue : 0;

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showValue && <span className="text-sm font-semibold text-foreground">{mounted ? clampedValue : 0}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", sizeStyles[size])}>
        <div
          className={cn("rounded-full transition-all duration-700 ease-out", sizeStyles[size], colorStyles[color])}
          style={{ width: `${displayValue}%` }}
        />
      </div>
    </div>
  );
}