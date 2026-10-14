import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/site/contact-cta";
import { PageHeader } from "@/components/site/page-header";
import Timeline from "@/components/site/timeline";
import { getExperience, getProfile } from "@/content";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Desenvolvedor fullstack e professor técnico de TI: método, experiência e stack.",
};

export default async function AboutPage() {
  const [profile, experience] = await Promise.all([
    getProfile(),
    getExperience(),
  ]);

  return (
    <>
      <PageHeader eyebrow="Sobre" title={profile.name} />

      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[1fr_1.6fr]">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-3xl bg-brand-soft">
            <Image
              src={profile.photo}
              alt={`Foto de ${profile.shortName}`}
              fill
              sizes="(min-width: 768px) 320px, 70vw"
              className="object-contain object-bottom"
            />
          </div>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-gray-900">
            Experiência
          </h2>
          <Timeline
            items={experience}
            renderItem={(e) => (
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">{e.company}</h3>
                  <span className="text-xs text-gray-500">{e.period}</span>
                </div>
                <p className="text-sm text-brand">{e.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {e.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          />
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
            Stack
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profile.skills.map((g) => (
              <div key={g.category}>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  {g.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white px-2 py-0.5 font-mono text-[11px] text-gray-700 ring-1 ring-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta profile={profile} />
    </>
  );
}
