import type { CareerMatch } from "./type";
import type { QuizResult } from "./major-quiz";

interface CareerDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: { name: string; requiredLevel: number }[];
}

const rplCareers: CareerDefinition[] = [
  { id: "rpl-cm-01", title: "Backend Developer", description: "Mengembangkan server-side application, API, dan database.", category: "Software Engineering", requiredSkills: [{ name: "Node.js", requiredLevel: 4 }, { name: "Express.js", requiredLevel: 4 }, { name: "SQL/Database", requiredLevel: 4 }, { name: "REST API", requiredLevel: 4 }] },
  { id: "rpl-cm-02", title: "Fullstack Developer", description: "Mengembangkan aplikasi web end-to-end frontend hingga backend.", category: "Software Engineering", requiredSkills: [{ name: "React/Next.js", requiredLevel: 4 }, { name: "Node.js", requiredLevel: 4 }, { name: "TypeScript", requiredLevel: 3 }, { name: "SQL/Database", requiredLevel: 3 }] },
  { id: "rpl-cm-03", title: "Frontend Developer", description: "Membangun antarmuka pengguna responsif dan interaktif.", category: "Software Engineering", requiredSkills: [{ name: "React/Next.js", requiredLevel: 5 }, { name: "TypeScript", requiredLevel: 4 }, { name: "HTML/CSS", requiredLevel: 5 }, { name: "JavaScript", requiredLevel: 5 }] },
  { id: "rpl-cm-04", title: "DevOps Engineer", description: "Mengelola infrastruktur, CI/CD, dan deployment.", category: "Infrastructure", requiredSkills: [{ name: "Docker", requiredLevel: 5 }, { name: "Git", requiredLevel: 5 }, { name: "CI/CD", requiredLevel: 4 }, { name: "Linux Basics", requiredLevel: 3 }] },
  { id: "rpl-cm-05", title: "Mobile App Developer", description: "Membangun aplikasi mobile cross-platform dengan Flutter atau React Native.", category: "Software Engineering", requiredSkills: [{ name: "React Native", requiredLevel: 4 }, { name: "JavaScript", requiredLevel: 4 }, { name: "REST API", requiredLevel: 3 }, { name: "Mobile UI/UX", requiredLevel: 3 }] },
];

const dkvCareers: CareerDefinition[] = [
  { id: "dkv-cm-01", title: "UI/UX Designer", description: "Merancang antarmuka pengguna yang intuitif dan user-friendly.", category: "Design", requiredSkills: [{ name: "UI/UX Design", requiredLevel: 5 }, { name: "Figma", requiredLevel: 5 }, { name: "Adobe Photoshop", requiredLevel: 3 }] },
  { id: "dkv-cm-02", title: "Graphic Designer", description: "Membuat visual branding, marketing material, dan ilustrasi.", category: "Design", requiredSkills: [{ name: "Adobe Photoshop", requiredLevel: 5 }, { name: "Adobe Illustrator", requiredLevel: 5 }, { name: "UI/UX Design", requiredLevel: 2 }] },
  { id: "dkv-cm-03", title: "Motion Graphics Designer", description: "Membuat animasi dan video motion graphics untuk konten digital.", category: "Design", requiredSkills: [{ name: "Adobe Photoshop", requiredLevel: 4 }, { name: "Adobe Illustrator", requiredLevel: 3 }, { name: "UI/UX Design", requiredLevel: 3 }] },
  { id: "dkv-cm-04", title: "Brand Identity Designer", description: "Merancang identitas visual merek dan guidelines.", category: "Design", requiredSkills: [{ name: "Adobe Illustrator", requiredLevel: 5 }, { name: "Adobe Photoshop", requiredLevel: 4 }, { name: "UI/UX Design", requiredLevel: 4 }] },
  { id: "dkv-cm-05", title: "Product Designer", description: "Mendesain produk digital dari riset hingga prototype interaktif.", category: "Design", requiredSkills: [{ name: "Figma", requiredLevel: 5 }, { name: "UI/UX Design", requiredLevel: 5 }, { name: "Adobe Photoshop", requiredLevel: 3 }] },
];

const tkjCareers: CareerDefinition[] = [
  { id: "tkj-cm-01", title: "System Administrator", description: "Mengelola server, sistem operasi, dan infrastruktur IT.", category: "IT Infrastructure", requiredSkills: [{ name: "Linux Administration", requiredLevel: 4 }, { name: "Docker", requiredLevel: 3 }, { name: "Cloud (AWS/GCP)", requiredLevel: 3 }] },
  { id: "tkj-cm-02", title: "Network Administrator", description: "Mengelola dan mengamankan jaringan perusahaan.", category: "IT Infrastructure", requiredSkills: [{ name: "Networking", requiredLevel: 5 }, { name: "Cisco Networking", requiredLevel: 4 }, { name: "MikroTik", requiredLevel: 3 }] },
  { id: "tkj-cm-03", title: "Cloud Engineer", description: "Mengelola infrastruktur cloud, deployment, dan scaling.", category: "Cloud", requiredSkills: [{ name: "Cloud (AWS/GCP)", requiredLevel: 5 }, { name: "Docker", requiredLevel: 4 }, { name: "Linux Administration", requiredLevel: 3 }] },
  { id: "tkj-cm-04", title: "Cybersecurity Analyst", description: "Melindungi sistem dari serangan dan melakukan forensik digital.", category: "Security", requiredSkills: [{ name: "Cybersecurity Basics", requiredLevel: 5 }, { name: "Linux Administration", requiredLevel: 4 }, { name: "Networking", requiredLevel: 3 }] },
  { id: "tkj-cm-05", title: "IT Support Specialist", description: "Troubleshooting hardware, software, dan user support.", category: "IT Support", requiredSkills: [{ name: "Networking", requiredLevel: 3 }, { name: "Linux Administration", requiredLevel: 3 }, { name: "Cybersecurity Basics", requiredLevel: 2 }] },
];

