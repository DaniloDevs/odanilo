import type { Metadata } from "next";
import CvTeacherClient from "@/components/cv/teacher-client";
import { getProfile, getTeaching } from "@/content";

export const metadata: Metadata = { title: "Currículo — Professor" };

export default async function CvTeacherPage() {
  const [profile, teaching] = await Promise.all([getProfile(), getTeaching()]);

  return (
    <CvTeacherClient
      profile={profile}
      roles={teaching.roles}
      subjects={teaching.subjects}
      talks={teaching.talks}
    />
  );
}
