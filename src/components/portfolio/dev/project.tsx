import { developerData } from "../data";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import SectionWrapper from "../section-wrapper";

export default function DevProjects() {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
        Projetos em Destaque
      </h2>
      <p className="text-sm text-gray-400 mb-10">
        Alguns projetos que mostram minha abordagem e capacidade técnica.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {developerData.projects.map((p, i) => (
          <div
            key={i}
            className="group rounded-lg border border-gray-200 hover:border-blue-200 bg-white p-5 transition-all duration-300 hover:shadow-md flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 leading-snug">
                {p.name}
              </h3>
              {p.tag && (
                <Badge variant="outline" className="text-[10px] shrink-0 ml-2 border-gray-200 text-gray-400">
                  {p.tag}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tech.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-0 font-mono text-[10px] px-2 py-0.5"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}