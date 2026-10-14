import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import type { Academy } from "@/content/types";
import { cn } from "@/lib/utils";
import SectionWrapper from "./section-wrapper";

export function AcademyCta({ academy }: { academy: Academy }) {
  return (
    <SectionWrapper className="bg-academy-soft">
      <p className="font-mono text-xs uppercase tracking-widest text-academy-strong">
        Docência
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
        {academy.name}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
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
    </SectionWrapper>
  );
}
