"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Profile, Subject, Talk, TeachingRole } from "@/content/types";
import TeacherPDFDocument from "./teacher-pdf";

interface Props {
  profile: Profile;
  roles: TeachingRole[];
  subjects: Subject[];
  talks: Talk[];
}

export default function CvTeacherView(props: Props) {
  const { profile, roles, subjects, talks } = props;
  const document = <TeacherPDFDocument {...props} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-3 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/academy"
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
              fileName={`curriculo-professor-${profile.name.toLowerCase().replace(/\s+/g, "-")}.pdf`}
            >
              {({ loading }) => (
                <Button
                  size="sm"
                  className="bg-academy text-gray-950 hover:bg-academy-strong"
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
        <h1 className="mb-1 text-2xl font-bold text-gray-900">
          {profile.name}
        </h1>
        <p className="mb-3 text-gray-600">Professor técnico de TI</p>
        <p className="mb-6 text-xs text-gray-500">
          {profile.contact.email} · {profile.contact.linkedin}
        </p>
        <hr className="mb-6" />

        <PrintSection title="Resumo">
          {profile.about.slice(0, 2).join(" ")}
        </PrintSection>

        <PrintSection title="Experiência Docente">
          {roles.map((r) => (
            <div key={`${r.role}-${r.period}`} className="mb-4">
              <div className="flex justify-between">
                <strong>{r.institution}</strong>
                <span className="text-xs text-gray-500">{r.period}</span>
              </div>
              <div className="mb-1 text-xs text-gray-700">{r.role}</div>
              <p className="text-xs text-gray-500">{r.subjects.join(" · ")}</p>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Disciplinas Ministradas">
          {subjects.map((s) => (
            <div key={s.name} className="mb-1 text-xs">
              <strong>{s.name}</strong> — {s.level} · {s.audience} ·{" "}
              {s.institution}
            </div>
          ))}
        </PrintSection>

        {talks.length > 0 && (
          <PrintSection title="Palestras & Workshops">
            {talks.map((t) => (
              <div key={t.title} className="mb-2 text-xs">
                <strong>{t.title}</strong>{" "}
                <span className="text-gray-500">({t.year})</span>
                <p className="text-gray-600">{t.event}</p>
              </div>
            ))}
          </PrintSection>
        )}
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
