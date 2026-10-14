import { academy } from "./data/academy";
import { experience } from "./data/experience";
import { posts } from "./data/posts";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { teaching } from "./data/teaching";
import type {
  Academy,
  Experience,
  Post,
  Profile,
  Project,
  Subject,
  Talk,
  TeachingRole,
} from "./types";

export async function getProfile(): Promise<Profile> {
  return profile;
}

export async function getProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getExperience(): Promise<Experience[]> {
  return experience;
}

export async function getAcademy(): Promise<Academy> {
  return academy;
}

export async function getTeaching(): Promise<{
  roles: TeachingRole[];
  subjects: Subject[];
  talks: Talk[];
}> {
  return teaching;
}

export async function getPosts(): Promise<Post[]> {
  return posts;
}
