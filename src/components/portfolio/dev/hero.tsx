'use client'
import { motion } from "framer-motion";
import { developerData, profileData } from "../data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function DevHero() {
    const { hero } = developerData;

    return (
        <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        {hero.headline}
                    </h1>
                    <p className="mt-4 text-base text-gray-500 leading-relaxed max-w-lg">
                        {hero.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                        {hero.stack.map((t) => (
                            <Badge
                                key={t}
                                variant="secondary"
                                className="bg-blue-50 text-blue-700 border-0 font-mono text-xs px-2.5 py-1"
                            >
                                {t}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() =>
                                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Ver projetos
                        </Button>
                        <Link href={profileData.contact.github} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" >
                                <Github className="w-4 h-4 mr-1.5" />
                                GitHub
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Terminal visual */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="hidden md:block"
                >
                    <div className="rounded-xl border border-gray-200 bg-gray-950 overflow-hidden shadow-lg">
                        <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-900">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            <span className="ml-3 text-xs text-gray-500 font-mono">terminal</span>
                        </div>
                        <div className="p-5 font-mono text-sm text-gray-300 space-y-2">
                            <p>
                                <span className="text-green-400">~</span>{" "}
                                <span className="text-blue-400">npm run</span> build-amazing-things
                            </p>
                            <p className="text-gray-500">✓ Compiling projects...</p>
                            <p className="text-gray-500">✓ Running tests — all passed</p>
                            <p className="text-gray-500">✓ Deploying to production</p>
                            <p className="text-emerald-400 mt-2">
                                🚀 Ready. Let's build something great.
                            </p>
                            <p className="text-gray-600 animate-pulse">▋</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}