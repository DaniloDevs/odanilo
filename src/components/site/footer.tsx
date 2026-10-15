import { Github, Linkedin, Mail } from "lucide-react";
import { getProfile } from "@/content";

const iconLink =
  "inline-flex size-11 items-center justify-center text-gray-500 transition-colors hover:text-gray-900";

export default async function Footer() {
  const profile = await getProfile();

  return (
    <footer className="border-t border-gray-200 px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center sm:-mr-3">
          <a
            href={`mailto:${profile.contact.email}`}
            className={iconLink}
            aria-label="Email"
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
            aria-label="LinkedIn (abre em nova aba)"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
            aria-label="GitHub (abre em nova aba)"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
