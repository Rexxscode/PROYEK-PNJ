import {
  UserProfile,
  Skill,
  CareerMatch,
  SkillGap,
  RoadmapMilestone,
  Project,
  JobOpportunity,
  StudentStats,
} from "./type";

// ===== Multiple Student Profiles =====
export interface StudentData {
  profile: UserProfile;
  hardSkills: Skill[];
  softSkills: Skill[];
  careerMatches: CareerMatch[];
  skillGaps: SkillGap[];
  roadmapMilestones: RoadmapMilestone[];
  projects: Project[];
  jobOpportunities: JobOpportunity[];
}

const rplHardSkills: Skill[] = [
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
];

const dkvHardSkills: Skill[] = [
  { id: "dk-01", name: "Figma", category: "hard", level: 4 },
  { id: "dk-02", name: "Adobe Photoshop", category: "hard", level: 3 },
  { id: "dk-03", name: "Adobe Illustrator", category: "hard", level: 3 },
  { id: "dk-04", name: "UI/UX Design", category: "hard", level: 4 },
  { id: "dk-05", name: "Typography", category: "hard", level: 3 },
  { id: "dk-06", name: "Color Theory", category: "hard", level: 4 },
  { id: "dk-07", name: "Brand Identity", category: "hard", level: 2 },
  { id: "dk-08", name: "Motion Graphics", category: "hard", level: 2 },
  { id: "dk-09", name: "HTML/CSS", category: "hard", level: 3 },
  { id: "dk-10", name: "Video Editing", category: "hard", level: 2 },
];

const ttHardSkills: Skill[] = [
  { id: "tt-01", name: "Networking Basics", category: "hard", level: 4 },
  { id: "tt-02", name: "Cisco IOS", category: "hard", level: 3 },
  { id: "tt-03", name: "Fiber Optics", category: "hard", level: 3 },
  { id: "tt-04", name: "Mikrotik", category: "hard", level: 2 },
  { id: "tt-05", name: "Wireless Technology", category: "hard", level: 3 },
  { id: "tt-06", name: "TCP/IP", category: "hard", level: 4 },
  { id: "tt-07", name: "Network Security", category: "hard", level: 2 },
  { id: "tt-08", name: "Linux", category: "hard", level: 2 },
  { id: "tt-09", name: "VoIP", category: "hard", level: 1 },
  { id: "tt-10", name: "CCTV & Surveillance", category: "hard", level: 2 },
];

const tkjHardSkills: Skill[] = [
  { id: "tk-01", name: "Windows Server", category: "hard", level: 3 },
  { id: "tk-02", name: "Linux Administration", category: "hard", level: 3 },
  { id: "tk-03", name: "Active Directory", category: "hard", level: 2 },
  { id: "tk-04", name: "Networking", category: "hard", level: 4 },
  { id: "tk-05", name: "Cybersecurity Basics", category: "hard", level: 2 },
  { id: "tk-06", name: "Virtualization", category: "hard", level: 2 },
  { id: "tk-07", name: "Shell Scripting", category: "hard", level: 2 },
  { id: "tk-08", name: "Hardware Troubleshooting", category: "hard", level: 4 },
  { id: "tk-09", name: "Database Management", category: "hard", level: 2 },
  { id: "tk-10", name: "Cloud Basics (AWS/Azure)", category: "hard", level: 1 },
];

const commonSoftSkills: Skill[] = [
  { id: "ss-01", name: "Komunikasi", category: "soft", level: 4 },
  { id: "ss-02", name: "Problem Solving", category: "soft", level: 3 },
  { id: "ss-03", name: "Teamwork", category: "soft", level: 4 },
  { id: "ss-04", name: "Time Management", category: "soft", level: 3 },
  { id: "ss-05", name: "Adaptabilitas", category: "soft", level: 4 },
  { id: "ss-06", name: "Kreativitas", category: "soft", level: 3 },
];

