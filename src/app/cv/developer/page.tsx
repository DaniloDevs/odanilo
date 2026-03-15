'use client';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DevPDFDocument from "@/components/cv-dev";
import { developerData, profileData } from "@/components/portfolio/data";

export default function CvDeveloper() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar — hidden on print */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/Developer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao portfólio
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Imprimir
            </Button>
            <PDFDownloadLink
              document={<DevPDFDocument />}
              fileName={`curriculo-dev-${profileData.name.toLowerCase().replace(/\s+/g, "-")}.pdf`}
            >
              {({ loading }) => (
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  {loading ? "Gerando PDF..." : "Baixar PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="print:hidden py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-center text-gray-400 mb-4">
            Pré-visualização do currículo · Clique em "Baixar PDF" para fazer o download
          </p>
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200" style={{ height: "90vh" }}>
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              <DevPDFDocument />
            </PDFViewer>
          </div>
        </div>
      </div>

      {/* Print-only fallback: plain HTML layout */}
      <div className="hidden print:block p-10 max-w-[210mm] mx-auto text-sm text-gray-900">
        <h1 className="text-2xl font-bold text-blue-600 mb-1">{profileData.name}</h1>
        <p className="text-gray-500 mb-3">{developerData.hero.headline}</p>
        <p className="text-xs text-gray-400 mb-6">
          {profileData.contact.email} · {profileData.contact.linkedin} · {profileData.contact.github}
        </p>
        <hr className="mb-6" />

        <Section title="Resumo">{developerData.hero.tagline}</Section>

        <Section title="Experiência Profissional">
          {developerData.experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <strong>{e.company}</strong>
                <span className="text-gray-400 text-xs">{e.period}</span>
              </div>
              <div className="text-blue-600 text-xs mb-1">{e.role}</div>
              <p className="text-gray-600 text-xs">{e.description}</p>
              <p className="text-gray-400 text-xs mt-1">{e.tech.join(" · ")}</p>
            </div>
          ))}
        </Section>

        <Section title="Projetos em Destaque">
          {developerData.projects.slice(0, 3).map((p, i) => (
            <div key={i} className="mb-3">
              <strong className="text-sm">{p.name}</strong>
              <p className="text-gray-600 text-xs">{p.description}</p>
              <p className="text-gray-400 text-xs mt-1">{p.tech.join(" · ")}</p>
            </div>
          ))}
        </Section>

        <Section title="Stack Técnica">
          {Object.entries(developerData.stack).map(([cat, techs]) => (
            <div key={cat} className="mb-1 text-xs">
              <strong>{cat}:</strong> {techs.join(", ")}
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-1 mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}