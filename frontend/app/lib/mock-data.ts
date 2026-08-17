import {
  UserProfile,
  Skill,
  SkillProfile,
  CareerMatch,
  SkillGap,
  RoadmapMilestone,
  Project,
  JobOpportunity,
  StudentStats,
} from "./type";

export const currentUser: UserProfile = {
  id: "usr-001",
  name: "Budi Santoso",
  email: "budi@student.smk.id",
  role: "student",
  major: "Teknik Informatika",
  grade: "XII",
  avatar: "",
  createdAt: "2025-08-01",
};

export const adminUser: UserProfile = {
  id: "adm-001",
  name: "Pak Ahmad Hidayat",
  email: "ahmad@guru.smk.id",
  role: "admin",
  major: "BK",
  grade: "-",
  avatar: "",
  createdAt: "2024-01-15",
};

export const industryUser: UserProfile = {
  id: "ind-001",
  name: "Sari Dewi",
  email: "sari@hrd-techcorp.id",
  role: "industry",
  major: "HRD",
  grade: "-",
  avatar: "",
  createdAt: "2025-03-10",
};

export const hardSkills: Skill[] = [
  { id: "hs-01", name: "HTML/CSS", category: "hard", level: 4 },
  { id: "hs-02", name: "JavaScript", category: "hard", level: 3 },
  { id: "hs-03", name: "TypeScript", category: "hard", level: 2 },
  { id: "hs-04", name: "React/Next.js", category: "hard", level: 2 },
  { id: "hs-05", name: "Node.js", category: "hard", level: 3 },
  { id: "hs-06", name: "Python", category: "hard", level: 2 },
  { id: "hs-07", name: "SQL/Database", category: "hard", level: 3 },
  { id: "hs-08", name: "Git", category: "hard", level: 2 },
  { id: "hs-09", name: "Docker", category: "hard", level: 1 },
  { id: "hs-10", name: "REST API", category: "hard", level: 2 },
  { id: "hs-11", name: "C#", category: "hard", level: 3 },
  { id: "hs-12", name: "PHP/Laravel", category: "hard", level: 1 },
];

export const softSkills: Skill[] = [
  { id: "ss-01", name: "Komunikasi", category: "soft", level: 4 },
  { id: "ss-02", name: "Problem Solving", category: "soft", level: 3 },
  { id: "ss-03", name: "Teamwork", category: "soft", level: 4 },
  { id: "ss-04", name: "Time Management", category: "soft", level: 3 },
  { id: "ss-05", name: "Adaptabilitas", category: "soft", level: 4 },
  { id: "ss-06", name: "Kreativitas", category: "soft", level: 3 },
];

export const allSkills: Skill[] = [...hardSkills, ...softSkills];

export const skillProfile: SkillProfile = {
  userId: "usr-001",
  skills: allSkills,
  completedAt: "2026-01-15",
};

export const careerMatches: CareerMatch[] = [
  {
    id: "cm-01",
    title: "Backend Developer",
    description: "Mengembangkan dan memelihara server-side application, API, dan database untuk mendukung aplikasi web skala besar.",
    matchPercentage: 82,
    requiredSkills: [
      { id: "hs-05", name: "Node.js", category: "hard", level: 4 },
      { id: "hs-10", name: "REST API", category: "hard", level: 4 },
      { id: "hs-07", name: "SQL/Database", category: "hard", level: 4 },
      { id: "hs-08", name: "Git", category: "hard", level: 4 },
      { id: "hs-09", name: "Docker", category: "hard", level: 3 },
      { id: "hs-02", name: "JavaScript", category: "hard", level: 4 },
    ],
    category: "Software Engineering",
  },
  {
    id: "cm-02",
    title: "Fullstack Developer",
    description: "Mengembangkan aplikasi web end-to-end mulai dari frontend hingga backend, termasuk database dan deployment.",
    matchPercentage: 75,
    requiredSkills: [
      { id: "hs-01", name: "HTML/CSS", category: "hard", level: 5 },
      { id: "hs-04", name: "React/Next.js", category: "hard", level: 4 },
      { id: "hs-05", name: "Node.js", category: "hard", level: 4 },
      { id: "hs-02", name: "JavaScript", category: "hard", level: 4 },
      { id: "hs-10", name: "REST API", category: "hard", level: 4 },
    ],
    category: "Software Engineering",
  },
  {
    id: "cm-03",
    title: "Frontend Developer",
    description: "Membangun antarmuka pengguna yang responsif dan interaktif menggunakan framework modern seperti React atau Next.js.",
    matchPercentage: 70,
    requiredSkills: [
      { id: "hs-01", name: "HTML/CSS", category: "hard", level: 5 },
      { id: "hs-02", name: "JavaScript", category: "hard", level: 5 },
      { id: "hs-03", name: "TypeScript", category: "hard", level: 4 },
      { id: "hs-04", name: "React/Next.js", category: "hard", level: 5 },
    ],
    category: "Software Engineering",
  },
  {
    id: "cm-04",
    title: "DevOps Engineer",
    description: "Mengelola infrastruktur, CI/CD pipeline, containerization, dan automasi deployment untuk memastikan aplikasi berjalan stabil.",
    matchPercentage: 52,
    requiredSkills: [
      { id: "hs-09", name: "Docker", category: "hard", level: 5 },
      { id: "hs-08", name: "Git", category: "hard", level: 5 },
      { id: "hs-05", name: "Node.js", category: "hard", level: 3 },
      { id: "hs-07", name: "SQL/Database", category: "hard", level: 3 },
    ],
    category: "Infrastructure",
  },
  {
    id: "cm-05",
    title: "Data Analyst",
    description: "Menganalisis data untuk memberikan insight bisnis, membuat dashboard visualisasi, dan mendukung pengambilan keputusan.",
    matchPercentage: 48,
    requiredSkills: [
      { id: "hs-06", name: "Python", category: "hard", level: 4 },
      { id: "hs-07", name: "SQL/Database", category: "hard", level: 4 },
      { id: "ss-02", name: "Problem Solving", category: "soft", level: 4 },
    ],
    category: "Data",
  },
];

