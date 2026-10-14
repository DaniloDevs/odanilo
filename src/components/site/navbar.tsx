"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { to: "/projetos", label: "Projetos" },
  { to: "/academy", label: "Academy" },
  { to: "/blog", label: "Blog" },
  { to: "/sobre", label: "Sobre" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(`${to}/`);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
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
              className={`text-sm transition-colors ${
                isActive(l.to)
                  ? "font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-gray-500 sm:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="space-y-3 border-b border-gray-100 bg-white px-6 pb-4 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className={`block py-1 text-sm ${
                isActive(l.to) ? "font-medium text-gray-900" : "text-gray-500"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
