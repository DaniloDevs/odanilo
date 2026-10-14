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
    subjects: [
      "Suporte a sistemas escolares",
      "Desenvolvimento de interfaces internas",
    ],
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
