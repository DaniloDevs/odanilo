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
      items: [
        "Node.js",
        "TypeScript",
        "Fastify",
        "NestJS",
        "Express",
        "REST APIs",
        "Zod",
      ],
    },
    {
      category: "Banco de Dados",
      items: ["PostgreSQL", "Redis", "Prisma ORM"],
    },
    {
      category: "Frontend",
      items: ["Next.js", "React", "Tailwind CSS", "React Query"],
    },
    {
      category: "DevOps",
      items: [
        "Docker",
        "docker-compose",
        "GitHub Actions",
        "pnpm",
        "Turborepo",
      ],
    },
    {
      category: "Ferramentas",
      items: ["Git", "Biome", "ESLint", "Husky", "Vitest", "Swagger"],
    },
  ],
};
