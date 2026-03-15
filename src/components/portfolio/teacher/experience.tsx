import React from "react";
import { teacherData } from "../data";
import { Badge } from "@/components/ui/badge";
import Timeline from "../timeline";
import SectionWrapper from "../section-wrapper";

export default function TeacherExperience() {
  return (
    <SectionWrapper>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-normal">
        Experiência Docente
      </h2>
      <p className="text-sm text-gray-400 mb-10 leading-relaxed">
        Instituições onde atuo ou atuei como professor e instrutor.
      </p>
      <Timeline
        items={teacherData.experience}
        theme="teacher"
        renderItem={(item) => (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
              <h3 className="text-base font-semibold text-gray-900">
                {item.institution}
              </h3>
              <span className="text-xs text-gray-400">{item.period}</span>
            </div>
            <p className="text-sm font-medium text-emerald-600 mb-2">{item.role}</p>
            <div className="flex flex-wrap gap-1.5">
              {item.subjects.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="bg-gray-100 text-gray-600 border-0 text-[10px] px-2 py-0.5"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}
      />
    </SectionWrapper>
  );
}