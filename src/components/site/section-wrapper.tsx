"use client";

import { motion, useReducedMotion } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "dark";
}

export default function SectionWrapper({
  children,
  className,
  id,
  tone = "light",
}: SectionWrapperProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "px-6 py-16 md:py-24",
        tone === "dark" && "bg-graphite text-gray-100",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </motion.section>
  );
}
