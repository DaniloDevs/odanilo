import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-md">
        <p className="font-mono text-sm text-brand">404</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          O endereço pode ter mudado ou nunca ter existido. Os cases e o contato
          continuam no site.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-brand text-white hover:bg-brand-strong",
            )}
          >
            Voltar ao início
          </Link>
          <Link
            href="/projetos"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Ver projetos
          </Link>
        </div>
      </div>
    </main>
  );
}