export const students: Record<string, StudentData> = {
  rpl: {
    profile: { id: "usr-001", name: "Budi Santoso", email: "budi@student.smk.id", role: "student", major: "Rekayasa Perangkat Lunak", grade: "XII", avatar: "", createdAt: "2025-08-01" },
    hardSkills: rplHardSkills,
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-01", title: "Backend Developer", description: "Mengembangkan server-side application, API, dan database.", matchPercentage: 82, readinessScore: 82, requiredSkills: [{ id: "hs-05", name: "Node.js", category: "hard", level: 4 }, { id: "hs-10", name: "REST API", category: "hard", level: 4 }, { id: "hs-07", name: "SQL/Database", category: "hard", level: 4 }, { id: "hs-08", name: "Git", category: "hard", level: 4 }], skillGaps: [], category: "Software Engineering" },
      { id: "cm-02", title: "Fullstack Developer", description: "Mengembangkan aplikasi web end-to-end frontend hingga backend.", matchPercentage: 75, readinessScore: 75, requiredSkills: [{ id: "hs-01", name: "HTML/CSS", category: "hard", level: 5 }, { id: "hs-04", name: "React/Next.js", category: "hard", level: 4 }, { id: "hs-05", name: "Node.js", category: "hard", level: 4 }, { id: "hs-02", name: "JavaScript", category: "hard", level: 4 }], skillGaps: [], category: "Software Engineering" },
      { id: "cm-03", title: "Frontend Developer", description: "Membangun antarmuka pengguna responsif dan interaktif.", matchPercentage: 70, readinessScore: 70, requiredSkills: [{ id: "hs-01", name: "HTML/CSS", category: "hard", level: 5 }, { id: "hs-02", name: "JavaScript", category: "hard", level: 5 }, { id: "hs-04", name: "React/Next.js", category: "hard", level: 5 }], skillGaps: [], category: "Software Engineering" },
      { id: "cm-04", title: "DevOps Engineer", description: "Mengelola infrastruktur, CI/CD, dan deployment.", matchPercentage: 52, readinessScore: 52, requiredSkills: [{ id: "hs-09", name: "Docker", category: "hard", level: 5 }, { id: "hs-08", name: "Git", category: "hard", level: 5 }, { id: "hs-05", name: "Node.js", category: "hard", level: 3 }], skillGaps: [], category: "Infrastructure" },
    ],
    skillGaps: [
      { skillName: "Node.js", currentLevel: 3, requiredLevel: 4, status: "improving" },
      { skillName: "REST API", currentLevel: 2, requiredLevel: 4, status: "needed" },
      { skillName: "SQL/Database", currentLevel: 3, requiredLevel: 4, status: "improving" },
      { skillName: "Git", currentLevel: 2, requiredLevel: 4, status: "needed" },
      { skillName: "Docker", currentLevel: 1, requiredLevel: 3, status: "needed" },
    ],
    roadmapMilestones: [
      { id: "rm-01", title: "Pahami REST API", description: "Pelajari konsep dasar REST API, HTTP methods, dan status codes.", status: "completed", skills: ["REST API"], estimatedHours: 8, resources: [{ title: "MDN Web Docs - REST API", url: "https://developer.mozilla.org", type: "article" }, { title: "REST API Crash Course", url: "https://youtube.com", type: "video" }] },
      { id: "rm-02", title: "Kuasai Git & GitHub", description: "Pelajari version control, branching, dan kolaborasi tim.", status: "in_progress", skills: ["Git"], estimatedHours: 6, resources: [{ title: "Git Handbook", url: "https://docs.github.com", type: "article" }, { title: "Git Tutorial", url: "https://youtube.com", type: "video" }] },
      { id: "rm-03", title: "Docker Dasar", description: "Pelajari containerization dengan Docker dan docker-compose.", status: "available", skills: ["Docker"], estimatedHours: 10, resources: [{ title: "Docker Getting Started", url: "https://docs.docker.com", type: "article" }] },
      { id: "rm-04", title: "PostgreSQL untuk Backend", description: "Pelajari SQL fundamentals, query optimization, dan indexing.", status: "available", skills: ["SQL/Database"], estimatedHours: 12, resources: [{ title: "PostgreSQL Tutorial", url: "https://postgresql.org", type: "article" }] },
      { id: "rm-05", title: "Build REST API Project", description: "Praktik membangun REST API dengan autentikasi dan CRUD.", status: "locked", skills: ["Node.js", "REST API"], estimatedHours: 15, resources: [{ title: "Build REST API with Node.js", url: "https://youtube.com", type: "course" }] },
    ],
    projects: [
      { id: "pj-01", title: "Toko Online Sederhana", description: "Aplikasi e-commerce dengan keranjang belanja.", skills: ["HTML/CSS", "JavaScript"], completedAt: "2025-11-20" },
      { id: "pj-02", title: "Weather Dashboard", description: "Dashboard cuaca real-time dari OpenWeather API.", skills: ["JavaScript", "REST API"], completedAt: "2025-12-15" },
      { id: "pj-03", title: "Blog Personal", description: "Blog CRUD dengan Node.js dan MongoDB.", skills: ["Node.js", "JavaScript"], completedAt: "2026-01-10" },
    ],
    jobOpportunities: [
      { id: "job-01", company: "TechCorp Indonesia", companyLogo: "", title: "Backend Developer Intern", type: "magang", location: "Jakarta Selatan (Hybrid)", description: "Magang pengembangan REST API dan microservices.", requiredSkills: ["Node.js", "REST API", "SQL/Database"], matchPercentage: 85, postedAt: "2026-02-01", deadline: "2026-03-15" },
      { id: "job-02", company: "PT Telkom Indonesia", companyLogo: "", title: "Junior Fullstack Developer", type: "fulltime", location: "Bandung (On-site)", description: "Pengembangan aplikasi web React dan Node.js.", requiredSkills: ["React/Next.js", "Node.js", "JavaScript"], matchPercentage: 78, postedAt: "2026-01-25", deadline: "2026-03-01" },
      { id: "job-03", company: "Creative Studio", companyLogo: "", title: "Frontend Developer (Part-time)", type: "parttime", location: "Yogyakarta (Hybrid)", description: "Developer frontend dengan React dan Tailwind.", requiredSkills: ["HTML/CSS", "React/Next.js", "JavaScript"], matchPercentage: 72, postedAt: "2026-02-12", deadline: "2026-03-25" },
    ],
  },

  dkv: {
    profile: { id: "usr-002", name: "Rina Wulandari", email: "rina@student.smk.id", role: "student", major: "Desain Komunikasi Visual", grade: "XII", avatar: "", createdAt: "2025-08-01" },
    hardSkills: dkvHardSkills,
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-d1", title: "UI/UX Designer", description: "Merancang antarmuka pengguna yang intuitif dan user-friendly.", matchPercentage: 88, readinessScore: 88, requiredSkills: [{ id: "dk-04", name: "UI/UX Design", category: "hard", level: 5 }, { id: "dk-01", name: "Figma", category: "hard", level: 5 }, { id: "dk-05", name: "Typography", category: "hard", level: 4 }], skillGaps: [], category: "Design" },
      { id: "cm-d2", title: "Graphic Designer", description: "Membuat visual branding, marketing material, dan ilustrasi.", matchPercentage: 82, readinessScore: 82, requiredSkills: [{ id: "dk-02", name: "Adobe Photoshop", category: "hard", level: 5 }, { id: "dk-03", name: "Adobe Illustrator", category: "hard", level: 5 }, { id: "dk-06", name: "Color Theory", category: "hard", level: 4 }], skillGaps: [], category: "Design" },
      { id: "cm-d3", title: "Motion Designer", description: "Membuat animasi dan video motion graphics.", matchPercentage: 65, readinessScore: 65, requiredSkills: [{ id: "dk-08", name: "Motion Graphics", category: "hard", level: 5 }, { id: "dk-10", name: "Video Editing", category: "hard", level: 4 }], skillGaps: [], category: "Design" },
      { id: "cm-d4", title: "Brand Identity Designer", description: "Merancang identitas visual merek dan guidelines.", matchPercentage: 72, readinessScore: 72, requiredSkills: [{ id: "dk-07", name: "Brand Identity", category: "hard", level: 5 }, { id: "dk-03", name: "Adobe Illustrator", category: "hard", level: 4 }, { id: "dk-06", name: "Color Theory", category: "hard", level: 4 }], skillGaps: [], category: "Design" },
    ],
    skillGaps: [
      { skillName: "Figma", currentLevel: 4, requiredLevel: 5, status: "improving" },
      { skillName: "Adobe Illustrator", currentLevel: 3, requiredLevel: 5, status: "needed" },
      { skillName: "Motion Graphics", currentLevel: 2, requiredLevel: 4, status: "needed" },
      { skillName: "Brand Identity", currentLevel: 2, requiredLevel: 4, status: "needed" },
    ],
    roadmapMilestones: [
      { id: "rd-01", title: "Figma Fundamentals", description: "Kuasai tools Figma: auto layout, component, dan prototyping.", status: "completed", skills: ["Figma", "UI/UX Design"], estimatedHours: 10, resources: [{ title: "Figma Official Tutorials", url: "https://figma.com", type: "video" }, { title: "Figma 101 Course", url: "https://youtube.com", type: "course" }] },
      { id: "rd-02", title: "Color Theory & Typography", description: "Pelajari teori warna, tipografi, dan hierarki visual.", status: "in_progress", skills: ["Color Theory", "Typography"], estimatedHours: 8, resources: [{ title: "Color Theory for Designers", url: "https://medium.com", type: "article" }] },
      { id: "rd-03", title: "UI/UX Design Systems", description: "Buat design system yang konsisten dan scalable.", status: "available", skills: ["UI/UX Design"], estimatedHours: 12, resources: [{ title: "Design Systems 101", url: "https://designsystems.com", type: "article" }] },
      { id: "rd-04", title: "Adobe Illustrator Mastery", description: "Kuasai vector illustration dan branding assets.", status: "available", skills: ["Adobe Illustrator", "Brand Identity"], estimatedHours: 15, resources: [{ title: "Adobe Illustrator Tutorial", url: "https://youtube.com", type: "video" }] },
      { id: "rd-05", title: "Portfolio Design Project", description: "Buat portfolio showcase lengkap dengan case study.", status: "locked", skills: ["Figma", "UI/UX Design", "Brand Identity"], estimatedHours: 20, resources: [{ title: "How to Build a Design Portfolio", url: "https://youtube.com", type: "article" }] },
    ],
    projects: [
      { id: "pj-d1", title: "Brand Identity Startup", description: "Desain logo, warna, dan guidelines untuk startup fintech.", skills: ["Adobe Illustrator", "Brand Identity", "Color Theory"], completedAt: "2025-11-25" },
      { id: "pj-d2", title: "Mobile App UI Kit", description: "UI kit lengkap 50+ komponen untuk app e-commerce.", skills: ["Figma", "UI/UX Design"], completedAt: "2025-12-20" },
      { id: "pj-d3", title: "Poster Event Musik", description: "Serangkaian poster promosi untuk event musik sekolah.", skills: ["Adobe Photoshop", "Typography"], completedAt: "2026-01-15" },
    ],
    jobOpportunities: [
      { id: "job-d1", company: "Creative Studio", companyLogo: "", title: "UI/UX Design Intern", type: "magang", location: "Jakarta (Hybrid)", description: "Magang desain antarmuka aplikasi mobile dan web.", requiredSkills: ["Figma", "UI/UX Design"], matchPercentage: 90, postedAt: "2026-02-05", deadline: "2026-03-20" },
      { id: "job-d2", company: "TechCorp Indonesia", companyLogo: "", title: "Graphic Designer (Part-time)", type: "parttime", location: "Remote", description: "Desain material marketing dan social media.", requiredSkills: ["Adobe Photoshop", "Adobe Illustrator"], matchPercentage: 82, postedAt: "2026-02-10", deadline: "2026-03-25" },
      { id: "job-d3", company: "PT Telkom Indonesia", companyLogo: "", title: "Motion Graphics Junior", type: "fulltime", location: "Bandung (On-site)", description: "Buat animasi untuk iklan dan konten digital.", requiredSkills: ["Motion Graphics", "Video Editing"], matchPercentage: 65, postedAt: "2026-02-08", deadline: "2026-03-15" },
    ],
  },

  tt: {
    profile: { id: "usr-003", name: "Hendra Susanto", email: "hendra@student.smk.id", role: "student", major: "Teknik Transmisi", grade: "XII", avatar: "", createdAt: "2025-08-01" },
    hardSkills: ttHardSkills,
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-t1", title: "Network Engineer", description: "Mengelola dan memelihara infrastruktur jaringan perusahaan.", matchPercentage: 80, readinessScore: 80, requiredSkills: [{ id: "tt-01", name: "Networking Basics", category: "hard", level: 5 }, { id: "tt-02", name: "Cisco IOS", category: "hard", level: 4 }, { id: "tt-06", name: "TCP/IP", category: "hard", level: 5 }], skillGaps: [], category: "Networking" },
      { id: "cm-t2", title: "Telecom Technician", description: "Instalasi dan maintenance sistem telekomunikasi.", matchPercentage: 75, readinessScore: 75, requiredSkills: [{ id: "tt-03", name: "Fiber Optics", category: "hard", level: 4 }, { id: "tt-05", name: "Wireless Technology", category: "hard", level: 4 }, { id: "tt-09", name: "VoIP", category: "hard", level: 3 }], skillGaps: [], category: "Telecom" },
      { id: "cm-t3", title: "NOC Analyst", description: "Monitoring dan troubleshooting jaringan 24/7.", matchPercentage: 70, readinessScore: 70, requiredSkills: [{ id: "tt-01", name: "Networking Basics", category: "hard", level: 4 }, { id: "tt-07", name: "Network Security", category: "hard", level: 3 }, { id: "tt-08", name: "Linux", category: "hard", level: 3 }], skillGaps: [], category: "Networking" },
    ],
    skillGaps: [
      { skillName: "Cisco IOS", currentLevel: 3, requiredLevel: 5, status: "improving" },
      { skillName: "Fiber Optics", currentLevel: 3, requiredLevel: 4, status: "improving" },
      { skillName: "Network Security", currentLevel: 2, requiredLevel: 4, status: "needed" },
      { skillName: "VoIP", currentLevel: 1, requiredLevel: 3, status: "needed" },
    ],
    roadmapMilestones: [
      { id: "rt-01", title: "Networking Fundamentals", description: "Pelajari OSI model, TCP/IP, subnetting, dan routing dasar.", status: "completed", skills: ["Networking Basics", "TCP/IP"], estimatedHours: 12, resources: [{ title: "CCNA Networking Basics", url: "https://cisco.com", type: "course" }, { title: "Network+ Study Guide", url: "https://youtube.com", type: "video" }] },
      { id: "rt-02", title: "Cisco IOS Configuration", description: "Konfigurasi router dan switch Cisco: VLAN, routing, ACL.", status: "in_progress", skills: ["Cisco IOS"], estimatedHours: 15, resources: [{ title: "Cisco Packet Tracer Lab", url: "https://cisco.com", type: "practice" }] },
      { id: "rt-03", title: "Fiber Optics & Wireless", description: "Pelajari instalasi fiber optic dan konfigurasi wireless AP.", status: "available", skills: ["Fiber Optics", "Wireless Technology"], estimatedHours: 10, resources: [{ title: "Fiber Optic Tutorial", url: "https://youtube.com", type: "video" }] },
      { id: "rt-04", title: "Network Security Basics", description: "Pelajari firewall, VPN, dan keamanan jaringan.", status: "available", skills: ["Network Security"], estimatedHours: 12, resources: [{ title: "Network Security Course", url: "https://youtube.com", type: "course" }] },
      { id: "rt-05", title: "VoIP & Surveillance Setup", description: "Setup sistem VoIP dan CCTV berbasis IP.", status: "locked", skills: ["VoIP", "CCTV & Surveillance"], estimatedHours: 10, resources: [{ title: "VoIP Setup Guide", url: "https://youtube.com", type: "article" }] },
    ],
    projects: [
      { id: "pj-t1", title: "Lab Jaringan Sekolah", description: "Setup jaringan lab dengan 30 workstation dan VLAN.", skills: ["Networking Basics", "Cisco IOS"], completedAt: "2025-11-30" },
      { id: "pj-t2", title: "WiFi Hotspot Management", description: "Deploy captive portal WiFi dengan Mikrotik.", skills: ["Mikrotik", "Wireless Technology"], completedAt: "2025-12-18" },
      { id: "pj-t3", title: "CCTV IP System", description: "Instalasi 16 channel CCTV IP untuk area sekolah.", skills: ["CCTV & Surveillance", "Networking Basics"], completedAt: "2026-01-20" },
    ],
    jobOpportunities: [
      { id: "job-t1", company: "PT Telkom Indonesia", companyLogo: "", title: "Network Technician Intern", type: "magang", location: "Surabaya (On-site)", description: "Magang instalasi dan maintenance jaringan telekomunikasi.", requiredSkills: ["Networking Basics", "Fiber Optics", "Cisco IOS"], matchPercentage: 82, postedAt: "2026-02-01", deadline: "2026-03-15" },
      { id: "job-t2", company: "TechCorp Indonesia", companyLogo: "", title: "Junior Network Engineer", type: "fulltime", location: "Jakarta (On-site)", description: "Konfigurasi dan monitoring infrastruktur jaringan klien.", requiredSkills: ["Cisco IOS", "TCP/IP", "Network Security"], matchPercentage: 75, postedAt: "2026-02-05", deadline: "2026-03-20" },
      { id: "job-t3", company: "Creative Studio", companyLogo: "", title: "Telecom Field Technician", type: "magang", location: "Bandung", description: "Field technician untuk instalasi fiber optic.", requiredSkills: ["Fiber Optics", "Wireless Technology"], matchPercentage: 70, postedAt: "2026-02-10", deadline: "2026-03-25" },
    ],
  },

  "rpl-andi": {
    profile: { id: "usr-005", name: "Andi Pratama", email: "andi@student.smk.id", role: "student", major: "Rekayasa Perangkat Lunak", grade: "XI", avatar: "", createdAt: "2025-08-01" },
    hardSkills: [
      { id: "hs-a01", name: "HTML/CSS", category: "hard", level: 4 },
      { id: "hs-a02", name: "JavaScript", category: "hard", level: 3 },
      { id: "hs-a03", name: "React/Next.js", category: "hard", level: 2 },
      { id: "hs-a04", name: "Git", category: "hard", level: 3 },
      { id: "hs-a05", name: "Node.js", category: "hard", level: 2 },
    ],
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-a1", title: "Frontend Developer", description: "Membangun antarmuka pengguna responsif.", matchPercentage: 78, readinessScore: 78, requiredSkills: [{ id: "hs-01", name: "HTML/CSS", category: "hard", level: 5 }, { id: "hs-02", name: "JavaScript", category: "hard", level: 5 }, { id: "hs-04", name: "React/Next.js", category: "hard", level: 5 }], skillGaps: [{ name: "React/Next.js", current: 2, required: 5 }], category: "Software Engineering" },
    ],
    skillGaps: [{ skillName: "React/Next.js", currentLevel: 2, requiredLevel: 5, status: "needed" }],
    roadmapMilestones: [],
    projects: [
      { id: "pj-a01", title: "Blog Pribadi", description: "Blog personal dengan HTML/CSS dan JavaScript.", skills: ["HTML/CSS", "JavaScript"], completedAt: "2025-12-01" },
      { id: "pj-a02", title: "Todo App", description: "Aplikasi todo list sederhana dengan React.", skills: ["React/Next.js", "JavaScript"], completedAt: "2026-01-15" },
    ],
    jobOpportunities: [],
  },
  "rpl-rizky": {
    profile: { id: "usr-006", name: "Rizky Aditya", email: "rizky@student.smk.id", role: "student", major: "Rekayasa Perangkat Lunak", grade: "XII", avatar: "", createdAt: "2025-08-01" },
    hardSkills: [
      { id: "hs-r01", name: "JavaScript", category: "hard", level: 3 },
      { id: "hs-r02", name: "Python", category: "hard", level: 3 },
      { id: "hs-r03", name: "Git", category: "hard", level: 3 },
      { id: "hs-r04", name: "Node.js", category: "hard", level: 2 },
      { id: "hs-r05", name: "React/Next.js", category: "hard", level: 2 },
    ],
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-r1", title: "Fullstack Developer", description: "Mengembangkan aplikasi web end-to-end.", matchPercentage: 71, readinessScore: 71, requiredSkills: [{ id: "hs-01", name: "HTML/CSS", category: "hard", level: 5 }, { id: "hs-04", name: "React/Next.js", category: "hard", level: 4 }, { id: "hs-05", name: "Node.js", category: "hard", level: 4 }], skillGaps: [{ name: "Node.js", current: 2, required: 4 }], category: "Software Engineering" },
    ],
    skillGaps: [{ skillName: "Node.js", currentLevel: 2, requiredLevel: 4, status: "needed" }],
    roadmapMilestones: [],
    projects: [
      { id: "pj-r01", title: "Chat Application", description: "Aplikasi chat real-time dengan WebSocket.", skills: ["JavaScript", "Node.js"], completedAt: "2025-11-20" },
      { id: "pj-r02", title: "Weather API", description: "REST API cuaca dengan Python Flask.", skills: ["Python", "REST API"], completedAt: "2026-01-10" },
    ],
    jobOpportunities: [],
  },
  "dkv-lestari": {
    profile: { id: "usr-007", name: "Lestari Wijaya", email: "lestari@student.smk.id", role: "student", major: "Desain Komunikasi Visual", grade: "XI", avatar: "", createdAt: "2025-08-01" },
    hardSkills: [
      { id: "dk-l01", name: "Adobe Illustrator", category: "hard", level: 4 },
      { id: "dk-l02", name: "Adobe Photoshop", category: "hard", level: 4 },
      { id: "dk-l03", name: "Video Editing", category: "hard", level: 3 },
      { id: "dk-l04", name: "Copywriting", category: "hard", level: 3 },
      { id: "dk-l05", name: "UI/UX Design", category: "hard", level: 2 },
    ],
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-l1", title: "Graphic Designer", description: "Membuat visual branding dan marketing material.", matchPercentage: 83, readinessScore: 83, requiredSkills: [{ id: "dk-02", name: "Adobe Photoshop", category: "hard", level: 5 }, { id: "dk-03", name: "Adobe Illustrator", category: "hard", level: 5 }, { id: "dk-06", name: "Color Theory", category: "hard", level: 4 }], skillGaps: [], category: "Design" },
    ],
    skillGaps: [],
    roadmapMilestones: [],
    projects: [
      { id: "pj-l01", title: "Dashboard Admin", description: "Desain UI dashboard admin panel.", skills: ["UI/UX Design", "Adobe Photoshop"], completedAt: "2025-12-15" },
      { id: "pj-l02", title: "Landing Page Company", description: "Desain landing page untuk perusahaan startup.", skills: ["Adobe Illustrator", "Copywriting"], completedAt: "2026-01-20" },
    ],
    jobOpportunities: [],
  },
  "tkj-dedi": {
    profile: { id: "usr-008", name: "Dedi Kurniawan", email: "dedi@student.smk.id", role: "student", major: "Teknik Komputer dan Jaringan", grade: "XI", avatar: "", createdAt: "2025-08-01" },
    hardSkills: [
      { id: "tk-d01", name: "Linux Administration", category: "hard", level: 3 },
      { id: "tk-d02", name: "Python", category: "hard", level: 2 },
      { id: "tk-d03", name: "SQL/Database", category: "hard", level: 2 },
      { id: "tk-d04", name: "Networking", category: "hard", level: 2 },
    ],
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-dk1", title: "System Administrator", description: "Mengelola server dan infrastruktur IT.", matchPercentage: 58, readinessScore: 58, requiredSkills: [{ id: "tk-01", name: "Windows Server", category: "hard", level: 4 }, { id: "tk-02", name: "Linux Administration", category: "hard", level: 4 }], skillGaps: [{ name: "Windows Server", current: 0, required: 4 }], category: "IT Infrastructure" },
    ],
    skillGaps: [{ skillName: "Windows Server", currentLevel: 0, requiredLevel: 4, status: "needed" }],
    roadmapMilestones: [],
    projects: [
      { id: "pj-dk01", title: "Scraper Data", description: "Python script untuk scraping data produk.", skills: ["Python"], completedAt: "2025-12-05" },
      { id: "pj-dk02", title: "Report Generator", description: "Otomasi pembuatan laporan dari database.", skills: ["Python", "SQL/Database"], completedAt: "2026-01-18" },
    ],
    jobOpportunities: [],
  },
  tkj: {
    profile: { id: "usr-004", name: "Fajar Nugroho", email: "fajar@student.smk.id", role: "student", major: "Teknik Komputer dan Jaringan", grade: "XII", avatar: "", createdAt: "2025-08-01" },
    hardSkills: tkjHardSkills,
    softSkills: commonSoftSkills,
    careerMatches: [
      { id: "cm-k1", title: "System Administrator", description: "Mengelola server, sistem operasi, dan infrastruktur IT.", matchPercentage: 78, readinessScore: 78, requiredSkills: [{ id: "tk-01", name: "Windows Server", category: "hard", level: 4 }, { id: "tk-02", name: "Linux Administration", category: "hard", level: 4 }, { id: "tk-03", name: "Active Directory", category: "hard", level: 3 }], skillGaps: [], category: "IT Infrastructure" },
      { id: "cm-k2", title: "Network Administrator", description: "Mengelola dan mengamankan jaringan perusahaan.", matchPercentage: 75, readinessScore: 75, requiredSkills: [{ id: "tk-04", name: "Networking", category: "hard", level: 5 }, { id: "tk-05", name: "Cybersecurity Basics", category: "hard", level: 4 }, { id: "tk-02", name: "Linux Administration", category: "hard", level: 3 }], skillGaps: [], category: "IT Infrastructure" },
      { id: "cm-k3", title: "IT Support Specialist", description: "Troubleshooting hardware, software, dan user support.", matchPercentage: 85, readinessScore: 85, requiredSkills: [{ id: "tk-08", name: "Hardware Troubleshooting", category: "hard", level: 5 }, { id: "tk-01", name: "Windows Server", category: "hard", level: 3 }, { id: "tk-04", name: "Networking", category: "hard", level: 3 }], skillGaps: [], category: "IT Support" },
    ],
    skillGaps: [
      { skillName: "Windows Server", currentLevel: 3, requiredLevel: 4, status: "improving" },
      { skillName: "Linux Administration", currentLevel: 3, requiredLevel: 4, status: "improving" },
      { skillName: "Cybersecurity Basics", currentLevel: 2, requiredLevel: 4, status: "needed" },
      { skillName: "Cloud Basics", currentLevel: 1, requiredLevel: 3, status: "needed" },
    ],
    roadmapMilestones: [
      { id: "rk-01", title: "Windows Server Administration", description: "Pelajari instalasi, konfigurasi, dan manajemen Windows Server.", status: "completed", skills: ["Windows Server", "Active Directory"], estimatedHours: 12, resources: [{ title: "Windows Server Tutorial", url: "https://microsoft.com", type: "course" }] },
      { id: "rk-02", title: "Linux Administration", description: "Kuasai Linux: command line, service management, dan security.", status: "in_progress", skills: ["Linux Administration"], estimatedHours: 10, resources: [{ title: "Linux Basics for Beginners", url: "https://linuxfoundation.org", type: "course" }, { title: "Linux Command Line Tutorial", url: "https://youtube.com", type: "video" }] },
      { id: "rk-03", title: "Cybersecurity Fundamentals", description: "Pelajari konsep keamanan: firewall, IDS/IPS, hardening.", status: "available", skills: ["Cybersecurity Basics"], estimatedHours: 12, resources: [{ title: "Cybersecurity 101", url: "https://cybrary.it", type: "course" }] },
      { id: "rk-04", title: "Virtualization & Cloud", description: "Pelajari VMware, Hyper-V, dan dasar AWS/Azure.", status: "available", skills: ["Virtualization", "Cloud Basics"], estimatedHours: 10, resources: [{ title: "VMware Tutorial", url: "https://youtube.com", type: "video" }] },
      { id: "rk-05", title: "IT Infrastructure Project", description: "Setup lengkap: server, jaringan, dan security untuk kantor.", status: "locked", skills: ["Windows Server", "Networking", "Cybersecurity Basics"], estimatedHours: 20, resources: [{ title: "IT Infrastructure Setup", url: "https://youtube.com", type: "course" }] },
    ],
    projects: [
      { id: "pj-k1", title: "Lab Server Sekolah", description: "Setup 3 server: AD, DNS/DHCP, dan File Server.", skills: ["Windows Server", "Active Directory"], completedAt: "2025-11-22" },
      { id: "pj-k2", title: "Linux Web Server", description: "Deploy LAMP stack di Ubuntu Server dengan SSL.", skills: ["Linux Administration", "Networking"], completedAt: "2025-12-10" },
      { id: "pj-k3", title: "Helpdesk Ticketing System", description: "Sistem tiket support berbasis web untuk lab IT.", skills: ["Hardware Troubleshooting", "Windows Server"], completedAt: "2026-01-12" },
    ],
    jobOpportunities: [
      { id: "job-k1", company: "PT Telkom Indonesia", companyLogo: "", title: "System Admin Intern", type: "magang", location: "Jakarta (On-site)", description: "Magang administrasi server dan monitoring.", requiredSkills: ["Windows Server", "Linux Administration"], matchPercentage: 80, postedAt: "2026-02-01", deadline: "2026-03-15" },
      { id: "job-k2", company: "TechCorp Indonesia", companyLogo: "", title: "IT Support Specialist", type: "fulltime", location: "Bandung (On-site)", description: "Helpdesk dan troubleshooting IT karyawan.", requiredSkills: ["Hardware Troubleshooting", "Networking", "Windows Server"], matchPercentage: 85, postedAt: "2026-02-05", deadline: "2026-03-20" },
      { id: "job-k3", company: "Creative Studio", companyLogo: "", title: "Junior Cloud Engineer", type: "magang", location: "Remote", description: "Magang setup dan maintenance cloud server.", requiredSkills: ["Linux Administration", "Cloud Basics", "Networking"], matchPercentage: 60, postedAt: "2026-02-10", deadline: "2026-03-25" },
    ],
  },
};

