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
      "Catálogo de produtos multi-marketplace. Nasceu acoplado ao Mercado Livre e está sendo redesenhado para ser agnóstico de origem; Shopee já roda de ponta a ponta.",
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
      "Sistema de avaliações de coordenadores de uma instituição de ensino: cadastro, campanhas, avaliações e importação de dados de um sistema de gestão escolar.",
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
      "API de plataforma que conecta prestadores de serviço a clientes. Cobre gestão de pedidos, avaliações, autenticação social via Google e documentação Swagger.",
    role: "Desenvolvedor full stack",
    stack: [
      "Node.js",
      "TypeScript",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Docker",
    ],
    status: "Cliente",
    visibility: "public",
    repoUrl: "https://github.com/UezCompany/uezcompany-backend",
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
    stack: [
      "TypeScript",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Vitest",
      "Docker",
    ],
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
    status: "Projeto pessoal",
    visibility: "public",
    featured: false,
    order: 8,
  },
  {
    slug: "saas-boilerplate",
    title: "SaaS Boilerplate",
    summary:
      "Boilerplate fullstack para SaaS com autenticação social, organizações, permissões por papel (Admin, Membro, Billing) e monorepo com Turborepo.",
    role: "Autor",
    stack: [
      "Next.js",
      "TypeScript",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Turborepo",
    ],
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
