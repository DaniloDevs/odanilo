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