// ===== Helper: Get student data by email prefix =====

export interface UserCredential {
  email: string;
  password: string;
  role: "student" | "admin" | "industry";
  name: string;
  company?: string;
  status?: "approved" | "pending" | "rejected";
}

export interface RegisteredUser {
  email: string;
  password: string;
  name: string;
  major: string;
  grade: string;
  role?: "student" | "industry" | "admin";
  company?: string;
  status?: "approved" | "pending" | "rejected";
  studentCard?: string;
  cardStatus?: "pending" | "approved";
}

const REGISTERED_USERS_KEY = "registeredUsers";

export function getRegisteredUsers(): RegisteredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function registerUser(user: RegisteredUser): boolean {
  const users = getRegisteredUsers();
  const exists = users.some((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) return false;
  users.push(user);
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  return true;
}

// ===== Student card verification helpers =====
export function isRegisteredStudent(email: string): boolean {
  if (typeof window === "undefined") return false;
  const lower = (email || "").toLowerCase();
  return getRegisteredUsers().some(
    (u) => u.role === "student" && u.email.toLowerCase() === lower
  );
}

export function getStudentCardDataUrl(email: string): string | null {
  if (typeof window === "undefined") return null;
  const lower = (email || "").toLowerCase();
  const u = getRegisteredUsers().find(
    (r) => r.role === "student" && r.email.toLowerCase() === lower
  );
  return u && u.studentCard ? u.studentCard : null;
}

function notifyStudentsUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("students-updated"));
}

