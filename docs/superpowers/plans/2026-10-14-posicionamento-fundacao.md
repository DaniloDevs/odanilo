# Posicionamento e fundação do portfólio — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposicionar o portfólio como "desenvolvedor fullstack que diagnostica, estrutura e documenta sistemas", com docência e Techs Academy como diferencial, atrás de uma camada de conteúdo pronta para trocar para o Payload CMS depois.

**Architecture:** Site único em Next.js 16 (App Router) com route group `(site)` (navbar + footer compartilhados) e CVs fora dele. Todo o conteúdo vive em `src/content/` (tipos + arquivos tipados + getters `async`); páginas são Server Components e só animação/menu mobile/PDF são client. Um script Node (`check:content`) guarda invariantes do conteúdo (projeto privado sem `repoUrl`, textos proibidos, destaques).

**Tech Stack:** Next.js 16.1.6, React 19.2.3, Tailwind CSS 4, shadcn/ui (base-ui), framer-motion, `@react-pdf/renderer`, Biome 2.2, pnpm, Node 24.

**Spec:** `docs/superpowers/specs/2026-10-14-posicionamento-fundacao-design.md`

## Global Constraints

- Idioma do site e dos textos: pt-BR com acentuação correta. Código e identificadores em inglês.
- Posicionamento do hero (verbatim): título `Desenvolvedor fullstack que diagnostica, estrutura e documenta sistemas.`; subtítulo `Node, TypeScript e Next.js. Também ensino o que construo, no técnico e no Techs Academy.`
- Proibido em qualquer conteúdo: `19 anos`, `Universidade`, `Bacharelado`, `Licenciatura`, `build-amazing-things`. Os PDFs/CVs hoje têm formação acadêmica inventada: removê-la, não substituí-la.
- Projeto com `visibility: "private"` nunca renderiza link de repositório e nunca tem `repoUrl`.
- Destaques, nesta ordem: `bluedraft`, `xcupons`, `avaliacao-coordenadores` (repo `ap-loide`; slug e título são neutros de propósito, para não expor o nome da instituição). Todos privados, apresentados como case sem código.
- Avaliação de coordenadores (repo `ap-loide`): citar a instituição só como "instituição de ensino técnico", sem a palavra "loide" em nenhum campo do projeto; sem nomes de coordenadores, notas ou prints com dados reais; sem `demoUrl`.
- Links do curso (verbatim): hub `https://hotmart.com/pt-br/club/techs-academy`; produto `https://hotmart.com/pt-br/club/techs-academy/products/8488982`. Tagline: `Cursos de informática para quem quer aprender fazendo.` O nome do curso específico é desconhecido: usar rótulo genérico "Conhecer o curso".
- Identidade: azul (`brand`) principal; âmbar (`academy`) só em Academy e CTAs de curso; faixas grafite (`graphite`) em destaque. Sem dark mode.
- Server Components por padrão; `'use client'` só em navbar, `SectionWrapper` (framer-motion) e views de CV.
- Rotas em minúsculas. Redirects permanentes: `/Developer` → `/`, `/Teacher` → `/academy`.
- Não inventar fatos, números ou métricas. Todo texto de case/hero/sobre é rascunho do assistente a partir do perfil do Danilo e termina marcado para revisão dele (ver Task 7, último passo).
- Sem framework de testes novo. Validação por `pnpm exec tsc --noEmit`, `pnpm build`, Biome nos caminhos novos e `pnpm check:content`.
- Commits terminam com a linha: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`

## Estrutura de arquivos

Criar:
- `src/lib/site.ts` — constantes do site (nome, URL, descrição).
- `src/content/types.ts` — tipos `Profile`, `Project`, `ProjectCase`, `Experience`, `SkillGroup`, `Academy`, `TeachingRole`, `Subject`, `Talk`, `Post`.
- `src/content/data/profile.ts`, `projects.ts`, `experience.ts`, `academy.ts`, `teaching.ts`, `posts.ts` — dados.
- `src/content/index.ts` — getters `async`.
- `scripts/check-content.mjs` — invariantes do conteúdo.
- `src/components/site/navbar.tsx`, `footer.tsx`, `hero.tsx`, `case-card.tsx`, `work-method.tsx`, `academy-cta.tsx`, `contact-cta.tsx`, `section-wrapper.tsx`, `timeline.tsx`, `page-header.tsx`.
- `src/app/(site)/layout.tsx`, `projetos/page.tsx`, `projetos/[slug]/page.tsx`, `academy/page.tsx`, `sobre/page.tsx`, `blog/page.tsx`.
- `src/components/cv/developer-view.tsx`, `teacher-view.tsx`.
- `src/app/opengraph-image.tsx`, `sitemap.ts`, `robots.ts`.
- `public/danilo.png`.

Modificar: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/(site)/page.tsx` (renomeado de `(main)`), `src/app/cv/developer/page.tsx`, `src/app/cv/teacher/page.tsx`, `next.config.ts`, `package.json`.

Mover (git mv) e adaptar: `src/components/cv-dev.tsx` → `src/components/cv/developer-pdf.tsx`; `src/components/cv-teacher.tsx` → `src/components/cv/teacher-pdf.tsx`.

Remover no fim: `src/app/Developer/`, `src/app/Teacher/`, `src/components/portfolio/`, `src/components/person-card.tsx`.

---

### Task 1: Fundação (branch, tokens, layout, foto)

**Files:**
- Create: `src/lib/site.ts`, `public/danilo.png`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`
- Move: `src/app/(main)` → `src/app/(site)`

**Interfaces:**
- Produces: `siteConfig` de `@/lib/site` com `{ name, shortName, url, description }`; classes Tailwind `bg-brand`, `text-brand`, `hover:bg-brand-strong`, `bg-brand-soft`, `bg-academy`, `hover:bg-academy-strong`, `bg-academy-soft`, `bg-graphite`; arquivo `/danilo.png`.

- [ ] **Step 1: Criar branch e instalar dependências**

```bash
cd /c/Users/Admin/code/odanilo
git switch -c feat/posicionamento-fundacao
pnpm install
```

- [ ] **Step 2: Registrar baseline (o que já falha antes de mexer)**

```bash
pnpm exec tsc --noEmit 2>&1 | tail -15
pnpm build 2>&1 | tail -25
pnpm lint 2>&1 | tail -15
```

Expected: anotar o que já falha. Falhas pré-existentes não são regressão deste plano; só as novas contam. Se `pnpm build` falhar de forma bloqueante, parar e reportar.

- [ ] **Step 3: Criar `src/lib/site.ts`**

```ts
export const siteConfig = {
  name: "Danilo Romão",
  shortName: "Danilo Romão",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Desenvolvedor fullstack que diagnostica, estrutura e documenta sistemas. Também professor de TI e criador do Techs Academy.",
};
```

- [ ] **Step 4: Adicionar tokens de cor em `src/app/globals.css`**

Em `@theme inline { ... }`, logo depois da linha `--radius-4xl: calc(var(--radius) * 2.6);`, adicionar:

```css
  --color-brand: oklch(0.546 0.245 262.881);
  --color-brand-strong: oklch(0.488 0.243 264.376);
  --color-brand-soft: oklch(0.97 0.014 254.604);
  --color-academy: oklch(0.769 0.188 70.08);
  --color-academy-strong: oklch(0.666 0.179 58.318);
  --color-academy-soft: oklch(0.987 0.022 95.277);
  --color-graphite: oklch(0.13 0.028 261.692);
```

- [ ] **Step 5: Atualizar `src/app/layout.tsx`**

Substituir o arquivo inteiro por:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Desenvolvedor fullstack e educador`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Renomear o route group e copiar a foto**

```bash
git mv "src/app/(main)" "src/app/(site)"
cp "/c/Users/Admin/Downloads/851c563d-551c-4628-9f6c-9900f4aaa15f-removebg-preview - Copia.png" public/danilo.png
ls -la public/danilo.png
```

Expected: arquivo existe. Se passar de ~800 KB, reduzir:

```bash
node -e "require('sharp')('public/danilo.png').resize({width:900}).png({compressionLevel:9}).toFile('public/danilo.min.png').then(()=>console.log('ok'))" && mv public/danilo.min.png public/danilo.png
```

