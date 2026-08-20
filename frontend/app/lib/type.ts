export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "industry";
  major: string;
  grade: string;
  avatar: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "hard" | "soft";
  level: number; // 1-5
  icon?: string;
}

export interface SkillProfile {
  userId: string;
  skills: Skill[];
  completedAt?: string;
}

export interface CareerMatch {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  requiredSkills: Skill[];
  category: string;
}

export interface SkillGap {
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  status: "mastered" | "improving" | "needed";
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  status: "locked" | "available" | "in_progress" | "completed";
  skills: string[];
  estimatedHours: number;
  resources: RoadmapResource[];
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: "article" | "video" | "course" | "practice";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  imageUrl?: string;
  projectUrl?: string;
  completedAt: string;
}

export interface JobOpportunity {
  id: string;
  company: string;
  companyLogo: string;
  title: string;
  type: "magang" | "fulltime" | "parttime" | "freelance";
  location: string;
  description: string;
  requiredSkills: string[];
  matchPercentage: number;
  postedAt: string;
  deadline: string;
}

export interface Portfolio {
  user: UserProfile;
  skills: Skill[];
  readinessScore: number;
  projects: Project[];
  careerMatches: CareerMatch[];
  publicUrl: string;
}

export interface StudentStats {
  totalStudents: number;
  assessedStudents: number;
  avgReadinessScore: number;
  topCareers: { name: string; count: number }[];
  readinessByMajor: { major: string; score: number }[];
}

export interface AssessmentAnswer {
  skillId: string;
  level: number;
}