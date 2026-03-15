'use client';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { profileData, teacherData } from "@/components/portfolio/data";
import TeacherPDFDocument from "@/components/cv-teacher";

export default function CvTeacher() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top bar — hidden on print */}
            <div className="print:hidden sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/Teacher"
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
                            document={<TeacherPDFDocument />}
                            fileName={`curriculo-professor-${profileData.name.toLowerCase().replace(/\s+/g, "-")}.pdf`}
                        >
                            {({ loading }) => (
                                <Button
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
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
                            <TeacherPDFDocument />
                        </PDFViewer>
                    </div>
                </div>
            </div>

            {/* Print-only fallback */}
            <div className="hidden print:block p-10 max-w-[210mm] mx-auto text-sm text-gray-900">
                <h1 className="text-2xl font-bold text-emerald-600 mb-1">{profileData.name}</h1>
                <p className="text-gray-500 mb-3">{teacherData.hero.headline}</p>
                <p className="text-xs text-gray-400 mb-6">
                    {profileData.contact.email} · {profileData.contact.linkedin}
                </p>
                <hr className="mb-6" />

                <Section title="Resumo">{teacherData.hero.tagline}</Section>

                <Section title="Formação Acadêmica">
                    <div className="mb-2 text-xs">
                        <strong>Bacharelado em Ciência da Computação</strong>
                        <p className="text-gray-400">Universidade Federal — 2014 a 2018</p>
                    </div>
                    <div className="mb-2 text-xs">
                        <strong>Licenciatura em Computação</strong>
                        <p className="text-gray-400">Universidade Estadual — 2016 a 2020</p>
                    </div>
                </Section>

                <Section title="Experiência Docente">
                    {teacherData.experience.map((e, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between">
                                <strong>{e.institution}</strong>
                                <span className="text-gray-400 text-xs">{e.period}</span>
                            </div>
                            <div className="text-emerald-600 text-xs mb-1">{e.role}</div>
                            <p className="text-gray-400 text-xs">{e.subjects.join(" · ")}</p>
                        </div>
                    ))}
                </Section>

                <Section title="Disciplinas Ministradas">
                    {teacherData.courses.map((c, i) => (
                        <div key={i} className="mb-1 text-xs">
                            <strong>{c.name}</strong> — {c.level} · {c.audience} · {c.institution}
                        </div>
                    ))}
                </Section>

                {teacherData.talks?.length > 0 && (
                    <Section title="Palestras & Workshops">
                        {teacherData.talks.map((t, i) => (
                            <div key={i} className="mb-2 text-xs">
                                <strong>{t.title}</strong> <span className="text-gray-400">({t.year})</span>
                                <p className="text-gray-500">{t.event}</p>
                            </div>
                        ))}
                    </Section>
                )}
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