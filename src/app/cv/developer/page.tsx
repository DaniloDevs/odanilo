import type { Metadata } from "next";
import CvDeveloperClient from "@/components/cv/developer-client";
import { getExperience, getProfile, getProjects } from "@/content";

export const metadata: Metadata = { title: "Currículo — Desenvolvedor" };

export default async function CvDeveloperPage() {
  const [profile, experience, projects] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
  ]);

  return (
    <CvDeveloperClient
      profile={profile}
      experience={experience}
      projects={projects}
      skills={profile.skills}
    />
  );
}
