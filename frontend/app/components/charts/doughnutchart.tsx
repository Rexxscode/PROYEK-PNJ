"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "../../lib/theme-context";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  title?: string;
  colors?: string[];
  centerLabel?: string;
}

const defaultColors = [
  "#2563eb", "#7c3aed", "#06b6d4", "#10b981",
  "#f59e0b", "#ef4444", "#ec4899", "#6366f1",
];

const DoughnutChart = memo(function DoughnutChart({
  labels,
  data,
  title,
  colors = defaultColors,
  centerLabel,
}: DoughnutChartProps) {
  const [ready, setReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  const isDark = theme === "dark";
  const legendColor = isDark ? "#94a3b8" : "#475569";
  const tooltipBg = isDark ? "#1e293b" : "#0f172a";

  const centerPlugin = useMemo(() => {
    if (!centerLabel) return [];
    return [
      {
        id: "centerText" as const,
        beforeDraw(chart: any) {
          const { ctx, width, height } = chart;
          ctx.save();
          ctx.font = "bold 20px system-ui, sans-serif";
          ctx.fillStyle = isDark ? "#e2e8f0" : "#0f172a";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(centerLabel, width / 2, height / 2);
          ctx.restore();
        },
      },
    ];
  }, [centerLabel, isDark]);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labels, data, colors]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1200,
        easing: "easeOutQuart" as const,
      },
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 12,
            usePointStyle: true,
            pointStyle: "circle" as const,
            font: { size: 11 },
            color: legendColor,
          },
        },
        tooltip: {
          backgroundColor: tooltipBg,
          titleColor: "#f8fafc",
          bodyColor: "#cbd5e1",
          padding: 10,
          cornerRadius: 8,
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
        },
      },
    }),
    [legendColor, tooltipBg]
  );

  if (!ready) return <div className="h-56" />;

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-56 flex items-center justify-center min-w-0 w-full">
        <Doughnut key={theme} data={chartData} plugins={centerPlugin} options={options} />
      </div>
    </div>
  );
});

export default DoughnutChart;
