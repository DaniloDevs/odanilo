import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { profileData } from "./data";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} {profileData.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${profileData.contact.email}`}
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-[18px] h-[18px]" />
          </a>
          <a
            href={profileData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-[18px] h-[18px]" />
          </a>
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}