const transmisiCareers: CareerDefinition[] = [
  { id: "tt-cm-01", title: "Network Engineer", description: "Mengelola dan memelihara infrastruktur jaringan backbone.", category: "Networking", requiredSkills: [{ name: "Networking Basics", requiredLevel: 5 }, { name: "Fiber Optics", requiredLevel: 4 }, { name: "Radio Frequency", requiredLevel: 3 }] },
  { id: "tt-cm-02", title: "Telecom Technician", description: "Instalasi dan maintenance sistem telekomunikasi.", category: "Telecom", requiredSkills: [{ name: "Fiber Optics", requiredLevel: 5 }, { name: "Networking Basics", requiredLevel: 4 }, { name: "Radio Frequency", requiredLevel: 3 }] },
  { id: "tt-cm-03", title: "NOC Analyst", description: "Monitoring dan troubleshooting jaringan 24/7.", category: "Networking", requiredSkills: [{ name: "Networking Basics", requiredLevel: 4 }, { name: "Fiber Optics", requiredLevel: 3 }, { name: "Radio Frequency", requiredLevel: 3 }] },
  { id: "tt-cm-04", title: "RF Engineer", description: "Perencanaan dan optimasi radio link wireless.", category: "Radio", requiredSkills: [{ name: "Radio Frequency", requiredLevel: 5 }, { name: "Networking Basics", requiredLevel: 4 }, { name: "Fiber Optics", requiredLevel: 2 }] },
  { id: "tt-cm-05", title: "Fiber Optic Specialist", description: "Instalasi, splicing, dan testing kabel fiber optik.", category: "Fiber", requiredSkills: [{ name: "Fiber Optics", requiredLevel: 5 }, { name: "Networking Basics", requiredLevel: 3 }, { name: "Radio Frequency", requiredLevel: 2 }] },
];

const careerMap: Record<string, CareerDefinition[]> = {
  "Rekayasa Perangkat Lunak": rplCareers,
  "Desain Komunikasi Visual": dkvCareers,
  "Teknik Jaringan, Komputer, dan Telekomunikasi": [...tkjCareers, ...transmisiCareers],
};

const shortCodeToMajorName: Record<string, string> = {
  RPL: "Rekayasa Perangkat Lunak",
  DKV: "Desain Komunikasi Visual",
  TJKT: "Teknik Jaringan, Komputer, dan Telekomunikasi",
};

function normalizeMajorKey(major: string): string {
  return shortCodeToMajorName[major] || major;
}

function skillNameToScore(skillScores: Record<string, { correct: number; total: number }>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [skill, scores] of Object.entries(skillScores)) {
    result[skill] = scores.total > 0 ? scores.correct / scores.total : 0;
  }
  return result;
}

function levelFromScore(ratio: number): number {
  if (ratio >= 0.9) return 5;
  if (ratio >= 0.7) return 4;
  if (ratio >= 0.5) return 3;
  if (ratio >= 0.3) return 2;
  return 1;
}

export function generateCareerMatches(major: string, quizResult: QuizResult): CareerMatch[] {
  const normalizedMajor = normalizeMajorKey(major);
  const careers = careerMap[normalizedMajor] || rplCareers;
  const skillRatios = skillNameToScore(quizResult.skillScores);

  const matches: CareerMatch[] = careers.map((career) => {
    let totalMatch = 0;
    let totalReadiness = 0;
    const skillGaps: { name: string; current: number; required: number }[] = [];

    const requiredSkills = career.requiredSkills.map((req) => {
      const ratio = skillRatios[req.name] ?? 0;
      const currentLevel = levelFromScore(ratio);
      const matchForSkill = Math.min(currentLevel / req.requiredLevel, 1);
      totalMatch += matchForSkill;

      const readinessForSkill = currentLevel / 5;
      totalReadiness += readinessForSkill;

      if (currentLevel < req.requiredLevel) {
        skillGaps.push({ name: req.name, current: currentLevel, required: req.requiredLevel });
      }

      return {
        id: `skill-${req.name}`,
        name: req.name,
        category: "hard" as const,
        level: currentLevel,
      };
    });

    const matchPercentage = Math.round((totalMatch / career.requiredSkills.length) * 100);
    const readinessScore = Math.round((totalReadiness / career.requiredSkills.length) * 100);

    return {
      id: career.id,
      title: career.title,
      description: career.description,
      matchPercentage,
      readinessScore,
      requiredSkills,
      skillGaps,
      category: career.category,
    };
  });

  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  return matches;
}

function getUserEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("studentEmail") || "";
}

export function loadCareerMatches(): CareerMatch[] | null {
  if (typeof window === "undefined") return null;
  const email = getUserEmail();
  const key = email ? `career_matches_${email}` : "career_matches";
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as CareerMatch[];
  } catch {}
  return null;
}

export function saveCareerMatches(matches: CareerMatch[]): void {
  if (typeof window === "undefined") return;
  const email = getUserEmail();
  const key = email ? `career_matches_${email}` : "career_matches";
  localStorage.setItem(key, JSON.stringify(matches));
}