Se `sharp` não estiver disponível, manter o arquivo como está (next/image otimiza em runtime).

- [ ] **Step 7: Verificar que a home antiga ainda compila**

```bash
pnpm exec tsc --noEmit 2>&1 | tail -10
```

Expected: sem erros novos (a home ainda importa `portfolio/data`, que existe).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: fundação do novo portfólio (tokens, metadata pt-BR, foto)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Camada de conteúdo e script de invariantes

**Files:**
- Create: `scripts/check-content.mjs`, `src/content/types.ts`, `src/content/data/{profile,projects,experience,academy,teaching,posts}.ts`, `src/content/index.ts`
- Modify: `package.json` (script)

**Interfaces:**
- Consumes: nada.
- Produces (usado por todas as tasks seguintes), em `@/content`:
  - `getProfile(): Promise<Profile>`
  - `getProjects(): Promise<Project[]>` (ordenado por `order`)
  - `getFeaturedProjects(): Promise<Project[]>`
  - `getProject(slug: string): Promise<Project | null>`
  - `getExperience(): Promise<Experience[]>`
  - `getAcademy(): Promise<Academy>`
  - `getTeaching(): Promise<{ roles: TeachingRole[]; subjects: Subject[]; talks: Talk[] }>`
  - `getPosts(): Promise<Post[]>`
  - tipos em `@/content/types`.

- [ ] **Step 1: Escrever o script de invariantes (vai falhar: módulos não existem)**

`scripts/check-content.mjs`:

```js
import assert from "node:assert/strict";
import { academy } from "../src/content/data/academy.ts";
import { experience } from "../src/content/data/experience.ts";
import { profile } from "../src/content/data/profile.ts";
import { projects } from "../src/content/data/projects.ts";
import { teaching } from "../src/content/data/teaching.ts";

const slugs = projects.map((p) => p.slug);
assert.equal(new Set(slugs).size, slugs.length, "slugs duplicados");

for (const p of projects) {
  if (p.visibility === "private") {
    assert.equal(p.repoUrl, undefined, `${p.slug}: projeto privado com repoUrl`);
  }
}

const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)
  .map((p) => p.slug);
assert.deepEqual(
  featured,
  ["bluedraft", "xcupons", "avaliacao-coordenadores"],
  "destaques",
);

const coordenadores = projects.find((p) => p.slug === "avaliacao-coordenadores");
assert.ok(coordenadores, "projeto avaliacao-coordenadores ausente");
assert.equal(coordenadores.demoUrl, undefined, "não deve ter demoUrl");
assert.ok(
  !JSON.stringify(coordenadores).toLowerCase().includes("loide"),
  "o projeto de avaliação de coordenadores não pode citar a instituição",
);

const everything = JSON.stringify({ academy, experience, profile, projects, teaching });
for (const banned of [
  "19 anos",
  "Universidade",
  "Bacharelado",
  "Licenciatura",
  "build-amazing-things",
]) {
  assert.ok(!everything.includes(banned), `texto proibido encontrado: ${banned}`);
}

assert.equal(
  academy.courseUrl,
  "https://hotmart.com/pt-br/club/techs-academy/products/8488982",
);
assert.equal(academy.hubUrl, "https://hotmart.com/pt-br/club/techs-academy");

console.log("check-content: ok");
```

Em `package.json`, dentro de `"scripts"`, adicionar `"check:content": "node scripts/check-content.mjs",` logo depois de `"format": "biome format --write"` (lembrar da vírgula na linha anterior).

- [ ] **Step 2: Rodar e ver falhar**

```bash
pnpm check:content
```

Expected: FAIL com `ERR_MODULE_NOT_FOUND` para `src/content/data/academy.ts`.

- [ ] **Step 3: Criar `src/content/types.ts`**

```ts
export type ProjectStatus =
  | "Em produção"
  | "Em desenvolvimento"
  | "Open source"
  | "Projeto pessoal"
  | "Cliente";

export interface ProjectCase {
  problem: string;
  decisions: { title: string; body: string }[];
  tradeoffs: string[];
  result: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  status: ProjectStatus;
  visibility: "public" | "private";
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
  case?: ProjectCase;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  availability: string;
  photo: string;
  contact: { email: string; linkedin: string; github: string };
  about: string[];
  skills: SkillGroup[];
}

export interface Academy {
  name: string;
  tagline: string;
  hubUrl: string;
  courseUrl: string;
  intro: string;
  structure: string;
  pillars: { title: string; body: string }[];
}

export interface TeachingRole {
  institution: string;
  role: string;
  period: string;
  subjects: string[];
}

export interface Subject {
  name: string;
  audience: string;
  level: string;
  description: string;
  institution: string;
}

export interface Talk {
  title: string;
  event: string;
  year: string;
  description: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}
```

- [ ] **Step 4: Criar `src/content/data/profile.ts`**

```ts
import type { Profile } from "../types";

export const profile: Profile = {
  name: "Danilo Romão Ferreira da Costa",
  shortName: "Danilo Romão",
  headline:
    "Desenvolvedor fullstack que diagnostica, estrutura e documenta sistemas.",
  subheadline:
    "Node, TypeScript e Next.js. Também ensino o que construo, no técnico e no Techs Academy.",
  availability: "Disponível para vagas em meio período ou contrato.",
  photo: "/danilo.png",
  contact: {
    email: "daniloromao.sw@gmail.com",
    linkedin: "https://www.linkedin.com/in/daniloromaoferreira/",
    github: "https://github.com/DaniloDevs",
  },
  about: [
    "Sou desenvolvedor fullstack e professor técnico de TI. Trabalho com Node.js, TypeScript, React e Next.js, e leciono Análise e Desenvolvimento de Sistemas, Sistemas de Computação e Documentação Técnica no Instituto Loide Martha.",
    "O que une as duas atividades é o método: partir do sintoma, chegar à causa raiz, decidir com os trade-offs à vista e deixar tudo documentado. É como estruturo sistemas e é o que ensino em sala.",
    "Procuro uma vaga de desenvolvedor em meio período ou contrato. A docência segue em paralelo, e é parte do que levo para um time: explicar decisões com clareza e deixar o que construo fácil de manter.",
  ],
  skills: [
    {
      category: "Backend",
      items: ["Node.js", "TypeScript", "Fastify", "NestJS", "Express", "REST APIs", "Zod"],
    },
    { category: "Banco de Dados", items: ["PostgreSQL", "Redis", "Prisma ORM"] },
    { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "React Query"] },
    {
      category: "DevOps",
      items: ["Docker", "docker-compose", "GitHub Actions", "pnpm", "Turborepo"],
    },
    {
      category: "Ferramentas",
      items: ["Git", "Biome", "ESLint", "Husky", "Vitest", "Swagger"],
    },
  ],
};
```

- [ ] **Step 5: Criar `src/content/data/projects.ts`**

