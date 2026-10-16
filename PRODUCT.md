# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Três públicos confirmados, nesta ordem de decisão:

- **Recrutador ou gestor tech:** avalia se contrata Danilo como dev fullstack (meio período ou contrato).
- **Cliente de projeto:** empresa ou pessoa que quer contratar a entrega de um sistema.
- **Instituição de ensino:** avalia Danilo como docente ou palestrante.

O curso Techs Academy (Hotmart) atende alunos em potencial, mas é diferencial do posicionamento, não o público principal do site.

## Product Purpose

Portfólio pessoal de Danilo Romão (GitHub: DaniloDevs) para conseguir vaga ou contrato como dev fullstack, mantendo a docência e o Techs Academy como diferencial. Sucesso: o visitante entende em segundos o que Danilo faz, vê cases reais e entra em contato.

## Positioning

Desenvolvedor fullstack que diagnostica, estrutura e documenta sistemas (sintoma, causa raiz, documentação), e ensina o que constrói, no técnico e no Techs Academy. A docência é a prova do método, não uma segunda identidade.

## Operating Context

Site em Next.js 16 (App Router), Tailwind 4, pt-BR. Conteúdo vem de uma camada em `src/content/` (types + `data/*.ts`), preparada para virar coleções do Payload CMS no sub-projeto 2. CVs em PDF (`@react-pdf/renderer`) para dev e docente. Specs e planos em `docs/superpowers/`.

## Capabilities and Constraints

- Rotas: `/`, `/projetos`, `/projetos/[slug]`, `/academy`, `/blog` (placeholder "em breve"), `/sobre`, `/cv/developer`, `/cv/teacher`. Redirects permanentes: `/Developer` → `/`, `/Teacher` → `/academy`.
- Projetos com `visibility: "private"` nunca exibem botão de repositório.
- Só pt-BR; sem dark mode neste ciclo (decisão do spec).
- Fichas avaliativas de professores: o case cita as unidades e o Sophia, mas não o nome da instituição, e nunca expõe nomes de professores, notas ou prints reais.
- Fora do escopo atual: Payload CMS, posts reais de blog, i18n em inglês, analytics.

## Brand Commitments

Spec de 2026-10-14 define como compromisso: azul do Techs Academy como cor principal, âmbar só em Academy e CTAs de curso, tema claro com faixas grafite, Inter e Geist Mono. Tagline do curso: "Cursos de informática para quem quer aprender fazendo." Removidos de vez: divisão Developer/Teacher em cartões, "19 anos", avatar do Unsplash, terminal falso.

## Evidence on Hand

- Cases: BlueDraft (completo), XCupons e Fichas avaliativas de professores (completos), mais oito projetos em "Outros".
- Links do curso: hub `https://hotmart.com/pt-br/club/techs-academy`, produto `.../products/8488982`.
- Foto em `public/danilo.png` (PNG com fundo transparente).
- Ausentes e que não podem ser inventados: depoimentos, número de alunos, métricas de resultado, clientes nomeados.

## Product Principles

1. Mostrar o método (diagnóstico, estrutura, documentação) em vez de declarar adjetivos.
2. Todo claim tem evidência real; sem números ou depoimentos inventados.
3. Privacidade antes de vitrine: projetos privados e dados de instituições ficam protegidos.
4. Docência é prova do método, subordinada ao posicionamento de dev.
5. Conteúdo desacoplado das páginas, para migrar ao CMS sem reescrever UI.

## Accessibility & Inclusion

Sem requisito específico estabelecido; padrão assumido WCAG AA (contraste do âmbar já foi ajustado na revisão final). Confirmar se quiser um padrão formal.