export function getStudentCardStatus(email: string): "none" | "pending" | "approved" {
  if (typeof window === "undefined") return "none";
  if (!isRegisteredStudent(email)) return "approved";
  const lower = (email || "").toLowerCase();
  const u = getRegisteredUsers().find(
    (r) => r.role === "student" && r.email.toLowerCase() === lower
  );
  if (!u || !u.studentCard) return "none";
  return u.cardStatus || "pending";
}

export function saveStudentCardToProfile(email: string, dataUrl: string): boolean {
  if (typeof window === "undefined") return false;
  const lower = (email || "").toLowerCase();
  const arr = getRegisteredUsers().map((u) =>
    u.role === "student" && u.email.toLowerCase() === lower
      ? { ...u, studentCard: dataUrl, cardStatus: "pending" as const }
      : u
  );
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(arr));
  notifyStudentsUpdated();
  return arr.some((u) => u.role === "student" && u.email.toLowerCase() === lower);
}

export function removeStudentCard(email: string): void {
  if (typeof window === "undefined") return;
  const lower = (email || "").toLowerCase();
  const arr = getRegisteredUsers().map((u) =>
    u.role === "student" && u.email.toLowerCase() === lower
      ? { ...u, studentCard: undefined, cardStatus: undefined }
      : u
  );
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(arr));
  notifyStudentsUpdated();
}

