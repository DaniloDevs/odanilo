"use client";

import Link from "next/link";
import { motion } from "framer-motion"; 
import { ArrowRight } from "lucide-react";
interface PersonaCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: "blue" | "emerald";
  delay: number;
}

export function PersonaCard({ to, icon, title, description, accentColor, delay }: PersonaCardProps) {
  const colors = {
    blue: {
      iconBg: "bg-blue-50",
      iconText: "text-blue-600",
      hoverBorder: "hover:border-blue-200",
      btn: "text-blue-600 group-hover:text-blue-700",
    },
    emerald: {
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-600",
      hoverBorder: "hover:border-emerald-200",
      btn: "text-emerald-600 group-hover:text-emerald-700",
    },
  };
  const c = colors[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={to} className="block group">
        <div
          className={`relative rounded-xl border border-gray-200 ${c.hoverBorder} bg-white p-8 transition-all duration-300 hover:shadow-md`}
        >
          <div className={`inline-flex p-3 rounded-lg ${c.iconBg} ${c.iconText} mb-5`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{description}</p>
          <div className={`flex items-center gap-1.5 text-sm font-medium ${c.btn} transition-colors`}>
            Explorar
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}