```ts
import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "bluedraft",
    title: "BlueDraft",
    summary:
      "App multi-professor para planejar disciplinas (disciplina, ciclos, aulas) e executá-las por turma, com propagação controlada de mudanças e registros ministrados imutáveis.",
    role: "Autor e desenvolvedor",
    stack: ["TypeScript", "Next.js", "Fastify", "tRPC", "Prisma", "Turborepo"],
    status: "Em desenvolvimento",
    visibility: "private",
    featured: true,
    order: 1,
    case: {
      problem:
        "Um professor reaproveita o mesmo plano de ensino em várias turmas e vários semestres. Se o plano é um documento único, editar uma aula hoje reescreve o que já foi dado ontem, e o registro do que de fato foi ministrado deixa de ser confiável.",
      decisions: [
        {
          title: "Blueprint separado da execução",
          body: "O planejamento (disciplina, ciclos, aulas) é um blueprint. Cada turma recebe uma vigência, uma cópia em execução. Mudar o blueprint nunca altera uma vigência por baixo dos panos.",
        },
        {
          title: "Sync Engine com diff revisado",
          body: "Quando o blueprint muda, as vigências só recebem a mudança por meio de um diff que o professor revisa e aprova. A propagação é explícita, nunca automática.",
        },
        {
          title: "Registros ministrados imutáveis",
          body: "O que já foi ministrado vira registro imutável. Correções entram como novos registros, preservando o histórico.",
        },
        {
          title: "Monorepo com contratos tipados",
          body: "Monorepo com Turborepo, API em Fastify com tRPC e front em Next.js. Os tipos atravessam as camadas, e o trabalho segue specs e planos numerados por fase.",
        },
      ],
      tradeoffs: [
        "A etapa de revisão do diff adiciona um passo ao fluxo do professor, em troca de nunca corromper histórico.",
        "Manter blueprint e vigência separados duplica dados, mas isola o planejamento da execução.",
        "Imutabilidade exige modelar correções como eventos novos, o que complica o modelo de dados.",
      ],
      result:
        "Em desenvolvimento ativo. O repositório é privado; a intenção é abri-lo depois de documentado.",
    },
  },
  {
    slug: "xcupons",
    title: "XCupons",
    summary:
      "Catálogo de produtos multi-marketplace. Nasceu acoplado ao Mercado Livre e foi redesenhado para ser agnóstico de origem; Shopee já roda de ponta a ponta.",
    role: "Autor e desenvolvedor",
    stack: ["TypeScript", "PostgreSQL", "Docker", "Turborepo"],
    status: "Em produção",
    visibility: "private",
    featured: true,
    order: 2,
  },
  {
    slug: "avaliacao-coordenadores",
    title: "Avaliação de coordenadores",
    summary:
      "Sistema de avaliações de coordenadores de uma instituição de ensino técnico: cadastro, campanhas, avaliações e importação de dados do SophiA.",
    role: "Desenvolvedor",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase", "Zod"],
    status: "Em produção",
    visibility: "private",
    featured: true,
    order: 3,
  },
  {
    slug: "uezcompany-api",
    title: "UezCompany API",
    summary:
      "API em produção que conecta prestadores de serviço a clientes. Cobre gestão de pedidos, avaliações, autenticação social via Google e documentação Swagger pública.",
    role: "Desenvolvedor full stack",
    stack: ["Node.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Docker"],
    status: "Em produção",
    visibility: "public",
    repoUrl: "https://github.com/UezCompany/uezcompany-backend",
    demoUrl: "https://api.uezcompany.com/docs",
    featured: false,
    order: 4,
  },
  {
    slug: "brdsousa",
    title: "brdsousa",
    summary:
      "Portfólio de fotografia e audiovisual entregue a um cliente, com navegação lateral, divisão por categoria e contato direto por WhatsApp.",
    role: "Desenvolvedor",
    stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Biome"],
    status: "Cliente",
    visibility: "public",
    repoUrl: "https://github.com/DaniloDevs/brdsousa",
    demoUrl: "https://brdsousa.vercel.app",
    featured: false,
    order: 5,
  },
  {
    slug: "pass-in",
    title: "pass.in",
    summary:
      "Gestão de participantes em eventos presenciais: cadastro de evento, inscrição, crachá e check-in por QR Code, com regras como vaga limitada e check-in único.",
    role: "Autor",
    stack: ["TypeScript", "SQLite"],
    status: "Open source",
    visibility: "public",
    repoUrl: "https://github.com/DaniloDevs/pass.in",
    featured: false,
    order: 6,
  },
  {
    slug: "gym-solid",
    title: "Gym Solid",
    summary:
      "Sistema de gestão de academia com check-ins, controle de acesso por papel e testes E2E nos fluxos principais. Aplicação prática de SOLID e Clean Architecture.",
    role: "Autor",
    stack: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Vitest", "Docker"],
    status: "Open source",
    visibility: "public",
    repoUrl: "https://github.com/DaniloDevs/gym-solid",
    featured: false,
    order: 7,
  },
  {
    slug: "async-print-api",
    title: "Async Print API",
    summary:
      "Orquestrador de impressão assíncrona orientado a eventos e domínios, com filas BullMQ e métricas por fila.",
    role: "Autor",
    stack: ["TypeScript", "Fastify", "BullMQ", "Redis", "Prisma", "Biome"],
    status: "Open source",
    visibility: "public",
    repoUrl: "https://github.com/DaniloDevs/async-print-api",
    featured: false,
    order: 8,
  },
  {
    slug: "saas-boilerplate",
    title: "SaaS Boilerplate",
    summary:
      "Boilerplate fullstack para SaaS com autenticação social, organizações, permissões por papel (Admin, Membro, Billing) e monorepo com Turborepo.",
    role: "Autor",
    stack: ["Next.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Turborepo"],
    status: "Projeto pessoal",
    visibility: "public",
    repoUrl: "https://github.com/DaniloDevs/saas",
    featured: false,
    order: 9,
  },
  {
    slug: "code-craft",
    title: "Code-Craft",
    summary:
      "Sistema de indicação e ranking com tracking de convites, IDs únicos e cache em Redis para consultas de alta frequência, em camadas seguindo DDD.",
    role: "Autor",
    stack: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Redis", "Zod"],
    status: "Open source",
    visibility: "public",
    repoUrl: "https://github.com/DaniloDevs/Code-Craft",
    featured: false,
    order: 10,
  },
  {
    slug: "mythic-codex",
    title: "Mythic Codex",
    summary:
      "Gerenciador de fichas de RPG com arquitetura orientada a serviços, testes com Vitest e linting com Biome.",
    role: "Autor",
    stack: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Vitest", "Biome"],
    status: "Projeto pessoal",
    visibility: "public",
    repoUrl: "https://github.com/DaniloDevs/mythic-codex",
    featured: false,
    order: 11,
  },
];
```

- [ ] **Step 6: Criar `src/content/data/experience.ts`**

```ts
import type { Experience } from "../types";

export const experience: Experience[] = [
  {
    company: "Instituto Loide Martha",
    role: "Professor Técnico em TI",
    period: "Fev 2026 — Presente",
    description:
      "Leciono Sistemas de Computação, Análise e Desenvolvimento de Sistemas e Documentação Técnica no curso técnico profissionalizante em Informática. Ensinar arquitetura de software reforça minha capacidade de escrever código mais claro e bem documentado.",
    tech: ["Documentação técnica", "Arquitetura de sistemas", "Ensino"],
  },
  {
    company: "Instituto Loide Martha",
    role: "Professor de Informática",
    period: "Mar 2025 — Presente",
    description:
      "Ensino de computação para alunos do Ensino Fundamental, com foco em introdução à tecnologia da informação e uso de ferramentas digitais.",
    tech: ["Informática básica", "Ensino fundamental"],
  },
  {
    company: "UEZ Company",
    role: "Desenvolvedor Full Stack",
    period: "Mar 2024 — Mar 2025",
    description:
      "Desenvolvimento e manutenção de sistemas frontend e backend da plataforma de serviços. Contribuí na construção da API principal com Fastify e TypeScript, integração com autenticação social e gestão do banco de dados relacional com Prisma.",
    tech: ["Node.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "React"],
  },
];
```

- [ ] **Step 7: Criar `src/content/data/academy.ts`**

```ts
import type { Academy } from "../types";

export const academy: Academy = {
  name: "Techs Academy",
  tagline: "Cursos de informática para quem quer aprender fazendo.",
  hubUrl: "https://hotmart.com/pt-br/club/techs-academy",
  courseUrl: "https://hotmart.com/pt-br/club/techs-academy/products/8488982",
  intro:
    "O Techs Academy reúne os cursos que eu monto a partir do que ensino em sala e do que uso no trabalho. O tom é técnico e direto, como o de um dev explicando para outro dev.",
  structure:
    "O curso é organizado em 4 ciclos baseados na taxonomia de Bloom: parte do entendimento da estrutura de sistemas e avança até UML avançada e a documentação técnica completa de um sistema.",
  pillars: [
    {
      title: "Aprender fazendo",
      body: "Cada conceito vem com uma atividade aplicada: estudo de caso, exercício ou projeto. Ler sobre o assunto não conta como terminar a aula.",
    },
    {
      title: "Diagnóstico: sintoma → causa raiz",
      body: "O aluno aprende a investigar antes de agir: observar o sintoma, formular hipóteses, chegar à causa raiz e registrar o que descobriu.",
    },
    {
      title: "Conexão com o mercado real",
      body: "Os exemplos vêm de sistemas e rotinas de trabalho reais, não de apostilas desatualizadas.",
    },
  ],
};
```

