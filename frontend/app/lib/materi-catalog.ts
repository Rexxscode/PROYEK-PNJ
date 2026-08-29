export interface Materi {
  id: string;
  title: string;
  description: string;
  major: string;
  skills: string[];
  icon: string;
}

export const PASS_THRESHOLD = 0.8;
export const QUESTIONS_PER_MATERI = 20;

export const MAJORS: { name: string; short: string }[] = [
  { name: "Rekayasa Perangkat Lunak", short: "RPL" },
  { name: "Desain Komunikasi Visual", short: "DKV" },
  { name: "Teknik Komputer dan Jaringan", short: "TKJ" },
  { name: "Teknik Transmisi", short: "Transmisi" },
];

export const materiList: Materi[] = [
  // ── Rekayasa Perangkat Lunak ────────────────────────────────────────────
  {
    id: "rpl-fullstack",
    title: "Fullstack Developer",
    description: "Mengembangkan aplikasi web end-to-end frontend hingga backend.",
    major: "Rekayasa Perangkat Lunak",
    skills: ["React/Next.js", "Node.js", "TypeScript", "SQL/Database"],
    icon: "layers",
  },
  {
    id: "rpl-frontend",
    title: "Frontend Developer",
    description: "Membangun antarmuka pengguna responsif dan interaktif.",
    major: "Rekayasa Perangkat Lunak",
    skills: ["React/Next.js", "TypeScript", "HTML/CSS", "JavaScript"],
    icon: "monitor",
  },
  {
    id: "rpl-backend",
    title: "Backend Developer",
    description: "Mengembangkan server-side application, API, dan database.",
    major: "Rekayasa Perangkat Lunak",
    skills: ["Node.js", "Express.js", "SQL/Database", "REST API"],
    icon: "server",
  },
  {
    id: "rpl-devops",
    title: "DevOps Engineer",
    description: "Mengelola infrastruktur, CI/CD, dan deployment.",
    major: "Rekayasa Perangkat Lunak",
    skills: ["Docker", "Git", "CI/CD", "Linux Basics"],
    icon: "git-branch",
  },
  {
    id: "rpl-mobile",
    title: "Mobile App Developer",
    description: "Membangun aplikasi mobile cross-platform dengan Flutter atau React Native.",
    major: "Rekayasa Perangkat Lunak",
    skills: ["React Native", "JavaScript", "REST API", "Mobile UI/UX"],
    icon: "smartphone",
  },

  // ── Desain Komunikasi Visual ────────────────────────────────────────────
  {
    id: "dkv-motion",
    title: "Motion Graphic Designer",
    description: "Membuat animasi dan video motion graphics untuk konten digital.",
    major: "Desain Komunikasi Visual",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "UI/UX Design"],
    icon: "clapperboard",
  },
  {
    id: "dkv-graphic",
    title: "Graphic Designer",
    description: "Membuat visual branding, marketing material, dan ilustrasi.",
    major: "Desain Komunikasi Visual",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "UI/UX Design"],
    icon: "palette",
  },
  {
    id: "dkv-uiux",
    title: "UI/UX Designer",
    description: "Merancang antarmuka pengguna yang intuitif dan user-friendly.",
    major: "Desain Komunikasi Visual",
    skills: ["UI/UX Design", "Figma", "Adobe Photoshop"],
    icon: "figma",
  },
  {
    id: "dkv-product",
    title: "Product Designer",
    description: "Mendesain produk digital dari riset hingga prototype interaktif.",
    major: "Desain Komunikasi Visual",
    skills: ["Figma", "UI/UX Design", "Adobe Photoshop"],
    icon: "box",
  },
  {
    id: "dkv-brand",
    title: "Brand Identity Designer",
    description: "Merancang identitas visual merek dan guidelines.",
    major: "Desain Komunikasi Visual",
    skills: ["Adobe Illustrator", "Adobe Photoshop", "UI/UX Design"],
    icon: "fingerprint",
  },

  // ── Teknik Komputer dan Jaringan ────────────────────────────────────────
  {
    id: "tkj-sysadmin",
    title: "System Administrator",
    description: "Mengelola server, sistem operasi, dan infrastruktur IT.",
    major: "Teknik Komputer dan Jaringan",
    skills: ["Linux Administration", "Docker", "Cloud (AWS/GCP)"],
    icon: "server-cog",
  },
  {
    id: "tkj-network",
    title: "Network Administrator",
    description: "Mengelola dan mengamankan jaringan perusahaan.",
    major: "Teknik Komputer dan Jaringan",
    skills: ["Networking", "Cisco Networking", "MikroTik"],
    icon: "network",
  },
  {
    id: "tkj-cloud",
    title: "Cloud Engineer",
    description: "Mengelola infrastruktur cloud, deployment, dan scaling.",
    major: "Teknik Komputer dan Jaringan",
    skills: ["Cloud (AWS/GCP)", "Docker", "Linux Administration"],
    icon: "cloud",
  },
  {
    id: "tkj-security",
    title: "Cybersecurity Analyst",
    description: "Melindungi sistem dari serangan dan melakukan forensik digital.",
    major: "Teknik Komputer dan Jaringan",
    skills: ["Cybersecurity Basics", "Linux Administration", "Networking"],
    icon: "shield",
  },
  {
    id: "tkj-support",
    title: "IT Support Specialist",
    description: "Troubleshooting hardware, software, dan user support.",
    major: "Teknik Komputer dan Jaringan",
    skills: ["Networking", "Linux Administration", "Cybersecurity Basics"],
    icon: "headset",
  },

  // ── Teknik Transmisi ────────────────────────────────────────────────────
  {
    id: "tt-fiber",
    title: "Fiber Optic Specialist",
    description: "Instalasi, splicing, dan testing kabel fiber optik.",
    major: "Teknik Transmisi",
    skills: ["Fiber Optics", "Networking Basics", "Radio Frequency"],
    icon: "cable",
  },
  {
    id: "tt-rf",
    title: "RF Engineer",
    description: "Perencanaan dan optimasi radio link wireless.",
    major: "Teknik Transmisi",
    skills: ["Radio Frequency", "Networking Basics", "Fiber Optics"],
    icon: "radio",
  },
  {
    id: "tt-noc",
    title: "NOC Analyst",
    description: "Monitoring dan troubleshooting jaringan 24/7.",
    major: "Teknik Transmisi",
    skills: ["Networking Basics", "Fiber Optics", "Radio Frequency"],
    icon: "activity",
  },
  {
    id: "tt-network",
    title: "Network Engineer",
    description: "Mengelola dan memelihara infrastruktur jaringan backbone.",
    major: "Teknik Transmisi",
    skills: ["Networking Basics", "Fiber Optics", "Radio Frequency"],
    icon: "router",
  },
  {
    id: "tt-telecom",
    title: "Telecom Technician",
    description: "Instalasi dan maintenance sistem telekomunikasi.",
    major: "Teknik Transmisi",
    skills: ["Fiber Optics", "Networking Basics", "Radio Frequency"],
    icon: "antenna",
  },
];

export function getMateriById(id: string): Materi | undefined {
  return materiList.find((m) => m.id === id);
}

export function getMajorDisplayName(majorName: string): string {
  const found = MAJORS.find((m) => m.name === majorName);
  return found ? found.name : majorName;
}