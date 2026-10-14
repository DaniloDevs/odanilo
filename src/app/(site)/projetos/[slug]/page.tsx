import { ArrowLeft, ExternalLink, Github, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { getProject, getProjects } from "@/content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="px-6 pt-10 pb-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Projetos
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-brand">
          {project.status} · {project.role}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded bg-brand-soft px-2 py-0.5 font-mono text-xs text-brand-strong"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.visibility === "public" && project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <Github className="mr-1.5 h-4 w-4" />
              Código
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <ExternalLink className="mr-1.5 h-4 w-4" />
              Ver no ar
            </a>
          )}
          {project.visibility === "private" && (
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              Repositório privado. Esta página descreve o problema e as
              decisões, sem expor código.
            </span>
          )}
        </div>

        {project.case ? (
          <div className="mt-14 space-y-12">
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                O problema
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                {project.case.problem}
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Decisões de arquitetura
              </h2>
              <ol className="mt-5 space-y-6">
                {project.case.decisions.map((d, i) => (
                  <li key={d.title} className="flex gap-4">
                    <span className="font-mono text-sm text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{d.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {d.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Trade-offs
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                {project.case.tradeoffs.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Situação
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                {project.case.result}
              </p>
            </section>
          </div>
        ) : project.featured ? (
          <p className="mt-14 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600">
            O case completo deste projeto está em preparação.
          </p>
        ) : null}
      </div>
    </article>
  );
}
