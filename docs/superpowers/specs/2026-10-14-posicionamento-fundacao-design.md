# Posicionamento e fundação do portfólio — design

Data: 2026-10-14
Sub-projeto 1 de 4 (ver "Decomposição").

## Objetivo

Reposicionar o portfólio para conseguir vaga de dev fullstack (meio período ou contrato), mantendo a docência e o curso Techs Academy (Hotmart) como diferencial. Entregar o site novo sem depender de CMS, com uma camada de conteúdo que permita trocar para o Payload no sub-projeto 2 sem reescrever páginas.

## Decomposição

| # | Sub-projeto | Depende de |
|---|---|---|
| 1 | Posicionamento e fundação (este spec) | — |
| 2 | Payload CMS (Postgres, Blob, admin, coleções, seed) | 1 |
| 3 | Páginas dinâmicas (projetos, blog, academy, sobre, CVs a partir do CMS) | 2 |
| 4 | Conteúdo (cases e notas, ritmo de ~1 por semana) | 3 |

## Posicionamento

Hero da home (rascunho, voz a ajustar pelo Danilo):

> **Desenvolvedor fullstack que diagnostica, estrutura e documenta sistemas.**
> Node, TypeScript e Next.js. Também ensino o que construo, no técnico e no Techs Academy.

Remover: divisão em cartões Developer/Teacher, "19 anos", avatar do Unsplash, terminal "build-amazing-things".

## Mapa do site

| Rota | Papel | Estado neste sub-projeto |
|---|---|---|
| `/` | Hero, 3 cases em destaque, "Como eu trabalho", Techs Academy, contato | completa |
| `/projetos`, `/projetos/[slug]` | Lista e cases | lista + case completo do BlueDraft |
| `/academy` | Curso Hotmart + metodologia | completa |
| `/blog` | Notas técnicas | placeholder "em breve" |
| `/sobre` | História, fio condutor, experiência dev e docente | completa |
| `/cv/developer`, `/cv/teacher` | CVs em PDF | mantidos, texto novo |

Redirects permanentes: `/Developer` → `/`, `/Teacher` → `/academy`.

Links do curso: hub `https://hotmart.com/pt-br/club/techs-academy`, produto `https://hotmart.com/pt-br/club/techs-academy/products/8488982`. Tagline: "Cursos de informática para quem quer aprender fazendo."

## Projetos

Destaques (nesta ordem): **BlueDraft**, **XCupons** (catálogo multi-marketplace), **Avaliação de coordenadores** (repo `ap-loide`; título e slug `avaliacao-coordenadores` neutros de propósito). Todos privados, apresentados como case sem código: problema, decisões de arquitetura, trade-offs, stack. Só o BlueDraft recebe case completo neste sub-projeto; XCupons e Avaliação de coordenadores entram com resumo e `case` marcado "em breve".

"Outros projetos" (compacto): UezCompany API, brdsousa, pass.in, Gym Solid, Async Print API, SaaS Boilerplate, Code-Craft, Mythic Codex.

Avaliação de coordenadores: sem nomes de coordenadores, notas ou prints com dados reais. Citar a instituição de forma neutra ("instituição de ensino técnico") até o Danilo confirmar autorização para nomeá-la.

## Visual

- Identidade única: azul (mesmo do Techs Academy) como principal, âmbar como acento só em Academy e CTAs de curso.
- Tema claro, com faixas em grafite escuro em seções de destaque ("Como eu trabalho", cases). Sem dark mode neste sub-projeto.
- Tipografia: Inter (texto) e Geist Mono (detalhes técnicos).
- Foto: PNG com fundo transparente sobre forma azul suave no hero da home e em `/sobre`.

## Componentes

| Componente | Origem |
|---|---|
| `Hero` | novo; substitui `dev/hero` e `teacher/hero` |
| `CaseCard`, `CaseHeader` | novo; substitui `dev/project` |
| `WorkMethod` (sintoma → causa raiz → documentação) | novo; substitui o terminal falso |
| `AcademyCta` | evolui `teacher/cta` |
| `Timeline`, `SectionWrapper`, `Footer`, `NavBar` | mantidos; NavBar ganha Projetos, Academy, Blog, Sobre |
| `PersonaCard`, `teacher/*`, `dev/*` antigos | removidos ao fim da migração |

## Camada de conteúdo

`src/content/` com `types.ts` e `data/*.ts`. Tipos formatados para virarem coleções do Payload: `Project`, `Post`, `Course`, `Profile`, `Experience`.

`Project`: `slug`, `title`, `summary`, `role`, `stack[]`, `status` (produção | open source | pessoal), `visibility` (`public` | `private`), `repoUrl?`, `demoUrl?`, `featured`, `order`, `case?` (problema, decisões, trade-offs, resultado).

Regra: `visibility: "private"` nunca renderiza botão de repositório.

Funções (todas `async`): `getProjects()`, `getProject(slug)`, `getFeaturedProjects()`, `getPosts()`, `getProfile()`, `getExperience()`. O `portfolio/data.tsx` atual é dividido nesses arquivos e removido.

## Higiene técnica

- `lang="pt-BR"`, `metadata` real por página (hoje é "Create Next App"), Open Graph com a foto, `sitemap` e `robots`.
- Rotas em minúsculas.
- Server Components por padrão; `'use client'` só nas ilhas de animação (framer-motion) e no menu mobile.

## Ordem de execução

Cada passo deixa o site funcionando.

1. Tokens de design, layout, metadata, `lang`.
2. Camada de conteúdo e migração dos dados.
3. Componentes novos e home.
4. `/projetos`, case do BlueDraft, `/academy`, `/sobre`, `/blog` (placeholder).
5. NavBar nova, redirects, CVs com texto novo, remoção do código antigo.
6. Foto em `public/` (otimizada) e Open Graph.

## Validação

Sem framework de testes no repo, e este spec não adiciona um. Cada passo roda `pnpm lint`, `pnpm exec tsc --noEmit` e `pnpm build`. No fim: subir o `dev` e conferir rotas, redirects antigos, layout mobile e que nenhum projeto privado exibe link de repositório.

## Riscos

- `@react-pdf/renderer` pode conflitar com Server Components: os CVs permanecem client e só o texto muda.
- Texto de case escrito por IA pode soar genérico: o BlueDraft é o modelo e é revisado pelo Danilo antes de replicar o formato.
- Textos do hero e de `/sobre` são rascunhos e precisam da revisão de voz do Danilo.
- Avaliação de coordenadores envolve dados de uma instituição: ver cuidados em "Projetos".

## Fora do escopo

Payload CMS, blog com posts reais, cases de XCupons e Avaliação de coordenadores, dark mode, i18n em inglês, analytics.
