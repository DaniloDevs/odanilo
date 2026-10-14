import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import type { Profile } from "@/content/types";
import { cn } from "@/lib/utils";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="px-6 pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            {profile.shortName}
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {profile.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600">
            {profile.subheadline}
          </p>
          <p className="mt-3 text-sm text-gray-500">{profile.availability}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#cases"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-brand text-white hover:bg-brand-strong",
              )}
            >
              Ver cases
            </Link>
            <Link
              href="/academy"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Techs Academy
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-3xl bg-brand-soft">
          <Image
            src={profile.photo}
            alt={`Foto de ${profile.shortName}`}
            fill
            priority
            sizes="(min-width: 768px) 320px, 70vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
