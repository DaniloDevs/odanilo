import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/content/types";

export function CaseCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-brand/40 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg leading-snug font-semibold text-gray-900">
          {project.title}
        </h3>
        <Badge
          variant="outline"
          className="shrink-0 border-gray-200 text-[10px] text-gray-500"
        >
          {project.status}
        </Badge>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-gray-600">
        {project.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded bg-brand-soft px-2 py-0.5 font-mono text-[11px] text-brand-strong"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          {project.visibility === "private" && (
            <>
              <Lock className="h-3 w-3" /> Repositório privado
            </>
          )}
        </span>
        {project.case ? (
          <span className="flex items-center gap-1 font-medium text-brand group-hover:text-brand-strong">
            Ler case
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        ) : (
          <span className="text-gray-500">Case em preparação</span>
        )}
      </div>
    </Link>
  );
}
