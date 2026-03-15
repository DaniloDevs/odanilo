import React from "react";
import { developerData } from "../data";
import { Badge } from "@/components/ui/badge";
import SectionWrapper from "../section-wrapper";
import Timeline from "../timeline";

export default function DevExperience() {
  return (
    <SectionWrapper>
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
        Experiência Profissional
      </h2>
      <p className="text-sm text-gray-400 mb-10">
        Minha trajetória no desenvolvimento de software.
      </p>
      <Timeline
        items={developerData.experience}
        theme="dev"
        renderItem={(item) => (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
              <h3 className="text-base font-semibold text-gray-900">{item.company}</h3>
              <span className="text-xs text-gray-400 font-mono">{item.period}</span>
            </div>
            <p className="text-sm font-medium text-blue-600 mb-2">{item.role}</p>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {item.tech.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="bg-gray-100 text-gray-600 border-0 font-mono text-[10px] px-2 py-0.5"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}
      />
    </SectionWrapper>
  );
}