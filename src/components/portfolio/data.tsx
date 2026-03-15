// =====================================================
// PORTFOLIO CONTENT — Edit this file to update all content
// =====================================================

export const profileData = {
    name: "Danilo Romão Ferreira da Costa",
    tagline: "Backend Software Engineer & IT educator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    contact: {
        email: "daniloromao.sw@gmail.com",
        linkedin: "https://www.linkedin.com/in/daniloromaoferreira/",
        github: "https://github.com/DaniloDevs",
    },
};

export const developerData = {
    hero: {
        headline: "Backend Developer",
        tagline:
            "Construindo APIs escaláveis e sistemas bem arquitetados com Node.js, TypeScript e Clean Architecture. 19 anos, apaixonado por código limpo e por ensinar o que pratico.",
        stack: ["Node.js", "TypeScript", "Fastify", "PostgreSQL", "Redis", "Docker"],
    },

    projects: [
        {
            name: "UezCompany API",
            description:
                "API em produção que conecta prestadores de serviço a clientes. Cobre gestão completa de pedidos, avaliações, autenticação social via Google e documentação Swagger pública. Projeto real com usuários ativos.",
            tech: ["Node.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Docker"],
            githubUrl: "https://github.com/UezCompany/uezcompany-backend",
            demoUrl: "https://api.uezcompany.com/docs",
            tag: "Em produção",
        },
        {
            name: "Gym Solid",
            description:
                "Sistema de gestão de academia com check-ins, controle de acesso por papel (Admin/Membro) e testes E2E cobrindo os fluxos principais. Referência de aplicação do SOLID e Clean Architecture na prática.",
            tech: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Vitest", "Docker"],
            githubUrl: "https://github.com/DaniloDevs/gym-solid",
            demoUrl: null,
            tag: "Open source",
        },
        {
            name: "Async Print API",
            description:
                "Orquestrador de impressão assíncrona orientado a eventos e domínios. Arquitetura com filas BullMQ, métricas por fila e separação clara de responsabilidades por área do domínio.",
            tech: ["TypeScript", "Fastify", "BullMQ", "Redis", "Prisma", "Biome"],
            githubUrl: "https://github.com/DaniloDevs/async-print-api",
            demoUrl: null,
            tag: "Open source",
        },
        {
            name: "SaaS Boilerplate",
            description:
                "Boilerplate fullstack para aplicações SaaS com autenticação social, gestão de organizações, controle de permissões por papel (Admin/Membro/Billing) e estrutura de monorepo com Turborepo.",
            tech: ["Next.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Turborepo"],
            githubUrl: "https://github.com/DaniloDevs/saas",
            demoUrl: null,
            tag: "Projeto pessoal",
        },
        {
            name: "Code-Craft",
            description:
                "Sistema de indicação e ranking com tracking de convites, geração de IDs únicos e cache otimizado via Redis para consultas de alta frequência. Arquitetura em camadas seguindo princípios DDD.",
            tech: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Redis", "Zod"],
            githubUrl: "https://github.com/DaniloDevs/Code-Craft",
            demoUrl: null,
            tag: "Open source",
        },
        {
            name: "Mythic Codex",
            description:
                "Sistema de gerenciamento de fichas de RPG com arquitetura orientada a serviços, testes automatizados com Vitest e linting moderno com Biome.",
            tech: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Vitest", "Biome"],
            githubUrl: "https://github.com/DaniloDevs/mythic-codex",
            demoUrl: null,
            tag: "Projeto pessoal",
        },
    ],

    stack: {
        Backend: ["Node.js", "TypeScript", "Fastify", "NestJS", "Express", "REST APIs", "Zod"],
        "Banco de Dados": ["PostgreSQL", "Redis", "Prisma ORM"],
        Frontend: ["Next.js", "React", "Tailwind CSS", "React Query"],
        DevOps: ["Docker", "docker-compose", "GitHub Actions", "pnpm", "Turborepo"],
        Ferramentas: ["Git", "Biome", "ESLint", "Husky", "Vitest", "Swagger"],
    },

    experience: [
        {
            company: "Instituto Loide Martha",
            role: "Professor Técnico em TI",
            period: "Fev 2026 — Presente",
            description:
                "Leciono Sistemas de Computação, Análise e Desenvolvimento de Sistemas e Documentação Técnica no curso técnico profissionalizante em Informática. Ensinar arquitetura de software reforça minha capacidade de escrever código mais claro e bem documentado.",
            tech: ["Documentação técnica", "Arquitetura de sistemas", "Ensino"],
        },
        {
            company: "UEZ Company",
            role: "Desenvolvedor Full Stack",
            period: "Mar 2024 — Mar 2025",
            description:
                "Desenvolvimento e manutenção de sistemas frontend e backend da plataforma de serviços. Contribuí na construção da API principal com Fastify e TypeScript, integração com autenticação social e gestão do banco de dados relacional com Prisma.",
            tech: ["Node.js", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "React"],
        },
        {
            company: "Instituto Loide Martha",
            role: "Professor de Informática",
            period: "Mar 2025 — Presente",
            description:
                "Ensino de computação para alunos do Ensino Fundamental, com foco em introdução à tecnologia da informação e uso de ferramentas digitais.",
            tech: ["Informática básica", "Ensino fundamental"],
        },
    ],
};

export const teacherData = {
    hero: {
        headline: "Professor de Tecnologia",
        tagline:
            "Ensino desenvolvimento de sistemas e documentação técnica com base na prática real — usando os mesmos conceitos que aplico na construção de APIs e sistemas em produção.",
    },

    about: {
        bio: "Atuo simultaneamente como desenvolvedor backend e professor de TI no Instituto Loide Martha. Essa combinação não é coincidência — ensinar me obriga a entender profundamente o que pratico. Os alunos aprendem análise de sistemas, computação e documentação técnica com exemplos tirados de projetos reais, não de apostilas desatualizadas.",

        approach:
            "Minha metodologia conecta conceitos da sala de aula com decisões reais de engenharia de software. Quando explico arquitetura de sistemas, uso como referência as mesmas estruturas que implemento no trabalho. Isso torna o aprendizado mais concreto e prepara os alunos para o mercado desde o início.",
    },

    courses: [
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
                "Produção de documentação técnica clara e útil: especificações, manuais e registros de sistemas. Uma das habilidades mais negligenciadas e mais valorizadas no mercado de desenvolvimento.",
            institution: "Instituto Loide Martha",
        },
        {
            name: "Informática Aplicada",
            audience: "Ensino Fundamental 1",
            level: "Básico",
            description:
                "Introdução à computação para crianças — uso de ferramentas digitais, lógica básica e primeiro contato com tecnologia de forma prática e contextualizada.",
            institution: "Instituto Loide Martha",
        },
    ],

    experience: [
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
            subjects: [
                "Informática aplicada",
                "Introdução à tecnologia",
            ],
        },
        {
            institution: "Instituto Loide Martha",
            role: "Suporte Técnico e Desenvolvimento",
            period: "Ago 2024 — Dez 2024",
            subjects: [
                "Suporte a sistemas escolares",
                "Desenvolvimento de interfaces internas",
            ],
        },
    ],

    talks: [
        {
            title: "Talk Loide — Trajetória e mentalidade",
            event: "Instituto Loide Martha — Ensino Médio",
            year: "2026",
            description:
                "Apresentação para alunos do ensino médio sobre minha trajetória: como comecei a programar cedo, as decisões que fiz de forma diferente e como cheguei a trabalhar com desenvolvimento de software e ensino de TI ao mesmo tempo. Foco em mostrar que o caminho não precisa ser linear.",
        },
    ],
};
