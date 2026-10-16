"use client";

import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/projetos", label: "Projetos" },
  { to: "/academy", label: "Academy" },
  { to: "/blog", label: "Blog" },
  { to: "/sobre", label: "Sobre" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(`${to}/`);

  // Fecha o menu ao navegar para outra página.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname é o gatilho
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Esc fecha o menu e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav
      aria-label="Principal"
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-gray-900"
        >
          {siteConfig.shortName}
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              aria-current={isActive(l.to) ? "page" : undefined}
              className={`text-sm transition-colors ${
                isActive(l.to)
                  ? "font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contato"
            aria-label="Contato"
            title="Contato"
            className="inline-flex size-9 items-center justify-center rounded-md bg-brand text-white transition-colors hover:bg-brand-strong"
          >
            <Mail className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(!open)}
          className="-mr-2.5 inline-flex size-11 items-center justify-center text-gray-600 sm:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="border-b border-gray-100 bg-white px-6 pb-3 sm:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.to) ? "page" : undefined}
              className={`flex min-h-11 items-center text-sm ${
                isActive(l.to) ? "font-medium text-gray-900" : "text-gray-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contato"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-2 text-sm font-medium text-brand"
          >
            <Mail className="size-4" aria-hidden="true" />
            Contato
          </Link>
        </div>
      )}
    </nav>
  );
}
