import { FileDown, Mail } from "lucide-react";
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
          <p className="mt-5 text-sm font-medium text-gray-900">
            {profile.availability}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.contact.email}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-brand text-white hover:bg-brand-strong",
              )}
            >
              <Mail className="mr-1.5 h-4 w-4" />
              Falar por email
            </a>
            <Link
              href="/cv/developer"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <FileDown className="mr-1.5 h-4 w-4" />
              Currículo
            </Link>
            <Link
              href="#cases"
              className="px-2 text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              Ver cases
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[2/3] w-full max-w-48 md:max-w-xs overflow-hidden rounded-3xl bg-brand-soft">
          <Image
            src={profile.photo}
            alt={`Foto de ${profile.shortName}`}
            fill
            priority
            sizes="(min-width: 768px) 320px, 192px"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