export function approveStudentCard(email: string): boolean {
  if (typeof window === "undefined") return false;
  const lower = (email || "").toLowerCase();
  const arr = getRegisteredUsers().map((u) =>
    u.role === "student" && u.email.toLowerCase() === lower && u.studentCard
      ? { ...u, cardStatus: "approved" as const }
      : u
  );
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(arr));
  notifyStudentsUpdated();
  return arr.some(
    (u) => u.role === "student" && u.email.toLowerCase() === lower && u.cardStatus === "approved"
  );
}

export function isStudentCardVerified(email: string): boolean {
  if (!isRegisteredStudent(email)) return true;
  return getStudentCardStatus(email) === "approved";
}

export function getPendingCardStudents(): RegisteredUser[] {
  if (typeof window === "undefined") return [];
  return getRegisteredUsers().filter(
    (u) => u.role === "student" && !!u.studentCard && u.cardStatus !== "approved" && u.status === "approved"
  );
}

export const userCredentials: UserCredential[] = [
  { email: "budi@student.smk.id", password: "Budi@2026!", role: "student", name: "Budi Santoso" },
  { email: "rina@student.smk.id", password: "Rina@2026!", role: "student", name: "Rina Wulandari" },
  { email: "hendra@student.smk.id", password: "Hendra@2026!", role: "student", name: "Hendra Susanto" },
  { email: "fajar@student.smk.id", password: "Fajar@2026!", role: "student", name: "Fajar Nugroho" },
  { email: "andi@student.smk.id", password: "Andi@2026!", role: "student", name: "Andi Pratama" },
  { email: "rizky@student.smk.id", password: "Rizky@2026!", role: "student", name: "Rizky Aditya" },
  { email: "lestari@student.smk.id", password: "Lestari@2026!", role: "student", name: "Lestari Wijaya" },
  { email: "dedi@student.smk.id", password: "Dedi@2026!", role: "student", name: "Dedi Kurniawan" },
  { email: "admin@smk.id", password: "Admin@2026!", role: "admin", name: "Admin SMK" },
  { email: "hrd@techcorp.com", password: "TechCorp@2026!", role: "industry", name: "Sari Dewi", company: "TechCorp Indonesia", status: "approved" },
  { email: "recruit@creativestudio.com", password: "Creative@2026!", role: "industry", name: "Rina Hartono", company: "Creative Studio", status: "approved" },
  { email: "info@telkom.co.id", password: "Telkom@2026!", role: "industry", name: "Bambang Sutrisno", company: "PT Telkom Indonesia", status: "approved" },
  { email: "hrd@digitaloutsource.co.id", password: "Digital@2026!", role: "industry", name: "Maya Putri", company: "Digital Outsource", status: "pending" },
];