- [ ] **Step 8: Criar `src/content/data/teaching.ts`**

```ts
import type { Subject, Talk, TeachingRole } from "../types";

const roles: TeachingRole[] = [
  {
    institution: "Instituto Loide Martha",
    role: "Professor Técnico em TI",
    period: "Fev 2026 — Presente",
    subjects: [
      "Sistemas de Computação e Aplicativos",
      "Análise e Desenvolvimento de Sistemas",
      "Documentação Técnica em TI",
    ],
  },
  {
    institution: "Instituto Loide Martha",
    role: "Professor de Informática",
    period: "Mar 2025 — Presente",
    subjects: ["Informática aplicada", "Introdução à tecnologia"],
  },
  {
    institution: "Instituto Loide Martha",
    role: "Suporte Técnico e Desenvolvimento",
    period: "Ago 2024 — Dez 2024",
    subjects: ["Suporte a sistemas escolares", "Desenvolvimento de interfaces internas"],
  },
];

const subjects: Subject[] = [
  {
    name: "Análise e Desenvolvimento de Sistemas",
    audience: "Ensino técnico",
    level: "Intermediário",
    description:
      "Modelagem, análise de requisitos e desenvolvimento de sistemas de informação. Os alunos aprendem a pensar em soluções estruturadas antes de escrever a primeira linha de código.",
    institution: "Instituto Loide Martha",
  },
  {
    name: "Sistemas de Computação e Aplicativos",
    audience: "Ensino técnico",
    level: "Básico",
    description:
      "Fundamentos de hardware, software e sistemas operacionais. Base para entender como aplicações interagem com a infraestrutura que as sustenta.",
    institution: "Instituto Loide Martha",
  },
  {
    name: "Documentação Técnica em TI",
    audience: "Ensino técnico",
    level: "Intermediário",
    description:
      "Produção de documentação técnica clara e útil: especificações, manuais e registros de sistemas.",
    institution: "Instituto Loide Martha",
  },
  {
    name: "Informática Aplicada",
    audience: "Ensino Fundamental 1",
    level: "Básico",
    description:
      "Introdução à computação para crianças: uso de ferramentas digitais, lógica básica e primeiro contato com tecnologia de forma prática.",
    institution: "Instituto Loide Martha",
  },
];

const talks: Talk[] = [
  {
    title: "Talk Loide — Trajetória e mentalidade",
    event: "Instituto Loide Martha — Ensino Médio",
    year: "2026",
    description:
      "Apresentação para alunos do ensino médio sobre minha trajetória: como comecei a programar cedo, as decisões que tomei de forma diferente e como cheguei a trabalhar com desenvolvimento de software e ensino de TI ao mesmo tempo.",
  },
];

export const teaching = { roles, subjects, talks };
```

- [ ] **Step 9: Criar `src/content/data/posts.ts`**

```ts
import type { Post } from "../types";

export const posts: Post[] = [];
```

- [ ] **Step 10: Criar `src/content/index.ts`**

```ts
import { academy } from "./data/academy";
import { experience } from "./data/experience";
import { posts } from "./data/posts";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { teaching } from "./data/teaching";
import type {
  Academy,
  Experience,
  Post,
  Profile,
  Project,
  Subject,
  Talk,
  TeachingRole,
} from "./types";

export async function getProfile(): Promise<Profile> {
  return profile;
}

export async function getProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getExperience(): Promise<Experience[]> {
  return experience;
}

export async function getAcademy(): Promise<Academy> {
  return academy;
}

export async function getTeaching(): Promise<{
  roles: TeachingRole[];
  subjects: Subject[];
  talks: Talk[];
}> {
  return teaching;
}

export async function getPosts(): Promise<Post[]> {
  return posts;
}
```

- [ ] **Step 11: Rodar o script e o type-check**

```bash
pnpm check:content
pnpm exec tsc --noEmit 2>&1 | tail -10
pnpm exec biome check src/content scripts
```

Expected: `check-content: ok`; tsc sem erros novos; Biome sem erros (se reclamar de formatação, rodar `pnpm exec biome check --write src/content scripts`).

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: camada de conteúdo tipada e script de invariantes

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Componentes compartilhados e home

**Files:**
- Create: `src/components/site/{navbar,footer,hero,case-card,work-method,academy-cta,contact-cta,section-wrapper,timeline,page-header}.tsx`, `src/app/(site)/layout.tsx`
- Modify: `src/app/(site)/page.tsx` (substituir inteiro)

**Interfaces:**
- Consumes: getters e tipos da Task 2; tokens e foto da Task 1.
- Produces: `NavBar` (default), `Footer` (default, async), `Hero({ profile })`, `CaseCard({ project })`, `WorkMethod()`, `AcademyCta({ academy })`, `ContactCta({ profile })`, `SectionWrapper({ children, className?, id?, tone? })` (default), `Timeline<T>({ items, renderItem })` (default), `PageHeader({ eyebrow, title, description? })`.

- [ ] **Step 1: `src/components/site/section-wrapper.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "dark";
}

export default function SectionWrapper({
  children,
  className,
  id,
  tone = "light",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "px-6 py-16 md:py-24",
        tone === "dark" && "bg-graphite text-gray-100",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </motion.section>
  );
}
```

- [ ] **Step 2: `src/components/site/timeline.tsx`**

```tsx
import type { ReactNode } from "react";

interface TimelineProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

export default function Timeline<T>({ items, renderItem }: TimelineProps<T>) {
  return (
    <div className="relative">
      <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gray-200" />
      <div className="space-y-10">
        {items.map((item, i) => (
          <div key={`item-${i}`} className="relative pl-8">
            <div className="absolute top-[6px] left-0 h-[15px] w-[15px] rounded-full border-2 border-brand bg-white" />
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `src/components/site/page-header.tsx`**

```tsx
interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="px-6 pt-14 pb-6 md:pt-20">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 4: `src/components/site/navbar.tsx`**

