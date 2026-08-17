"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import type { Skill } from "../../lib/type";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SkillRadarProps {
  skills: Skill[];
  title?: string;
}

export default function SkillRadar({ skills, title }: SkillRadarProps) {
  const data = {
    labels: skills.map((s) => s.name),
    datasets: [
      {
        label: "Level Skill",
        data: skills.map((s) => s.level),
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        borderColor: "rgba(37, 99, 235, 0.8)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(37, 99, 235, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          display: false,
        },
        pointLabels: {
          font: { size: 11, family: "inherit" },
          color: "#64748b",
        },
        grid: {
          color: "rgba(226, 232, 240, 0.8)",
        },
        angleLines: {
          color: "rgba(226, 232, 240, 0.5)",
        },
      },
    },
  };

  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>}
      <div className="h-64">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}