export function validateLogin(email: string, password: string): UserCredential | null {
  const user = userCredentials.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (user) {
    if (user.role === "industry" && user.status && user.status !== "approved") return null;
    return user;
  }
  const registered = getRegisteredUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (registered) {
    if (registered.role === "industry" && registered.status && registered.status !== "approved") return null;
    if (registered.role === "student" && registered.status && registered.status !== "approved") return null;
    return { email: registered.email, password: registered.password, role: (registered.role as "student" | "industry" | "admin") || "student", name: registered.name, company: registered.company, status: registered.status };
  }
  return null;
}

export function getUserRole(email: string): "student" | "admin" | "industry" {
  const lower = email.toLowerCase();
  if (lower.includes("admin") || lower.includes("guru")) return "admin";
  if (lower.includes("industry") || lower.includes("hrd")) return "industry";
  const cred = userCredentials.find((u) => u.email.toLowerCase() === lower);
  if (cred) return cred.role;
  const registered = getRegisteredUsers().find((u) => u.email.toLowerCase() === lower);
  if (registered?.role === "industry") return "industry";
  return "student";
}

export function getIndustryCompany(email: string): string {
  const lower = email.toLowerCase();
  const cred = userCredentials.find((u) => u.email.toLowerCase() === lower);
  if (cred?.company) return cred.company;
  const registered = getRegisteredUsers().find((u) => u.email.toLowerCase() === lower);
  if (registered?.company) return registered.company;
  return "Perusahaan";
}