export const skillGapsForBackend: SkillGap[] = [
  { skillName: "Node.js", currentLevel: 3, requiredLevel: 4, status: "improving" },
  { skillName: "REST API", currentLevel: 2, requiredLevel: 4, status: "needed" },
  { skillName: "SQL/Database", currentLevel: 3, requiredLevel: 4, status: "improving" },
  { skillName: "Git", currentLevel: 2, requiredLevel: 4, status: "needed" },
  { skillName: "Docker", currentLevel: 1, requiredLevel: 3, status: "needed" },
  { skillName: "JavaScript", currentLevel: 3, requiredLevel: 4, status: "improving" },
  { skillName: "Komunikasi", currentLevel: 4, requiredLevel: 4, status: "mastered" },
  { skillName: "Problem Solving", currentLevel: 3, requiredLevel: 4, status: "improving" },
];

export const roadmapMilestones: RoadmapMilestone[] = [
  {
    id: "rm-01",
    title: "Pahami REST API",
    description: "Pelajari konsep dasar REST API, HTTP methods, status codes, dan cara membuat API endpoint.",
    status: "completed",
    skills: ["REST API"],
    estimatedHours: 8,
    resources: [
      { title: "MDN Web Docs - REST API", url: "https://developer.mozilla.org", type: "article" },
      { title: "REST API Crash Course", url: "https://youtube.com", type: "video" },
    ],
  },
  {
    id: "rm-02",
    title: "Kuasai Git & GitHub",
    description: "Pelajari version control dengan Git, branching strategy, pull request, dan kolaborasi tim.",
    status: "in_progress",
    skills: ["Git"],
    estimatedHours: 6,
    resources: [
      { title: "Git Handbook", url: "https://docs.github.com", type: "article" },
      { title: "Git & GitHub Tutorial", url: "https://youtube.com", type: "video" },
    ],
  },
  {
    id: "rm-03",
    title: "Docker Dasar",
    description: "Pelajari containerization dengan Docker, Dockerfile, docker-compose, dan deployment basics.",
    status: "available",
    skills: ["Docker"],
    estimatedHours: 10,
    resources: [
      { title: "Docker Getting Started", url: "https://docs.docker.com", type: "article" },
      { title: "Docker Crash Course", url: "https://youtube.com", type: "video" },
    ],
  },
  {
    id: "rm-04",
    title: "PostgreSQL untuk Backend",
    description: "Pelajari SQL fundamentals, query optimization, indexing, dan relasi database.",
    status: "available",
    skills: ["SQL/Database"],
    estimatedHours: 12,
    resources: [
      { title: "PostgreSQL Tutorial", url: "https://postgresql.org", type: "article" },
      { title: "SQL Full Course", url: "https://youtube.com", type: "video" },
    ],
  },
  {
    id: "rm-05",
    title: "Build REST API Project",
    description: "Praktik membangun REST API lengpat dengan autentikasi, CRUD, dan dokumentasi menggunakan Node.js.",
    status: "locked",
    skills: ["Node.js", "REST API", "SQL/Database"],
    estimatedHours: 15,
    resources: [
      { title: "Build a REST API with Node.js", url: "https://youtube.com", type: "course" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "pj-01",
    title: "Toko Online Sederhana",
    description: "Aplikasi web e-commerce sederhana dengan fitur keranjang belanja dan checkout menggunakan HTML, CSS, dan JavaScript.",
    skills: ["HTML/CSS", "JavaScript"],
    completedAt: "2025-11-20",
  },
  {
    id: "pj-02",
    title: "Weather Dashboard",
    description: "Dashboard cuaca real-time yang mengambil data dari OpenWeather API dengan tampilan responsif.",
    skills: ["JavaScript", "REST API"],
    completedAt: "2025-12-15",
  },
  {
    id: "pj-03",
    title: "Blog Personal",
    description: "Blog personal dengan fitur CRUD artikel menggunakan Node.js, Express, dan MongoDB.",
    skills: ["Node.js", "JavaScript", "REST API"],
    projectUrl: "https://github.com/budi/blog-app",
    completedAt: "2026-01-10",
  },
];

export const jobOpportunities: JobOpportunity[] = [
  {
    id: "job-01",
    company: "PT TechCorp Digital",
    companyLogo: "",
    title: "Backend Developer Intern",
    type: "magang",
    location: "Jakarta Selatan (Hybrid)",
    description: "Magang 6 bulan untuk mengembangkan REST API dan microservices menggunakan Node.js dan PostgreSQL.",
    requiredSkills: ["Node.js", "REST API", "SQL/Database", "Git"],
    matchPercentage: 85,
    postedAt: "2026-02-01",
    deadline: "2026-03-15",
  },
  {
    id: "job-02",
    company: "PT WebSolusi Nusantara",
    companyLogo: "",
    title: "Junior Fullstack Developer",
    type: "fulltime",
    location: "Bandung (On-site)",
    description: "Posisi full-time untuk pengembangan aplikasi web menggunakan React dan Node.js.",
    requiredSkills: ["React/Next.js", "Node.js", "HTML/CSS", "JavaScript"],
    matchPercentage: 78,
    postedAt: "2026-01-25",
    deadline: "2026-03-01",
  },
  {
    id: "job-03",
    company: "PT DataInsight Analytics",
    companyLogo: "",
    title: "Data Analyst Intern",
    type: "magang",
    location: "Surabaya (On-site)",
    description: "Magang analisis data dengan Python, SQL, dan pembuatan dashboard visualisasi.",
    requiredSkills: ["Python", "SQL/Database", "Problem Solving"],
    matchPercentage: 55,
    postedAt: "2026-02-10",
    deadline: "2026-03-20",
  },
  {
    id: "job-04",
    company: "PT CloudServe Indonesia",
    companyLogo: "",
    title: "DevOps Engineer Intern",
    type: "magang",
    location: "Remote",
    description: "Magang DevOps untuk belajar CI/CD pipeline, Docker, dan cloud infrastructure.",
    requiredSkills: ["Docker", "Git", "Linux"],
    matchPercentage: 42,
    postedAt: "2026-02-05",
    deadline: "2026-03-10",
  },
  {
    id: "job-05",
    company: "PT Aplikasi Kreatif",
    companyLogo: "",
    title: "Frontend Developer (Part-time)",
    type: "parttime",
    location: "Yogyakarta (Hybrid)",
    description: "Developer frontend part-time untuk proyek-proyek klien menggunakan React dan Tailwind CSS.",
    requiredSkills: ["HTML/CSS", "React/Next.js", "JavaScript", "TypeScript"],
    matchPercentage: 72,
    postedAt: "2026-02-12",
    deadline: "2026-03-25",
  },
];

export const studentStats: StudentStats = {
  totalStudents: 248,
  assessedStudents: 195,
  avgReadinessScore: 67,
  topCareers: [
    { name: "Fullstack Developer", count: 45 },
    { name: "Backend Developer", count: 38 },
    { name: "Frontend Developer", count: 35 },
    { name: "Data Analyst", count: 28 },
    { name: "DevOps Engineer", count: 15 },
  ],
  readinessByMajor: [
    { major: "Teknik Informatika", score: 72 },
    { major: "Rekayasa Perangkat Lunak", score: 68 },
    { major: "Sistem Informasi", score: 65 },
    { major: "Multimedia", score: 58 },
  ],
};