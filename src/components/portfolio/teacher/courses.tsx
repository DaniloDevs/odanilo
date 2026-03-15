import SectionWrapper from "../section-wrapper";
import { teacherData } from "../data";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function TeacherCourses() {
  return (
    <SectionWrapper id="courses" className="bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-normal">
        Cursos & Disciplinas
      </h2>
      <p className="text-sm text-gray-400 mb-10 leading-relaxed">
        Disciplinas que ministro ou ministrei em diferentes instituições.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {teacherData.courses.map((c, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 hover:border-emerald-200 bg-white p-5 transition-all duration-300 hover:shadow-md flex flex-col"
          >
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{c.name}</h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-emerald-50 text-emerald-700 border-0 text-[10px] px-2 py-0.5">
                {c.level}
              </Badge>
              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                <Users className="w-3 h-3" />
                {c.audience}
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-3 flex-1">
              {c.description}
            </p>
            <p className="text-xs text-gray-400">{c.institution}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}