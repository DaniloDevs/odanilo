import React from "react";
import { motion } from "framer-motion";
import { profileData } from "../components/portfolio/data"; 
import Footer from "../components/portfolio/Footer";
import { Code2, GraduationCap, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Identity Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-8 px-6 text-center"
      >
        <Avatar className="w-24 h-24 mx-auto mb-6 ring-2 ring-gray-100 ring-offset-4">
          <AvatarImage src={profileData.avatar} alt={profileData.name} />
          <AvatarFallback className="text-lg font-semibold">
            {profileData.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          {profileData.name}
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
          {profileData.tagline}
        </p>
      </motion.div>

      {/* Persona Split */}
      <div className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
          <PersonaCard
            to="/Developer"
            icon={<Code2 className="w-6 h-6" />}
            title="Desenvolvedor Fullstack"
            description="Projetos, tecnologias, experiência profissional e código que entrega resultado."
            accentColor="blue"
            delay={0.2}
          />
          <PersonaCard
            to="/Teacher"
            icon={<GraduationCap className="w-6 h-6" />}
            title="Professor de TI"
            description="Aulas, metodologia, experiência docente e paixão por ensinar tecnologia."
            accentColor="emerald"
            delay={0.35}
          />
        </div>
      </div>

      {/* Connection Bridge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-12 px-6 text-center"
      >
        <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
          Quem desenvolve e ensina. A prática fortalece a didática.
          <br />A didática aprimora a comunicação no código.
        </p>
      </motion.div>

      <Footer />
    </div>
  );
}

function PersonaCard({ to, icon, title, description, accentColor, delay }) {
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
      <Link to={to} className="block group">
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