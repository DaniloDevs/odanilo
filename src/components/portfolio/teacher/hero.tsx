'use client';
import React from "react";
import { motion } from "framer-motion";
import { teacherData } from "../data";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function TeacherHero() {
  const { hero } = teacherData;

  return (
    <section className="px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-6">
          <Heart className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-normal leading-snug">
          {hero.headline}
        </h1>
        <p className="mt-5 text-base text-gray-500 leading-relaxed max-w-lg mx-auto tracking-normal">
          {hero.tagline}
        </p>
        <div className="mt-8">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() =>
              document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver experiência
          </Button>
        </div>
      </motion.div>
    </section>
  );
}