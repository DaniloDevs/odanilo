import { FileDown, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import type { Profile } from "@/content/types";
import { cn } from "@/lib/utils";

export function ContactCta({ profile }: { profile: Profile }) {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
          Vamos conversar?
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-gray-600">
          Tem uma vaga, um projeto ou quer trocar ideia sobre sistemas e ensino?
          Escreva.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.contact.email}`}
            className={cn(
              buttonVariants(),
              "bg-brand text-white hover:bg-brand-strong",
            )}
          >
            <Mail className="mr-1.5 h-4 w-4" />
            Email
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            <Linkedin className="mr-1.5 h-4 w-4" />
            LinkedIn
          </a>
          <Link
            href="/cv/developer"
            className={buttonVariants({ variant: "outline" })}
          >
            <FileDown className="mr-1.5 h-4 w-4" />
            Currículo dev
          </Link>
          <Link
            href="/cv/teacher"
            className={buttonVariants({ variant: "outline" })}
          >
            <FileDown className="mr-1.5 h-4 w-4" />
            Currículo docente
          </Link>
        </div>
      </div>
    </section>
  );
}