```tsx
"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { to: "/projetos", label: "Projetos" },
  { to: "/academy", label: "Academy" },
  { to: "/blog", label: "Blog" },
  { to: "/sobre", label: "Sobre" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(`${to}/`);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-gray-900"
        >
          {siteConfig.shortName}
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={`text-sm transition-colors ${
                isActive(l.to)
                  ? "font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-gray-500 sm:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="space-y-3 border-b border-gray-100 bg-white px-6 pb-4 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className={`block py-1 text-sm ${
                isActive(l.to) ? "font-medium text-gray-900" : "text-gray-500"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 5: `src/components/site/footer.tsx`**

```tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { getProfile } from "@/content";

export default async function Footer() {
  const profile = await getProfile();

  return (
    <footer className="border-t border-gray-200 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${profile.contact.email}`}
            className="text-gray-500 transition-colors hover:text-gray-900"
            aria-label="Email"
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-900"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 transition-colors hover:text-gray-900"
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: `src/components/site/hero.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Profile } from "@/content/types";
import { cn } from "@/lib/utils";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="px-6 pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            {profile.shortName}
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {profile.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600">
            {profile.subheadline}
          </p>
          <p className="mt-3 text-sm text-gray-500">{profile.availability}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#cases"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-brand text-white hover:bg-brand-strong",
              )}
            >
              Ver cases
            </Link>
            <Link
              href="/academy"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Techs Academy
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-3xl bg-brand-soft">
          <Image
            src={profile.photo}
            alt={`Foto de ${profile.shortName}`}
            fill
            priority
            sizes="(min-width: 768px) 320px, 70vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: `src/components/site/case-card.tsx`**

```tsx
import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/content/types";

export function CaseCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-brand/40 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg leading-snug font-semibold text-gray-900">
          {project.title}
        </h3>
        <Badge
          variant="outline"
          className="shrink-0 border-gray-200 text-[10px] text-gray-500"
        >
          {project.status}
        </Badge>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-gray-600">
        {project.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded bg-brand-soft px-2 py-0.5 font-mono text-[11px] text-brand-strong"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          {project.visibility === "private" && (
            <>
              <Lock className="h-3 w-3" /> Repositório privado
            </>
          )}
        </span>
        <span className="flex items-center gap-1 font-medium text-brand group-hover:text-brand-strong">
          {project.case ? "Ler case" : "Case em breve"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 8: `src/components/site/work-method.tsx`**

```tsx
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
    <SectionWrapper tone="dark">
      <p className="font-mono text-xs uppercase tracking-widest text-academy">
        Como eu trabalho
      </p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight md:text-3xl">
        Sintoma, causa raiz, documentação.
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n}>
            <span className="font-mono text-sm text-brand">{s.n}</span>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-5 font-mono text-sm leading-relaxed text-gray-300">
        <p className="text-gray-500"># exemplo: XCupons</p>
        <p>
          <span className="text-academy">sintoma</span>{" "}
          catálogo acoplado ao Mercado Livre
        </p>
        <p>
          <span className="text-academy">causa raiz</span>{" "}
          preço e comissão modelados como atributo do produto, mas variam por oferta
        </p>
        <p>
          <span className="text-academy">correção</span>{" "}
          produto canônico com N ofertas por origem
        </p>
        <p>
          <span className="text-academy">registro</span>{" "}
          decisão documentada + script de reconciliação da migração
        </p>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 9: `src/components/site/academy-cta.tsx`**

```tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Academy } from "@/content/types";
import { cn } from "@/lib/utils";
import SectionWrapper from "./section-wrapper";

export function AcademyCta({ academy }: { academy: Academy }) {
  return (
    <SectionWrapper className="bg-academy-soft">
      <p className="font-mono text-xs uppercase tracking-widest text-academy-strong">
        Docência
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
        {academy.name}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
        {academy.tagline} {academy.intro}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={academy.courseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-academy text-gray-950 hover:bg-academy-strong",
          )}
        >
          Conhecer o curso
        </a>
        <Link
          href="/academy"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Metodologia
        </Link>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 10: `src/components/site/contact-cta.tsx`**

```tsx
import { FileDown, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Profile } from "@/content/types";
import { cn } from "@/lib/utils";

export function ContactCta({ profile }: { profile: Profile }) {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
          Vamos conversar?
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-gray-600">
          Tem uma vaga, um projeto ou quer trocar ideia sobre sistemas e ensino?
          Escreva.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.contact.email}`}
            className={cn(
              buttonVariants(),
              "bg-brand text-white hover:bg-brand-strong",
            )}
          >
            <Mail className="mr-1.5 h-4 w-4" />
            Email
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            <Linkedin className="mr-1.5 h-4 w-4" />
            LinkedIn
          </a>
          <Link
            href="/cv/developer"
            className={buttonVariants({ variant: "outline" })}
          >
            <FileDown className="mr-1.5 h-4 w-4" />
            Currículo dev
          </Link>
          <Link
            href="/cv/teacher"
            className={buttonVariants({ variant: "outline" })}
          >
            <FileDown className="mr-1.5 h-4 w-4" />
            Currículo docente
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 11: `src/app/(site)/layout.tsx`**

```tsx
import Footer from "@/components/site/footer";
import NavBar from "@/components/site/navbar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 12: Substituir `src/app/(site)/page.tsx` inteiro**

```tsx
import { AcademyCta } from "@/components/site/academy-cta";
import { CaseCard } from "@/components/site/case-card";
import { ContactCta } from "@/components/site/contact-cta";
import { Hero } from "@/components/site/hero";
import SectionWrapper from "@/components/site/section-wrapper";
import { WorkMethod } from "@/components/site/work-method";
import { getAcademy, getFeaturedProjects, getProfile } from "@/content";

export default async function Home() {
  const [profile, featured, academy] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
    getAcademy(),
  ]);

  return (
    <>
      <Hero profile={profile} />
      <SectionWrapper id="cases">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Cases em destaque
        </h2>
        <p className="mb-10 text-sm text-gray-500">
          Sistemas que desenhei e mantenho. Os repositórios são privados; cada
          case mostra o problema, as decisões e os trade-offs.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <CaseCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionWrapper>
      <WorkMethod />
      <AcademyCta academy={academy} />
      <ContactCta profile={profile} />
    </>
  );
}
```

- [ ] **Step 13: Verificar**

```bash
pnpm exec tsc --noEmit 2>&1 | tail -15
pnpm exec biome check src/components/site "src/app/(site)"
```

Expected: sem erros. Erros de tsc vindos de `src/app/Developer`, `Teacher`, `cv/*` e `components/portfolio/*` ainda são aceitáveis só se já existiam no baseline (esses arquivos continuam intactos até a Task 7). Se `<Link>` reclamar de `buttonVariants` ou `render`, o código acima já usa a assinatura exportada de `button.tsx`; conferir com `grep -n "export" src/components/ui/button.tsx`.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "feat: componentes do novo site e nova home

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Páginas de projetos e case do BlueDraft

**Files:**
- Create: `src/app/(site)/projetos/page.tsx`, `src/app/(site)/projetos/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getProjects`, `getFeaturedProjects`, `getProject`, `CaseCard`, `PageHeader`, `SectionWrapper`.
- Produces: rotas `/projetos` e `/projetos/[slug]` (estáticas via `generateStaticParams`).

- [ ] **Step 1: `src/app/(site)/projetos/page.tsx`**

```tsx
import { ArrowUpRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CaseCard } from "@/components/site/case-card";
import { PageHeader } from "@/components/site/page-header";
import { getFeaturedProjects, getProjects } from "@/content";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Cases e projetos: problema, decisões de arquitetura e trade-offs.",
};

export default async function ProjectsPage() {
  const [featured, all] = await Promise.all([
    getFeaturedProjects(),
    getProjects(),
  ]);
  const others = all.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Projetos"
        title="Cases e projetos"
        description="Os destaques são privados e descritos como cases: problema, decisões de arquitetura e trade-offs. Os demais têm código aberto ou foram entregues a clientes."
      />
      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <CaseCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section className="px-6 pt-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900">
            Outros projetos
          </h2>
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projetos/${p.slug}`}
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {p.title}
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        {p.status}
                      </span>
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-600">
                      {p.summary}
                    </p>
                  </div>
                  {p.visibility === "private" ? (
                    <Lock className="h-4 w-4 shrink-0 text-gray-400" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-brand" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: `src/app/(site)/projetos/[slug]/page.tsx`**

```tsx
import { ArrowLeft, ExternalLink, Github, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getProject, getProjects } from "@/content";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="px-6 pt-10 pb-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Projetos
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-brand">
          {project.status} · {project.role}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded bg-brand-soft px-2 py-0.5 font-mono text-xs text-brand-strong"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.visibility === "public" && project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <Github className="mr-1.5 h-4 w-4" />
              Código
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <ExternalLink className="mr-1.5 h-4 w-4" />
              Ver no ar
            </a>
          )}
          {project.visibility === "private" && (
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              Repositório privado. Esta página descreve o problema e as
              decisões, sem expor código.
            </span>
          )}
        </div>

        {project.case ? (
          <div className="mt-14 space-y-12">
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                O problema
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                {project.case.problem}
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Decisões de arquitetura
              </h2>
              <ol className="mt-5 space-y-6">
                {project.case.decisions.map((d, i) => (
                  <li key={d.title} className="flex gap-4">
                    <span className="font-mono text-sm text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{d.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {d.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Trade-offs
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                {project.case.tradeoffs.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Situação
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                {project.case.result}
              </p>
            </section>
          </div>
        ) : (
          <p className="mt-14 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600">
            O case completo deste projeto está em preparação.
          </p>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Verificar tipos, lint e build parcial**

```bash
pnpm exec tsc --noEmit 2>&1 | tail -15
pnpm exec biome check "src/app/(site)/projetos"
```

Expected: sem erros novos.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: páginas de projetos e case do BlueDraft

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Academy, Sobre e Blog

**Files:**
- Create: `src/app/(site)/academy/page.tsx`, `src/app/(site)/sobre/page.tsx`, `src/app/(site)/blog/page.tsx`

**Interfaces:**
- Consumes: `getAcademy`, `getTeaching`, `getProfile`, `getExperience`, `getPosts`, `PageHeader`, `Timeline`, `SectionWrapper`, `ContactCta`.
- Produces: rotas `/academy`, `/sobre`, `/blog`.

- [ ] **Step 1: `src/app/(site)/academy/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { buttonVariants } from "@/components/ui/button";
import { getAcademy, getTeaching } from "@/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Techs Academy",
  description:
    "Cursos de informática para quem quer aprender fazendo. Metodologia e docência.",
};

export default async function AcademyPage() {
  const [academy, teaching] = await Promise.all([getAcademy(), getTeaching()]);

  return (
    <>
      <PageHeader
        eyebrow="Docência"
        title={academy.name}
        description={`${academy.tagline} ${academy.intro}`}
      />

      <section className="px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-3">
          <a
            href={academy.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-academy text-gray-950 hover:bg-academy-strong",
            )}
          >
            Conhecer o curso
          </a>
          <a
            href={academy.hubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Ver todos os cursos
          </a>
        </div>
      </section>

      <section className="bg-academy-soft px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Como eu ensino
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {academy.pillars.map((p, i) => (
              <div key={p.title}>
                <span className="font-mono text-sm text-academy-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-gray-700">
            {academy.structure}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Em sala de aula
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {teaching.subjects.map((s) => (
              <div
                key={s.name}
                className="rounded-xl border border-gray-200 p-5"
              >
                <h3 className="font-semibold text-gray-900">{s.name}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {s.audience} · {s.level} · {s.institution}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {teaching.talks.length > 0 && (
            <>
              <h2 className="mt-14 text-2xl font-bold tracking-tight text-gray-900">
                Palestras
              </h2>
              <div className="mt-6 space-y-5">
                {teaching.talks.map((t) => (
                  <div key={t.title}>
                    <h3 className="font-semibold text-gray-900">
                      {t.title}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        ({t.year})
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500">{t.event}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: `src/app/(site)/sobre/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { ContactCta } from "@/components/site/contact-cta";
import { PageHeader } from "@/components/site/page-header";
import Timeline from "@/components/site/timeline";
import { getExperience, getProfile } from "@/content";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Desenvolvedor fullstack e professor técnico de TI: método, experiência e stack.",
};

export default async function AboutPage() {
  const [profile, experience] = await Promise.all([
    getProfile(),
    getExperience(),
  ]);

  return (
    <>
      <PageHeader eyebrow="Sobre" title={profile.name} />

      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[1fr_1.6fr]">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-3xl bg-brand-soft">
            <Image
              src={profile.photo}
              alt={`Foto de ${profile.shortName}`}
              fill
              sizes="(min-width: 768px) 320px, 70vw"
              className="object-contain object-bottom"
            />
          </div>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-gray-900">
            Experiência
          </h2>
          <Timeline
            items={experience}
            renderItem={(e) => (
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">{e.company}</h3>
                  <span className="text-xs text-gray-500">{e.period}</span>
                </div>
                <p className="text-sm text-brand">{e.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {e.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          />
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
            Stack
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profile.skills.map((g) => (
              <div key={g.category}>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  {g.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white px-2 py-0.5 font-mono text-[11px] text-gray-700 ring-1 ring-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta profile={profile} />
    </>
  );
}
```

- [ ] **Step 3: `src/app/(site)/blog/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { getPosts } from "@/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas técnicas sobre arquitetura, diagnóstico e ensino.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notas técnicas"
        description="Textos curtos sobre arquitetura, diagnóstico de sistemas e ensino."
      />
      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 p-8 text-sm text-gray-600">
              Os primeiros textos saem em breve. Enquanto isso, veja os{" "}
              <Link href="/projetos" className="text-brand underline">
                cases
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-6">
              {posts.map((p) => (
                <li key={p.slug}>
                  <h2 className="font-semibold text-gray-900">{p.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">{p.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Verificar**

```bash
pnpm exec tsc --noEmit 2>&1 | tail -15
pnpm exec biome check "src/app/(site)"
```

Expected: sem erros novos.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: páginas Academy, Sobre e Blog

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: CVs com o novo conteúdo (sem formação inventada)

**Files:**
- Move: `src/components/cv-dev.tsx` → `src/components/cv/developer-pdf.tsx`; `src/components/cv-teacher.tsx` → `src/components/cv/teacher-pdf.tsx`
- Create: `src/components/cv/developer-view.tsx`, `src/components/cv/teacher-view.tsx`
- Modify: `src/app/cv/developer/page.tsx`, `src/app/cv/teacher/page.tsx` (substituir inteiros)

**Interfaces:**
- Consumes: getters da Task 2.
- Produces:
  - `DevPDFDocument({ profile, experience, projects, skills })` default de `@/components/cv/developer-pdf`, com `skills: SkillGroup[]`.
  - `TeacherPDFDocument({ profile, roles, subjects, talks })` default de `@/components/cv/teacher-pdf`.
  - `CvDeveloperView(props)` e `CvTeacherView(props)` (client).

- [ ] **Step 1: Mover os PDFs**

```bash
mkdir -p src/components/cv
git mv src/components/cv-dev.tsx src/components/cv/developer-pdf.tsx
git mv src/components/cv-teacher.tsx src/components/cv/teacher-pdf.tsx
```

- [ ] **Step 2: Editar `src/components/cv/developer-pdf.tsx`**

Aplicar estas substituições exatas (cada `old` aparece uma vez, exceto onde indicado):

1. Linha do import: `import { developerData, profileData } from "./portfolio/data";` →
```tsx
import type {
  Experience,
  Profile,
  Project,
  SkillGroup,
} from "@/content/types";
```
2. Bloco
```tsx
const featuredProjects = developerData.projects.slice(0, 3);

export default function DevPDFDocument() {
  return (
```
→
```tsx
interface DevPdfProps {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
}

export default function DevPDFDocument({
  profile,
  experience,
  projects,
  skills,
}: DevPdfProps) {
  const featuredProjects = projects.slice(0, 4);

  return (
```
3. `{developerData.hero.headline}` → `{profile.headline}`
4. `{developerData.hero.tagline}` → `{profile.about.slice(0, 2).join(" ")}`
5. `developerData.experience.map(` → `experience.map(`
6. `{p.name}` → `{p.title}`
7. `{p.tag && <Text style={styles.projectTag}>{p.tag}</Text>}` → `<Text style={styles.projectTag}>{p.status}</Text>`
8. `{p.description}` → `{p.summary}`
9. `{p.tech.map((t) => (` → `{p.stack.map((t) => (`
10. Bloco do stack:
```tsx
            {Object.entries(developerData.stack).map(([cat, techs]) => (
              <View key={cat} style={styles.stackCategory}>
                <Text style={styles.stackCategoryName}>{cat}</Text>
                {techs.map((t) => (
```
→
```tsx
            {skills.map(({ category, items }) => (
              <View key={category} style={styles.stackCategory}>
                <Text style={styles.stackCategoryName}>{category}</Text>
                {items.map((t) => (
```
11. Remover o bloco inteiro de formação (do comentário até o `</View>` que o fecha), ou seja estas 7 linhas:
```tsx

        {/* Education placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
          <View style={styles.eduItem}>
            <Text style={styles.eduDegree}>Bacharelado em Ciência da Computação</Text>
            <Text style={styles.eduSchool}>Universidade Federal — 2014 a 2018</Text>
          </View>
        </View>
```
12. Em todas as ocorrências, `profileData.` → `profile.` (ex.: `profileData.name`, `profileData.contact.email`, `profileData.contact.linkedin`, `profileData.contact.github`). Fazer com:
```bash
sed -i 's/profileData\./profile./g' src/components/cv/developer-pdf.tsx
```

- [ ] **Step 3: Editar `src/components/cv/teacher-pdf.tsx`**

1. Import `import { profileData, teacherData } from "./portfolio/data";` →
```tsx
import type { Profile, Subject, Talk, TeachingRole } from "@/content/types";
```
2. `export default function TeacherPDFDocument() {` →
```tsx
interface TeacherPdfProps {
  profile: Profile;
  roles: TeachingRole[];
  subjects: Subject[];
  talks: Talk[];
}

export default function TeacherPDFDocument({
  profile,
  roles,
  subjects,
  talks,
}: TeacherPdfProps) {
```
3. `{teacherData.hero.headline}` → `Professor técnico de TI`
4. `{teacherData.hero.tagline}` → `{profile.about.slice(0, 2).join(" ")}`
5. `teacherData.experience.map(` → `roles.map(`
6. `teacherData.courses.map(` → `subjects.map(`
7. `{teacherData.talks && teacherData.talks.length > 0 && (` → `{talks.length > 0 && (`
8. `teacherData.talks.map(` → `talks.map(`
9. Remover o bloco inteiro de formação, do comentário `{/* Education */}` até o `</View>` que o fecha (as 11 linhas com "Formação Acadêmica", "Bacharelado..." e "Licenciatura...").
10. `sed -i 's/profileData\./profile./g' src/components/cv/teacher-pdf.tsx`

- [ ] **Step 4: Verificar que os PDFs não têm mais referência ao dado antigo**

```bash
grep -n -E "developerData|teacherData|profileData|Bacharel|Licenciatura|Universidade" src/components/cv/*.tsx
```

Expected: nenhuma saída.

- [ ] **Step 5: Criar `src/components/cv/developer-view.tsx`**

```tsx
"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type {
  Experience,
  Profile,
  Project,
  SkillGroup,
} from "@/content/types";
import DevPDFDocument from "./developer-pdf";

interface Props {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
}

export default function CvDeveloperView(props: Props) {
  const { profile, experience, projects } = props;
  const document = <DevPDFDocument {...props} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-3 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/sobre"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao portfólio
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-1.5 h-4 w-4" />
              Imprimir
            </Button>
            <PDFDownloadLink
              document={document}
              fileName={`curriculo-dev-${profile.name.toLowerCase().replace(/\s+/g, "-")}.pdf`}
            >
              {({ loading }) => (
                <Button
                  size="sm"
                  className="bg-brand text-white hover:bg-brand-strong"
                  disabled={loading}
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  {loading ? "Gerando PDF..." : "Baixar PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 print:hidden">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-xs text-gray-500">
            Pré-visualização do currículo · Clique em "Baixar PDF" para fazer o
            download
          </p>
          <div
            className="overflow-hidden rounded-lg border border-gray-200 shadow-lg"
            style={{ height: "90vh" }}
          >
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              {document}
            </PDFViewer>
          </div>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[210mm] p-10 text-sm text-gray-900 print:block">
        <h1 className="mb-1 text-2xl font-bold text-brand">{profile.name}</h1>
        <p className="mb-3 text-gray-600">{profile.headline}</p>
        <p className="mb-6 text-xs text-gray-500">
          {profile.contact.email} · {profile.contact.linkedin} ·{" "}
          {profile.contact.github}
        </p>
        <hr className="mb-6" />

        <PrintSection title="Resumo">
          {profile.about.slice(0, 2).join(" ")}
        </PrintSection>

        <PrintSection title="Experiência Profissional">
          {experience.map((e) => (
            <div key={`${e.company}-${e.role}`} className="mb-4">
              <div className="flex justify-between">
                <strong>{e.company}</strong>
                <span className="text-xs text-gray-500">{e.period}</span>
              </div>
              <div className="mb-1 text-xs text-brand">{e.role}</div>
              <p className="text-xs text-gray-600">{e.description}</p>
              <p className="mt-1 text-xs text-gray-500">{e.tech.join(" · ")}</p>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Projetos em Destaque">
          {projects.slice(0, 4).map((p) => (
            <div key={p.slug} className="mb-3">
              <strong className="text-sm">{p.title}</strong>
              <p className="text-xs text-gray-600">{p.summary}</p>
              <p className="mt-1 text-xs text-gray-500">{p.stack.join(" · ")}</p>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Stack Técnica">
          {props.skills.map((g) => (
            <div key={g.category} className="mb-1 text-xs">
              <strong>{g.category}:</strong> {g.items.join(", ")}
            </div>
          ))}
        </PrintSection>
      </div>
    </div>
  );
}

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 border-b border-gray-200 pb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
        {title}
      </h2>
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Criar `src/components/cv/teacher-view.tsx`**

```tsx
"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Profile, Subject, Talk, TeachingRole } from "@/content/types";
import TeacherPDFDocument from "./teacher-pdf";

interface Props {
  profile: Profile;
  roles: TeachingRole[];
  subjects: Subject[];
  talks: Talk[];
}

export default function CvTeacherView(props: Props) {
  const { profile, roles, subjects, talks } = props;
  const document = <TeacherPDFDocument {...props} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-3 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/academy"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao portfólio
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-1.5 h-4 w-4" />
              Imprimir
            </Button>
            <PDFDownloadLink
              document={document}
              fileName={`curriculo-professor-${profile.name.toLowerCase().replace(/\s+/g, "-")}.pdf`}
            >
              {({ loading }) => (
                <Button
                  size="sm"
                  className="bg-academy text-gray-950 hover:bg-academy-strong"
                  disabled={loading}
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  {loading ? "Gerando PDF..." : "Baixar PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 print:hidden">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-xs text-gray-500">
            Pré-visualização do currículo · Clique em "Baixar PDF" para fazer o
            download
          </p>
          <div
            className="overflow-hidden rounded-lg border border-gray-200 shadow-lg"
            style={{ height: "90vh" }}
          >
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              {document}
            </PDFViewer>
          </div>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[210mm] p-10 text-sm text-gray-900 print:block">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">{profile.name}</h1>
        <p className="mb-3 text-gray-600">Professor técnico de TI</p>
        <p className="mb-6 text-xs text-gray-500">
          {profile.contact.email} · {profile.contact.linkedin}
        </p>
        <hr className="mb-6" />

        <PrintSection title="Resumo">
          {profile.about.slice(0, 2).join(" ")}
        </PrintSection>

        <PrintSection title="Experiência Docente">
          {roles.map((r) => (
            <div key={`${r.role}-${r.period}`} className="mb-4">
              <div className="flex justify-between">
                <strong>{r.institution}</strong>
                <span className="text-xs text-gray-500">{r.period}</span>
              </div>
              <div className="mb-1 text-xs text-gray-700">{r.role}</div>
              <p className="text-xs text-gray-500">{r.subjects.join(" · ")}</p>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Disciplinas Ministradas">
          {subjects.map((s) => (
            <div key={s.name} className="mb-1 text-xs">
              <strong>{s.name}</strong> — {s.level} · {s.audience} ·{" "}
              {s.institution}
            </div>
          ))}
        </PrintSection>

        {talks.length > 0 && (
          <PrintSection title="Palestras & Workshops">
            {talks.map((t) => (
              <div key={t.title} className="mb-2 text-xs">
                <strong>{t.title}</strong>{" "}
                <span className="text-gray-500">({t.year})</span>
                <p className="text-gray-600">{t.event}</p>
              </div>
            ))}
          </PrintSection>
        )}
      </div>
    </div>
  );
}

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 border-b border-gray-200 pb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
        {title}
      </h2>
      {children}
    </div>
  );
}
```

- [ ] **Step 7: Substituir `src/app/cv/developer/page.tsx` inteiro**

```tsx
import type { Metadata } from "next";
import CvDeveloperView from "@/components/cv/developer-view";
import { getExperience, getProfile, getProjects } from "@/content";

export const metadata: Metadata = { title: "Currículo — Desenvolvedor" };

export default async function CvDeveloperPage() {
  const [profile, experience, projects] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
  ]);

  return (
    <CvDeveloperView
      profile={profile}
      experience={experience}
      projects={projects}
      skills={profile.skills}
    />
  );
}
```

- [ ] **Step 8: Substituir `src/app/cv/teacher/page.tsx` inteiro**

```tsx
import type { Metadata } from "next";
import CvTeacherView from "@/components/cv/teacher-view";
import { getProfile, getTeaching } from "@/content";

export const metadata: Metadata = { title: "Currículo — Professor" };

export default async function CvTeacherPage() {
  const [profile, teaching] = await Promise.all([getProfile(), getTeaching()]);

  return (
    <CvTeacherView
      profile={profile}
      roles={teaching.roles}
      subjects={teaching.subjects}
      talks={teaching.talks}
    />
  );
}
```

- [ ] **Step 9: Verificar**

```bash
pnpm exec tsc --noEmit 2>&1 | tail -20
pnpm exec biome check src/components/cv src/app/cv
```

Expected: sem erros novos. Se o Biome reclamar de estilos de `developer-pdf.tsx`/`teacher-pdf.tsx` herdados (arquivos antigos), rodar `pnpm exec biome check --write` neles, sem mudar lógica.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: CVs lendo da camada de conteúdo, sem formação inventada

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Redirects, SEO, limpeza e verificação final

**Files:**
- Create: `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Modify: `next.config.ts`
- Delete: `src/app/Developer/`, `src/app/Teacher/`, `src/components/portfolio/`, `src/components/person-card.tsx`

**Interfaces:**
- Consumes: tudo das tasks anteriores.
- Produces: redirects `/Developer` → `/`, `/Teacher` → `/academy`; `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

- [ ] **Step 1: Substituir `next.config.ts` inteiro**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/Developer", destination: "/", permanent: true },
      { source: "/developer", destination: "/", permanent: true },
      { source: "/Teacher", destination: "/academy", permanent: true },
      { source: "/teacher", destination: "/academy", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { getProjects } from "@/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const routes = ["", "/projetos", "/academy", "/blog", "/sobre"];

  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}` })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/projetos/${p.slug}` })),
  ];
}
```

- [ ] **Step 3: `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: `src/app/opengraph-image.tsx`**

```tsx
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProfile } from "@/content";

export const alt = "Danilo Romão — Desenvolvedor fullstack e educador";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const profile = await getProfile();
  const photo = await readFile(path.join(process.cwd(), "public", "danilo.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#2563eb",
        color: "white",
        padding: 64,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
        <div style={{ fontSize: 30, opacity: 0.85 }}>{profile.shortName}</div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 24,
          }}
        >
          {profile.headline}
        </div>
      </div>
      {/* biome-ignore lint/performance/noImgElement: ImageResponse (satori) não suporta next/image */}
      <img src={src} width={320} height={480} alt="" style={{ objectFit: "contain" }} />
    </div>,
    size,
  );
}
```

- [ ] **Step 5: Remover o código antigo**

```bash
git rm -r src/app/Developer src/app/Teacher src/components/portfolio src/components/person-card.tsx
grep -rn -E "portfolio/data|person-card|developerData|teacherData|profileData" src || echo "sem referências antigas"
```

Expected: `sem referências antigas`.

- [ ] **Step 6: Verificação estática completa**

```bash
pnpm check:content
pnpm exec tsc --noEmit
pnpm exec biome check src/content src/components/site src/components/cv src/app scripts next.config.ts
pnpm build 2>&1 | tail -40
```

Expected: `check-content: ok`; tsc limpo; Biome limpo; build conclui e lista as rotas `/`, `/projetos`, `/projetos/[slug]` (11 caminhos), `/academy`, `/sobre`, `/blog`, `/cv/developer`, `/cv/teacher`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`. Se o build quebrar no `opengraph-image` (satori), trocar o `<img>` da foto por um bloco só de texto e anotar a mudança no commit.

