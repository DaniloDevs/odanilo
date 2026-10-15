import SectionWrapper from "./section-wrapper";

const steps = [
  {
    n: "01",
    title: "Diagnosticar",
    body: "Parto do sintoma e sigo até a causa raiz antes de propor solução. Auditar o que existe vem antes de escrever código novo.",
  },
  {
    n: "02",
    title: "Estruturar",
    body: "Decisões e trade-offs ficam à vista, em PRD, ADRs e planos por fase, para o sistema poder mudar sem perder o fio.",
  },
  {
    n: "03",
    title: "Documentar",
    body: "README, diagramas e registros de decisão fazem parte da entrega. Quem chega depois entende o porquê, não só o quê.",
  },
];

export function WorkMethod() {
  return (
    <SectionWrapper tone="dark" className="py-14 md:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-blue-400">
        Como eu trabalho
      </p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight md:text-3xl">
        Sintoma, causa raiz, documentação.
      </h2>
      <div className="mt-8 overflow-hidden rounded-xl border border-white/15">
        <div className="grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map((s) => (
            <div key={s.n} className="p-6">
              <span className="font-mono text-sm text-blue-400">{s.n}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-white/15 bg-black/30 p-6 font-mono text-sm leading-relaxed text-gray-300">
          <p className="text-gray-400">
            # exemplo: XCupons (case completo em preparação)
          </p>
          <p>
            <span className="text-blue-400">sintoma</span> catálogo acoplado ao
            Mercado Livre
          </p>
          <p>
            <span className="text-blue-400">causa raiz</span> preço e comissão
            modelados como atributo do produto, mas variam por oferta
          </p>
          <p>
            <span className="text-blue-400">correção</span> produto canônico com
            N ofertas por origem
          </p>
          <p>
            <span className="text-blue-400">registro</span> decisão documentada
            + script de reconciliação da migração
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
