'use client'

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileData } from "./data";

export default function NavBar({ theme = "neutral" }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const accentClass =
        theme === "dev"
            ? "text-blue-600"
            : theme === "teacher"
                ? "text-emerald-600"
                : "text-gray-900";

    const links = [
        { to: "/", label: "Home" },
        { to: "/Developer", label: "Developer" },
        { to: "/Teacher", label: "Professor" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-6">
                <Link href="/" className={`font-semibold text-sm tracking-tight ${accentClass}`}>
                    {profileData.name}
                </Link>

                {/* Desktop */}
                <div className="hidden sm:flex items-center gap-6">
                    {links.map((l) => (
                        <Link
                            key={l.to}
                            href={l.to}
                            className={`text-sm transition-colors ${pathname === l.to
                                ? "text-gray-900 font-medium"
                                : "text-gray-400 hover:text-gray-700"
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="sm:hidden text-gray-500"
                    aria-label="Menu"
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="sm:hidden border-b border-gray-100 bg-white px-6 pb-4 space-y-3">
                    {links.map((l) => (
                        <Link
                            key={l.to}
                            href={l.to}
                            onClick={() => setOpen(false)}
                            className={`block text-sm py-1 ${pathname === l.to
                                ? "text-gray-900 font-medium"
                                : "text-gray-500"
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