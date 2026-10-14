import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { buttonVariants } from "@/components/ui/button-variants";
import { getAcademy, getTeaching } from "@/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Techs Academy",
  description:
    "Cursos de informática para quem quer aprender fazendo. Metodologia e docência.",
};

export default async function AcademyPage() {
  const [academy, teaching] = await Promise.all([getAcademy(), getTeaching()]);

  return (
    <>
      <PageHeader
        eyebrow="Docência"
        title={academy.name}
        description={`${academy.tagline} ${academy.intro}`}
      />

      <section className="px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-3">
          <a
            href={academy.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-academy text-gray-950 hover:bg-academy-strong",
            )}
          >
            Conhecer o curso
          </a>
          <a
            href={academy.hubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Ver todos os cursos
          </a>
        </div>
      </section>

      <section className="bg-academy-soft px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Como eu ensino
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {academy.pillars.map((p, i) => (
              <div key={p.title}>
                <span className="font-mono text-sm text-amber-800">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-gray-700">
            {academy.structure}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Em sala de aula
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {teaching.subjects.map((s) => (
              <div
                key={s.name}
                className="rounded-xl border border-gray-200 p-5"
              >
                <h3 className="font-semibold text-gray-900">{s.name}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {s.audience} · {s.level} · {s.institution}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {teaching.talks.length > 0 && (
            <>
              <h2 className="mt-14 text-2xl font-bold tracking-tight text-gray-900">
                Palestras
              </h2>
              <div className="mt-6 space-y-5">
                {teaching.talks.map((t) => (
                  <div key={t.title}>
                    <h3 className="font-semibold text-gray-900">
                      {t.title}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        ({t.year})
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500">{t.event}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