// ===== Admin Management Functions =====

export function getAllIndustries(): UserCredential[] {
  const builtIn = userCredentials.filter((u) => u.role === "industry");
  const registered = getRegisteredUsers().filter((u) => u.role === "industry").map((u) => ({
    email: u.email,
    password: u.password,
    role: "industry" as const,
    name: u.name,
    company: u.company,
    status: (u.status as "approved" | "pending" | "rejected") || "pending",
  }));
  return [...builtIn, ...registered];
}

export function approveIndustry(email: string): void {
  const lower = email.toLowerCase();
  const idx = userCredentials.findIndex((u) => u.email.toLowerCase() === lower && u.role === "industry");
  if (idx !== -1) {
    userCredentials[idx].status = "approved";
    return;
  }
  const users = getRegisteredUsers();
  const rIdx = users.findIndex((u) => u.email.toLowerCase() === lower && u.role === "industry");
  if (rIdx !== -1) {
    users[rIdx].status = "approved";
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  }
}

export function rejectIndustry(email: string): void {
  const lower = email.toLowerCase();
  const idx = userCredentials.findIndex((u) => u.email.toLowerCase() === lower && u.role === "industry");
  if (idx !== -1) {
    userCredentials[idx].status = "rejected";
    return;
  }
  const users = getRegisteredUsers();
  const rIdx = users.findIndex((u) => u.email.toLowerCase() === lower && u.role === "industry");
  if (rIdx !== -1) {
    users[rIdx].status = "rejected";
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  }
}

// ===== Student Registration (Kartu Pelajar) Management =====

export function normalizeGrade(grade: string): string {
  const t = grade.trim().toLowerCase();
  if (t === "x") return "X";
  if (t === "xi") return "XI";
  if (t === "xii") return "XII";
  if (t === "alumni") return "Alumni";
  return grade;
}

export function majorCodeToName(code: string): string {
  const map: Record<string, string> = {
    rpl: "Rekayasa Perangkat Lunak",
    dkv: "Desain Komunikasi Visual",
    tkj: "Teknik Komputer dan Jaringan",
    tt: "Teknik Transmisi",
  };
  return map[code] || code;
}

export function getPendingStudentRegistrations(): RegisteredUser[] {
  return getRegisteredUsers().filter((u) => u.role === "student");
}

export function setRegistrationStatus(email: string, status: "approved" | "rejected" | "pending"): void {
  const lower = email.toLowerCase();
  const users = getRegisteredUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === lower);
  if (idx !== -1) {
    users[idx].status = status;
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    return;
  }
  const cIdx = userCredentials.findIndex((u) => u.email.toLowerCase() === lower);
  if (cIdx !== -1) userCredentials[cIdx].status = status;
}

const GRADE_OVERRIDE_KEY = "student_grade_overrides";

export function getGradeOverride(email: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const map = JSON.parse(localStorage.getItem(GRADE_OVERRIDE_KEY) || "{}");
    const g = map[email.toLowerCase()];
    return typeof g === "string" ? g : null;
  } catch {
    return null;
  }
}

export function setGradeOverride(email: string, grade: string): void {
  if (typeof window === "undefined") return;
  const map = JSON.parse(localStorage.getItem(GRADE_OVERRIDE_KEY) || "{}");
  map[email.toLowerCase()] = grade;
  localStorage.setItem(GRADE_OVERRIDE_KEY, JSON.stringify(map));
}

