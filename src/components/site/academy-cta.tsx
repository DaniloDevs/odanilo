import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import type { Academy } from "@/content/types";
import { cn } from "@/lib/utils";
import SectionWrapper from "./section-wrapper";

export function AcademyCta({ academy }: { academy: Academy }) {
  return (
    <SectionWrapper className="border-y border-amber-200 bg-academy-soft py-14 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-amber-800">
            Docência
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {academy.name}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-700">
            {academy.tagline} {academy.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
            <Link
              href="/academy"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Metodologia
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-gray-900">
            Como o curso ensina
          </h3>
          <ul className="mt-4 divide-y divide-amber-100">
            {academy.pillars.map((p) => (
              <li key={p.title} className="py-3 text-sm text-gray-700">
                {p.title}
              </li>
            ))}
          </ul>
          <p className="mt-2 border-t border-amber-200 pt-4 text-xs text-gray-600">
            4 ciclos baseados na taxonomia de Bloom.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
