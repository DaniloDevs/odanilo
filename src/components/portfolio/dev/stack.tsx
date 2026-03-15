import { developerData } from "../data";
import SectionWrapper from "../section-wrapper";

export default function DevStack() {
  const categories = Object.entries(developerData.stack);

  return (
    <SectionWrapper className="bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
        Stack Técnica
      </h2>
      <p className="text-sm text-gray-400 mb-10">
        Tecnologias que uso no dia a dia para construir soluções.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(([category, techs]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="space-y-2">
              {techs.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="font-mono text-[13px]">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}