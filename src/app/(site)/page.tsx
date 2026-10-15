import { AcademyCta } from "@/components/site/academy-cta";
import { CaseCard } from "@/components/site/case-card";
import { Hero } from "@/components/site/hero";
import SectionWrapper from "@/components/site/section-wrapper";
import { WorkMethod } from "@/components/site/work-method";
import { getAcademy, getFeaturedProjects, getProfile } from "@/content";

export default async function Home() {
  const [profile, featured, academy] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getAcademy(),
  ]);

  return (
    <>
      <Hero profile={profile} />
      <SectionWrapper id="cases" className="scroll-mt-14">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Cases em destaque
        </h2>
        <p className="mb-10 text-sm text-gray-500">
          Sistemas que desenhei e mantenho. Os repositórios são privados, então
          cada case conta o problema, as decisões e os trade-offs sem expor
          código. O BlueDraft já está completo; os outros dois estão em
          preparação.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <CaseCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionWrapper>
      <WorkMethod />
      <AcademyCta academy={academy} />
    </>
  );
}
