import React from "react";
import SectionWrapper from "../section-wrapper";
import { teacherData } from "../data";
import { Separator } from "@/components/ui/separator";

export default function TeacherTalks() {
  if (!teacherData.talks || teacherData.talks.length === 0) return null;

  return (
    <SectionWrapper className="bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-normal">
        Palestras & Workshops
      </h2>
      <p className="text-sm text-gray-400 mb-10 leading-relaxed">
        Eventos onde compartilhei conhecimento e experiências.
      </p>
      <div className="space-y-0">
        {teacherData.talks.map((talk, i) => (
          <div key={i}>
            {i > 0 && <Separator className="my-6" />}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {talk.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {talk.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-emerald-600 font-medium">{talk.event}</p>
                <p className="text-xs text-gray-400">{talk.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}