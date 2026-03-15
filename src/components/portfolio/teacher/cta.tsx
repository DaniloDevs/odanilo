'use client';
import React from "react";
import { profileData } from "../data";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TeacherCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="px-6 py-20"
    >
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-normal mb-3">
          Quer conversar sobre aulas ou parcerias?
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Se você busca um professor com experiência prática ou quer saber mais
          sobre minha metodologia, entre em contato.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
            <Link href={`mailto:${profileData.contact.email}`}>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" >
              <Mail className="w-4 h-4 mr-1.5" />
              Email
          </Button>
            </Link>
            <Link href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" >
              <Linkedin className="w-4 h-4 mr-1.5" />
              LinkedIn
          </Button>
            </Link>
            <Link href="/cv/teacher">
          <Button variant="outline" >
              <FileDown className="w-4 h-4 mr-1.5" />
              Currículo
          </Button>
            </Link>
        </div>
      </div>
    </motion.section>
  );
}