import { ArrowUpRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CaseCard } from "@/components/site/case-card";
import { PageHeader } from "@/components/site/page-header";
import { getFeaturedProjects, getProjects } from "@/content";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Cases e projetos: problema, decisões de arquitetura e trade-offs.",
};

export default async function ProjectsPage() {
  const [featured, all] = await Promise.all([
    getFeaturedProjects(),
    getProjects(),
  ]);
  const others = all.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Projetos"
        title="Cases e projetos"
        description="Os destaques são privados e descritos como cases: problema, decisões de arquitetura e trade-offs. Os demais têm código aberto ou foram entregues a clientes."
      />
      <section className="px-6 py-10">
        <h2 className="sr-only">Cases em destaque</h2>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <CaseCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section className="px-6 pt-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900">
            Outros projetos
          </h2>
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projetos/${p.slug}`}
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {p.title}
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        {p.status}
                      </span>
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-600">
                      {p.summary}
                    </p>
                  </div>
                  {p.visibility === "private" ? (
                    <Lock className="h-4 w-4 shrink-0 text-gray-400" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-brand" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