- [ ] **Step 7: Verificação em execução (navegador/HTTP)**

```bash
pnpm dev > /tmp/dev.log 2>&1 &
sleep 8
for p in / /projetos /projetos/bluedraft /projetos/xcupons /projetos/avaliacao-coordenadores /projetos/pass-in /academy /sobre /blog /cv/developer /cv/teacher /sitemap.xml /robots.txt /opengraph-image; do
  printf "%s -> " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000$p"
done
printf "/Developer -> "; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/Developer
printf "/Teacher -> ";   curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/Teacher
printf "/projetos/inexistente -> "; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/projetos/inexistente
echo "--- links de repo em projetos privados:"
for s in bluedraft xcupons avaliacao-coordenadores; do
  printf "%s: " "$s"; curl -s "http://localhost:3000/projetos/$s" | grep -c -E "github.com/DaniloDevs/(bluedraft|xcupons|ap-loide)" || true
done
```

Expected: 200 em todas as rotas e no sitemap/robots/OG; `/Developer` → 308 com destino `/`; `/Teacher` → 308 com destino `/academy`; `/projetos/inexistente` → 404; contagem `0` de links de repo nos três projetos privados. Depois, parar o servidor (`kill %1`) e conferir visualmente no navegador (home, `/projetos/bluedraft`, `/sobre`, `/academy`, largura mobile ~375px): foto no hero, faixa grafite, CTA âmbar, navbar no mobile.

