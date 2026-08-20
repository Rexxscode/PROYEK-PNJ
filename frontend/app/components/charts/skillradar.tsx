"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type Plugin,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import type { Skill } from "../../lib/type";
import { useTheme } from "../../lib/theme-context";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function createCircularGridPlugin(gridColor: string): Plugin {
  return {
    id: "circularGrid",
    beforeDraw(chart) {
      const scale = chart.scales.r as RadialLinearScale;
      if (!scale) return;

      const ctx = chart.ctx;
      const cx = scale.xCenter;
      const cy = scale.yCenter;
      const maxVal = scale.max;
      const stepSize = Number(scale.options.ticks?.stepSize) || 1;
      const ticks: number[] = [];
      for (let v = stepSize; v <= maxVal; v += stepSize) {
        ticks.push(v);
      }

      ctx.save();
      ticks.forEach((v) => {
        const radius = scale.getDistanceFromCenterForValue(v);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.restore();
    },
  };
}

interface SkillRadarProps {
  skills: Skill[];
  title?: string;
  max?: number;
  color?: string;
}

const SkillRadar = memo(function SkillRadar({ skills, title, max = 5, color = "rgba(37, 99, 235, 0.8)" }: SkillRadarProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 0); return () => clearTimeout(t); }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const labelColor = isDark ? "#94a3b8" : "#475569";
  const gridColor = isDark ? "rgba(148,163,184,0.2)" : "rgba(226, 232, 240, 0.8)";
  const angleLineColor = isDark ? "rgba(148,163,184,0.15)" : "rgba(226, 232, 240, 0.5)";

  const circularPlugin = useMemo(() => createCircularGridPlugin(gridColor), [gridColor]);
  const plugins = useMemo(() => [circularPlugin], [circularPlugin]);

  const data = useMemo(
    () => ({
      labels: skills.map((s) => s.name),
      datasets: [
        {
          label: "Level Skill",
          data: skills.map((s) => s.level),
          backgroundColor: color.replace("0.8", "0.15"),
          borderColor: color,
          borderWidth: 2,
          pointBackgroundColor: color,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [skills, color]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: "easeOutQuart" as const,
      },
      plugins: {
        legend: { display: false },
      },
      scales: {
        r: {
          beginAtZero: true,
          max,
          ticks: {
            stepSize: max <= 10 ? 1 : Math.ceil(max / 5),
            display: false,
          },
          pointLabels: {
            font: { size: 11, family: "inherit" },
            color: labelColor,
          },
          grid: {
            color: "transparent",
          },
          angleLines: {
            color: angleLineColor,
          },
        },
      },
    }),
    [labelColor, angleLineColor, max]
  );

  if (!ready) return <div className="h-64" />;

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-64">
        <Radar key={theme} data={data} options={options} plugins={plugins} />
      </div>
    </div>
  );
});

export default SkillRadar;
