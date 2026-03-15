
import NavBar from "@/components/portfolio/navbar";
import Footer from "@/components/portfolio/footer";
import TeacherHero from "@/components/portfolio/teacher/hero";
import TeacherAbout from "@/components/portfolio/teacher/about";
import TeacherCourses from "@/components/portfolio/teacher/courses";
import TeacherExperience from "@/components/portfolio/teacher/experience";
import TeacherTalks from "@/components/portfolio/teacher/talks";
import TeacherCTA from "@/components/portfolio/teacher/cta";

export default function Teacher() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar theme="teacher" />
      <TeacherHero />
      <TeacherAbout />
      <TeacherCourses />
      <TeacherExperience />
      <TeacherTalks />
      <TeacherCTA />
      <Footer />
    </div>
  );
}