- [ ] **Step 8: Marcar textos para revisão do Danilo**

Criar `docs/superpowers/plans/2026-10-14-revisao-de-texto.md` listando, em checklist, todo texto que é rascunho:

```markdown
# Textos para revisão do Danilo

- [ ] Hero: título e subtítulo (`src/content/data/profile.ts`)
- [ ] `availability` (meio período ou contrato) — quer mesmo publicar isso?
- [ ] `about` (3 parágrafos, `/sobre` e resumo dos CVs)
- [ ] Case do BlueDraft inteiro (`src/content/data/projects.ts`) — conferir fatos e trade-offs
- [ ] Resumos de XCupons e Avaliação de coordenadores (cases ainda "em breve")
- [ ] Bloco "exemplo: XCupons" em `src/components/site/work-method.tsx` — a causa raiz é inferência do assistente
- [ ] `academy.ts`: intro, estrutura em 4 ciclos e pilares
- [ ] Nome do curso 8488982: hoje o botão diz "Conhecer o curso"
- [ ] Avaliação de coordenadores: autorizado citar a instituição pelo nome? (hoje o projeto é neutro)
- [ ] URL de produção do site (`NEXT_PUBLIC_SITE_URL`) para sitemap e OG
```

- [ ] **Step 9: Commit final**

