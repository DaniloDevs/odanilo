import { teacherData } from "../data";
import { Code2, BookOpen } from "lucide-react";
import SectionWrapper from "../section-wrapper";

export default function TeacherAbout() {
  const { about } = teacherData;

  return (
    <SectionWrapper>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-normal">
            Sobre & Abordagem
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {about.bio}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {about.approach}
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-semibold text-emerald-800">
                Experiência prática
              </h3>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Cada conceito ensinado é fundamentado em projetos reais do mercado de tecnologia.
            </p>
          </div>
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-800">
                Metodologia ativa
              </h3>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              Aprendizado por projetos, exercícios progressivos e feedback contínuo.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}