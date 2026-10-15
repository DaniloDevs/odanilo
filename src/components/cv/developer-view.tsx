"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Experience, Profile, Project, SkillGroup } from "@/content/types";
import DevPDFDocument from "./developer-pdf";

interface Props {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
}

export default function CvDeveloperView(props: Props) {
  const { profile, experience, projects } = props;
  const document = <DevPDFDocument {...props} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-3 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/sobre"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao portfólio
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-1.5 h-4 w-4" />
              Imprimir
            </Button>
            <PDFDownloadLink
              document={document}
              fileName={`curriculo-dev-${profile.name.toLowerCase().replace(/\s+/g, "-")}.pdf`}
            >
              {({ loading }) => (
                <Button
                  size="sm"
                  className="bg-brand text-white hover:bg-brand-strong"
                  disabled={loading}
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  {loading ? "Gerando PDF..." : "Baixar PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 print:hidden">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-xs text-gray-500">
            Pré-visualização do currículo · Clique em "Baixar PDF" para fazer o
            download
          </p>
          <div
            className="overflow-hidden rounded-lg border border-gray-200 shadow-lg"
            style={{ height: "90vh" }}
          >
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              {document}
            </PDFViewer>
          </div>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[210mm] p-10 text-sm text-gray-900 print:block">
        <h1 className="mb-1 text-2xl font-bold text-brand">{profile.name}</h1>
        <p className="mb-3 text-gray-600">{profile.headline}</p>
        <p className="mb-6 text-xs text-gray-500">
          {profile.contact.email} · {profile.contact.linkedin} ·{" "}
          {profile.contact.github}
        </p>
        <hr className="mb-6" />

        <PrintSection title="Resumo">
          {profile.about.slice(0, 2).join(" ")}
        </PrintSection>

        <PrintSection title="Experiência Profissional">
          {experience.map((e) => (
            <div key={`${e.company}-${e.role}`} className="mb-4">
              <div className="flex justify-between">
                <strong>{e.company}</strong>
                <span className="text-xs text-gray-500">{e.period}</span>
              </div>
              <div className="mb-1 text-xs text-brand">{e.role}</div>
              <p className="text-xs text-gray-600">{e.description}</p>
              <p className="mt-1 text-xs text-gray-500">{e.tech.join(" · ")}</p>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Projetos em Destaque">
          {projects.slice(0, 4).map((p) => (
            <div key={p.slug} className="mb-3">
              <strong className="text-sm">{p.title}</strong>
              <p className="text-xs text-gray-600">{p.summary}</p>
              <p className="mt-1 text-xs text-gray-500">
                {p.stack.join(" · ")}
              </p>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Stack Técnica">
          {props.skills.map((g) => (
            <div key={g.category} className="mb-1 text-xs">
              <strong>{g.category}:</strong> {g.items.join(", ")}
            </div>
          ))}
        </PrintSection>
      </div>
    </div>
  );
}

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 border-b border-gray-200 pb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
        {title}
      </h2>
      {children}
    </div>
  );
}