```bash
git add -A
git commit -m "feat: redirects, SEO, remoção do código antigo e checklist de revisão

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git log --oneline -8
```

---

## Auto-revisão

**Cobertura do spec:** posicionamento (Task 1, 2, 3) · mapa do site: `/`, `/projetos`, `/projetos/[slug]`, `/academy`, `/blog`, `/sobre`, CVs (Tasks 3–6) · redirects (Task 7) · projetos e ordem dos destaques, outros projetos, regra do ap-loide (Task 2, script) · visual: tokens, tema claro + grafite, foto sobre forma azul (Tasks 1, 3) · componentes `Hero`, `CaseCard`, `WorkMethod`, `AcademyCta`, NavBar/Footer/Timeline/SectionWrapper (Task 3) · camada de conteúdo e regra de privado (Task 2) · higiene técnica `lang`, metadata, OG, sitemap, robots, rotas minúsculas, Server Components (Tasks 1, 3, 7) · validação (Task 7) · riscos: CV client mantido (Task 6), textos marcados para revisão (Task 7 Step 8).

**Desvios do spec, declarados:** (0) o projeto ap-loide aparece como "Avaliação de coordenadores" (slug `avaliacao-coordenadores`) para não expor o nome da instituição; (1) a foto entra na Task 1, não no passo final, porque o hero precisa dela; (2) o terminal falso virou `WorkMethod` com exemplo do XCupons; (3) a formação acadêmica inventada dos PDFs/CV foi removida (achado novo, não estava no spec); (4) `PersonaCard` e a pasta `portfolio/` são removidos na Task 7.

**Consistência de nomes:** `getTeaching()` devolve `{ roles, subjects, talks }`, consumido em `academy/page.tsx` (`teaching.subjects`, `teaching.talks`) e `cv/teacher/page.tsx`; `PrintSection` aparece duplicado em duas views de CV por serem arquivos independentes. `Profile.skills` alimenta `skills` do CV dev e a seção Stack de `/sobre`.