export function getAllStudentsList(): {
  name: string;
  email: string;
  major: string;
  grade: string;
  source: "seed" | "registered";
}[] {
  const seeds = Object.values(students).map((s) => ({
    name: s.profile.name,
    email: s.profile.email,
    major: s.profile.major,
    grade: getGradeOverride(s.profile.email) || s.profile.grade,
    source: "seed" as const,
  }));
  const regs = getRegisteredUsers()
    .filter((u) => u.role === "student")
    .map((u) => ({
      name: u.name,
      email: u.email,
      major: majorCodeToName(u.major),
      grade: getGradeOverride(u.email) || normalizeGrade(u.grade || "XI"),
      source: "registered" as const,
    }));
  return [...seeds, ...regs];
}

export function getAllAdmins(): UserCredential[] {
  const builtIn = userCredentials.filter((u) => u.role === "admin");
  const registered = getRegisteredUsers().filter((u) => u.role === "admin").map((u) => ({
    email: u.email,
    password: u.password,
    role: "admin" as const,
    name: u.name,
  }));
  return [...builtIn, ...registered];
}

export function registerAdmin(user: { email: string; password: string; name: string }): boolean {
  const users = getRegisteredUsers();
  const exists = users.some((u) => u.email.toLowerCase() === user.email.toLowerCase()) ||
    userCredentials.some((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) return false;
  users.push({ email: user.email, password: user.password, name: user.name, major: "Admin", grade: "-", role: "admin" });
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  return true;
}

function getStudentByEmail(email: string): StudentData | null {
  const lower = email.toLowerCase();
  let base: StudentData | null = null;

  const registered = getRegisteredUsers().find(
    (u) => u.role === "student" && u.email.toLowerCase() === lower
  );
  if (registered) {
    base = students.rpl;
    base = {
      ...base,
      profile: {
        ...base.profile,
        email: registered.email,
        name: registered.name,
        major: majorCodeToName(registered.major),
        grade: normalizeGrade(registered.grade || "XI"),
      },
    };
  } else if (lower.includes("andi")) base = students["rpl-andi"];
  else if (lower.includes("rizky")) base = students["rpl-rizky"];
  else if (lower.includes("lestari")) base = students["dkv-lestari"];
  else if (lower.includes("dedi")) base = students["tkj-dedi"];
  else if (lower.includes("budi")) base = students.rpl;
  else if (lower.includes("rina")) base = students.dkv;
  else if (lower.includes("hendra")) base = students.tt;
  else if (lower.includes("fajar")) base = students.tkj;
  else if (lower.includes("rpl")) base = students.rpl;
  else if (lower.includes("dkv")) base = students.dkv;
  else if (lower.includes("tt")) base = students.tt;
  else if (lower.includes("tkj")) base = students.tkj;

  if (!base) return null;
  const override = getGradeOverride(lower);
  if (override) base = { ...base, profile: { ...base.profile, grade: override } };
  return base;
}

// ===== Helper: Get student data from localStorage =====
export function getCurrentStudent(): StudentData | null {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem("studentEmail");
  if (!email) return students.rpl;
  return getStudentByEmail(email) || students.rpl;
}

// ===== Helper: Get student data by URL slug (for public portfolio) =====
export function getStudentBySlug(slug: string): StudentData | null {
  const lower = slug.toLowerCase();
  const list = Object.values(students);
  return list.find((s) => {
    const sSlug = s.profile.name.toLowerCase().replace(/\s+/g, "-");
    return sSlug === lower;
  }) || null;
}

// ===== Computed student statistics (real data: seeds + approved registrations) =====

function readStoredCareerMatches(email: string): CareerMatch[] | null {
  if (typeof window === "undefined") return null;
  const lower = email.toLowerCase();
  try {
    const stored = window.localStorage.getItem(`career_matches_${lower}`);
    if (stored) {
      const arr = JSON.parse(stored);
      if (Array.isArray(arr)) return arr as CareerMatch[];
    }
  } catch {}
  return null;
}

export function getStudentReadiness(email: string): number | null {
  const lower = email.toLowerCase();
  const seed = Object.values(students).find((s) => s.profile.email.toLowerCase() === lower);
  const matches = seed ? seed.careerMatches : readStoredCareerMatches(lower);
  if (!matches || matches.length === 0) return null;
  const total = matches.reduce((a, m) => a + (m.readinessScore || 0), 0);
  return Math.round(total / matches.length);
}

export function getStudentAssessmentStatus(email: string): "assessed" | "pending" {
  return getStudentReadiness(email) === null ? "pending" : "assessed";
}

export function getStudentStats(): StudentStats {
  const seeds = Object.values(students);
  const all = getAllStudentsList();

  const assessed = all.filter((s) => getStudentReadiness(s.email) !== null);
  const avgReadinessScore =
    assessed.length === 0
      ? 0
      : Math.round(
          assessed.reduce((a, s) => a + (getStudentReadiness(s.email) || 0), 0) / assessed.length
        );

  const careerTally = new Map<string, number>();
  all.forEach((s) => {
    const matches =
      seeds.find((x) => x.profile.email.toLowerCase() === s.email.toLowerCase())?.careerMatches ||
      readStoredCareerMatches(s.email) ||
      [];
    matches.forEach((m) => {
      careerTally.set(m.title, (careerTally.get(m.title) || 0) + 1);
    });
  });
  const topCareers = Array.from(careerTally.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const majorsOrder = [
    "Rekayasa Perangkat Lunak",
    "Desain Komunikasi Visual",
    "Teknik Komputer dan Jaringan",
    "Teknik Transmisi",
  ];
  const majorMap = new Map<string, { total: number; assessed: number }>();
  all.forEach((s) => {
    const cur = majorMap.get(s.major) || { total: 0, assessed: 0 };
    cur.total += 1;
    if (getStudentReadiness(s.email) !== null) cur.assessed += 1;
    majorMap.set(s.major, cur);
  });
  const majors = [
    ...majorsOrder,
    ...Array.from(majorMap.keys()).filter((m) => !majorsOrder.includes(m)),
  ].filter((m) => majorMap.has(m));

  const readinessByMajor = majors.map((major) => {
    const studentsInMajor = all.filter((s) => s.major === major);
    const assessedIn = studentsInMajor.filter((s) => getStudentReadiness(s.email) !== null);
    const score =
      assessedIn.length === 0
        ? 0
        : Math.round(
            assessedIn.reduce((a, s) => a + (getStudentReadiness(s.email) || 0), 0) /
              assessedIn.length
          );
    return { major, score };
  });

  return {
    totalStudents: all.length,
    assessedStudents: assessed.length,
    avgReadinessScore,
    topCareers,
    readinessByMajor,
  };
}
