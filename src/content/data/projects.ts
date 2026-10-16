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
        "Um professor reaproveita o mesmo plano de ensino em várias turmas, semestres e instituições. Se o plano é um documento único, editar uma aula reescreve o que já foi dado e o registro do que foi ministrado deixa de ser confiável.",
      decisions: [
        {
          title: "Blueprint separado da execução",
          body: "O planejamento (disciplina, ciclos, aulas) é o plano-modelo. Cada turma recebe uma vigência, que é um snapshot dele no momento da criação. Editar o blueprint não toca nas vigências.",
        },
        {
          title: "Sync Engine por versão e por campo",
          body: "Cada aula tem uma versão, e o registro guarda a versão do snapshot. Um registro só diverge se ainda não foi ministrado e sua versão está atrás. A detecção é automática; a resolução é manual: o professor aplica ou mantém cada campo (nome, tópicos, conteúdo, resumo). Ciclos e aulas novos também entram por revisão, só em vigências ativas.",
        },
        {
          title: "Imutabilidade após ministrar",
          body: "Marcar uma aula como ministrada é irreversível e congela o conteúdo. Só as anotações da aula seguem editáveis enquanto a vigência está ativa, e uma aula com histórico não pode ser excluída.",
        },
        {
          title: "Núcleo puro e API em camadas",
          body: "Diff, ordenação e métricas ficam em um pacote sem I/O, com testes próprios. A API usa casos de uso com repositório injetado, testados com repositórios em memória. Os erros de domínio viram erros de tRPC só no router, e toda consulta é filtrada por usuário.",
        },
      ],
      tradeoffs: [
        "A revisão campo a campo adiciona um passo ao fluxo do professor, em troca de nunca sobrescrever conteúdo.",
        "O snapshot duplica dados, mas isola o planejamento da execução.",
        "Uma aula ministrada com erro de conteúdo não pode ser corrigida, só anotada. Isso protege o histórico, mas é rígido.",
      ],
      result:
        "Em desenvolvimento ativo e em uso nas minhas aulas. O repositório é privado.",
    },
  },
  {
    slug: "xcupons",
    title: "XCupons",
    summary:
      "Plataforma de automação de marketing de afiliados: coleta ofertas de marketplaces, agrupa anúncios do mesmo item, classifica por nicho, filtra por critérios configuráveis e publica em grupos de WhatsApp e Telegram. Opera com Mercado Livre e Shopee.",
    role: "Autor e desenvolvedor",
    stack: [
      "TypeScript",
      "Fastify",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "BullMQ",
      "Redis",
      "n8n",
      "Docker",
      "Turborepo",
    ],
    status: "Em produção",
    visibility: "private",
    featured: true,
    order: 2,
    case: {
      problem:
        "O sistema foi desenhado em torno de um marketplace, e a Shopee mostrou onde isso quebrava. O preço mediano na Shopee era 3,9 vezes menor que no Mercado Livre (R$ 52,90 contra R$ 205), quase metade do catálogo Shopee ficava abaixo do menor piso de tier, e a comissão informada por anúncio era descartada no parsing.",
      decisions: [
        {
          title: "Domínio agnóstico de marketplace",
          body: "Marketplace vira entidade. O produto é canônico e agrupa as ofertas de cada marketplace. A categoria também é canônica, com comissão por origem, fixa ou por faixa de preço. Não existe condicional por marketplace no código: tudo é guiado por dados.",
        },
        {
          title: "Medir antes de decidir",
          body: "Dumps de produção restaurados em banco descartável derrubaram afirmações da própria spec, como a de que a Shopee já rodava ponta a ponta (no ambiente de desenvolvimento não havia dado nenhum). As correções ficaram anotadas nas specs, sem apagar o texto original.",
        },
        {
          title: "Pipeline em filas com núcleo puro",
          body: "O fluxo é filtro, mensagem e publicação, em filas BullMQ. Score, desconto, aprovação, matching e comissão ficam em um pacote sem I/O. A deduplicação de publicação é atômica.",
        },
        {
          title: "Identidade e mensagem determinísticas",
          body: "Anúncios do mesmo item se agrupam por similaridade de título, com limiar fixo no código. A IA foi removida porque nenhuma funcionalidade dela funcionava, e a mensagem virou uma função pura.",
        },
        {
          title: "Migração modular em 8 grupos",
          body: "Cada grupo é implantado com backup validado, imagens marcadas para rollback e conferência das migrations aplicadas.",
        },
      ],
      tradeoffs: [
        "A categoria canônica exige configurar a comissão de cada marketplace novo. A Shopee entrou com cópia das categorias do Mercado Livre.",
        "O limiar de similaridade fixo é simples e explicável, mas não foi calibrado.",
        "A mensagem determinística é previsível, mas sem variação de texto. A IA pode voltar depois, com o template como fallback.",
        "Migrações que renomeiam tabelas exigem deploy com filas vazias e rollback via dump.",
      ],
      result:
        "Sistema próprio, em produção com Mercado Livre e Shopee. Em outubro de 2026 eram 5.008 produtos, 5.479 ofertas, 14 nichos e 27 categorias. Seis dos oito grupos da migração estão implantados; o ciclo de status e a reingestão por fase estão implementados e aguardam deploy.",
    },
  },
  {
    slug: "fichas-avaliativas",
    title: "Fichas avaliativas de professores",
    summary:
      "Sistema em que coordenadores avaliam professores por série e por ciclo, com histórico imutável, cadastro importado das listas de chamada do Sophia e dashboard analítico por unidade, segmento, série e disciplina.",
    role: "Desenvolvedor",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Supabase",
      "PostgreSQL",
      "Zod",
      "Vitest",
    ],
    status: "Em produção",
    visibility: "private",
    featured: true,
    order: 3,
    case: {
      problem:
        "Uma instituição com duas unidades, Vila São Luís e Jardim Primavera, precisava avaliar professores de forma quantitativa e comparável entre ciclos, sem perder o histórico quando turmas, professores ou perguntas mudam. Um professor dá aula em várias turmas, mas deve ser avaliado uma vez por série, e só em uma turma onde leciona. O cadastro existia apenas em listas de chamada em planilha, exportadas do Sophia.",
      decisions: [
        {
          title: "Histórico imutável por snapshot",
          body: "A avaliação guarda uma cópia dos nomes de unidade, segmento, série, disciplina, professor, turma e ciclo, e a resposta guarda o texto da pergunta. As chaves estrangeiras usam SetNull, então editar ou excluir um cadastro não altera avaliações já feitas. O analítico agrega pelas chaves e usa o snapshot para os rótulos da época.",
        },
        {
          title: "Fato acadêmico em vez de pares manuais",
          body: "A hierarquia unidade, segmento, série e turma é normalizada, e o vínculo entre professor, disciplina e turma vem da lista de chamada. Isso substituiu o pareamento manual de turma e professor do MVP, que não escalava.",
        },
        {
          title: "Geração por série com turma representativa",
          body: "Cada professor é avaliado uma vez por série. O sistema escolhe uma turma representativa entre as que ele leciona, e o coordenador só pode trocar entre turmas elegíveis. Na regência polivalente, a geração colapsa em uma avaliação por série.",
        },
        {
          title: "Escopo e autorização no servidor",
          body: "O coordenador só vê campanhas ativas da sua unidade e os segmentos que lhe foram atribuídos. As regras ficam em Server Actions, sem depender de políticas no banco.",
        },
        {
          title: "Importador testável",
          body: 'A classificação e a normalização das planilhas são módulos puros com testes. O script de importação é idempotente e separa em um grupo "A classificar" o que a heurística não resolve.',
        },
      ],
      tradeoffs: [
        "O snapshot duplica dados e mantém o histórico fiel, mas o rótulo antigo convive com o cadastro atualizado.",
        "A classificação de turmas por código é heurística e exige revisão manual.",
        "Uma avaliação concluída não pode ser reaberta.",
        "Não há trava de concorrência quando dois coordenadores abrem a mesma avaliação.",
      ],
      result:
        "Em uso real pela instituição. O repositório é privado e o case descreve o sistema sem expor dados de professores, turmas ou notas.",
    },
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
