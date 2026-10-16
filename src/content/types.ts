export type ProjectStatus =
  | "Em produção"
  | "Em desenvolvimento"
  | "Open source"
  | "Projeto pessoal"
  | "Cliente";

export interface ProjectCase {
  problem: string;
  decisions: { title: string; body: string }[];
  tradeoffs: string[];
  result: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  status: ProjectStatus;
  visibility: "public" | "private";
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
  case?: ProjectCase;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  track: "dev" | "teaching";
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  availability: string;
  photo: string;
  contact: { email: string; linkedin: string; github: string };
  about: string[];
  skills: SkillGroup[];
}

export interface Academy {
  name: string;
  tagline: string;
  hubUrl: string;
  courseUrl: string;
  intro: string;
  structure: string;
  pillars: { title: string; body: string }[];
}

export interface TeachingRole {
  institution: string;
  role: string;
  period: string;
  subjects: string[];
}

export interface Subject {
  name: string;
  audience: string;
  level: string;
  description: string;
  institution: string;
}

export interface Talk {
  title: string;
  event: string;
  year: string;
  description: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}
