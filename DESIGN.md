---
name: Portfólio Danilo Romão
description: Site claro e sóbrio de dev fullstack que diagnostica, estrutura e documenta, com o Techs Academy em âmbar.
colors:
  brand: "oklch(0.546 0.245 262.881)"
  brand-strong: "oklch(0.488 0.243 264.376)"
  brand-soft: "oklch(0.97 0.014 254.604)"
  academy: "oklch(0.769 0.188 70.08)"
  academy-strong: "oklch(0.666 0.179 58.318)"
  academy-soft: "oklch(0.987 0.022 95.277)"
  graphite: "oklch(0.13 0.028 261.692)"
  paper: "oklch(1 0 0)"
  ink: "oklch(0.145 0 0)"
  border: "oklch(0.922 0 0)"
  muted: "oklch(0.97 0 0)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  photo: "1.5rem"
spacing:
  sm: "0.75rem"
  md: "1.5rem"
  lg: "4rem"
  xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    height: "2.5rem"
    padding: "0 0.625rem"
  button-primary-hover:
    backgroundColor: "{colors.brand-strong}"
  button-academy:
    backgroundColor: "{colors.academy}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    height: "2.5rem"
  button-academy-hover:
    backgroundColor: "{colors.academy-strong}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "2.5rem"
  stack-chip:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-strong}"
    rounded: "0.25rem"
    padding: "0.125rem 0.5rem"
  case-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
---

# Design System: Portfólio Danilo Romão

## Overview

**Creative North Star: "O Caderno de Bordo"**

O site se comporta como o diário técnico de quem diagnostica sistemas: página clara, registro numerado, detalhes em mono. A estrutura repete o método do próprio Danilo (sintoma, causa raiz, documentação), então a interface prova o discurso em vez de decorá-lo. Nada compete com o conteúdo: cases, texto e CTAs ocupam o primeiro plano.

A densidade é média e a conduta é direta e sóbria. Uma única identidade azul organiza o site inteiro; o âmbar existe só para o curso Techs Academy. Faixas em grafite escuro marcam seções de destaque ("Como eu trabalho"), dando ritmo sem recorrer a sombras ou gradientes.

**Key Characteristics:**
- Tema claro apenas; sem dark mode neste ciclo.
- Azul para ação e navegação, âmbar exclusivo da Academy.
- Mono (Geist Mono) para rótulos, numeração `01 02 03` e stack; Inter para todo o resto.
- Plano com borda fina; sombra só em resposta a hover.
- Foto em PNG transparente sobre forma azul suave.

## Colors

Paleta de duas vozes sobre papel branco: azul de ação, âmbar de curso, grafite para faixas.

### Primary
- **Azul Techs** (`brand`): botão principal, links de ação, rótulos mono de seção e "Ler case".
- **Azul Profundo** (`brand-strong`): hover do botão principal e texto das chips de stack sobre `brand-soft`.
- **Azul Névoa** (`brand-soft`): fundo da forma atrás da foto e das chips de stack.

### Secondary
- **Âmbar Academy** (`academy`): botão "Conhecer o curso" e acentos da página `/academy`.
- **Âmbar Queimado** (`academy-strong`): hover do botão âmbar; texto âmbar legível usa `amber-800`.
- **Âmbar Creme** (`academy-soft`): fundo da faixa `AcademyCta`.

### Neutral
- **Grafite Noite** (`graphite`): faixas escuras de destaque, com texto gray-100 e gray-400.
- **Papel** (`paper`) e **Tinta** (`ink`): fundo e texto base; texto corrido usa gray-600 a gray-900.
- **Linha Cinza** (`border`): bordas de cards e da navbar (gray-100 a gray-200 em uso).

### Named Rules
**The Amber Is Course Rule.** Âmbar aparece só em Academy e CTAs de curso. Fora disso o acento é azul. A raridade é o que mantém o âmbar legível como "isto é o curso".

**The Contrast Rule.** Texto âmbar sobre fundo claro usa tom escuro (amber-800); âmbar saturado fica restrito a fundos de botão com texto grafite.

## Typography

**Display Font:** Inter (com ui-sans-serif, system-ui)
**Body Font:** Inter
**Label/Mono Font:** Geist Mono (com ui-monospace)

**Character:** Inter carrega a leitura com firmeza neutra; Geist Mono vira a assinatura de "registro técnico" nos rótulos e números.

### Hierarchy
- **Display** (800, 3rem no desktop e 1.875rem no mobile, 1.25): H1 do hero, tracking -0.025em.
- **Headline** (700, 1.875rem, 1.25): títulos de seção.
- **Title** (600, 1.125rem, 1.375): títulos de card e de passo.
- **Body** (400, 1rem, 1.625): texto corrido; largura máxima entre `max-w-xl` e `max-w-2xl` (cerca de 65ch).
- **Label** (Geist Mono, 0.75rem, +0.1em, caixa alta): eyebrow de seção e rótulo "Como eu trabalho".

### Named Rules
**The Mono Is Metadata Rule.** Mono só para metadado: eyebrows, numeração, stack, exemplos de log. Nunca em parágrafo corrido.

## Layout

Coluna centralizada de `max-w-5xl` com gutter de 1.5rem (`px-6`). Seções verticais com respiro de 4rem no mobile e 6rem no desktop (`py-16 md:py-24`). O hero usa grid assimétrico 1.3fr/1fr com a foto à direita; abaixo de `md` empilha. Listas de cases e passos usam 3 colunas em `md`. Navbar fixa de 3.5rem com blur, menu colapsa abaixo de `sm`.

## Elevation & Depth

Plano por padrão. A profundidade vem de borda fina e de troca de faixa (claro, grafite, âmbar creme), não de sombra. Cards ganham `shadow-md` e borda azul a 40% só no hover. Sem glassmorphism fora do blur discreto da navbar.

### Named Rules
**The Flat-At-Rest Rule.** Superfícies não têm sombra em repouso. Sombra é resposta a hover, nunca decoração.

## Shapes

Cantos suaves e consistentes: botões em 8px, cards em 14px (`rounded-xl`), chips em 4px, badges em pílula, foto do hero em 24px. Bordas de 1px em cinza claro. Sem clip-paths ou formas irregulares; a única forma de destaque é o retângulo arredondado azul-névoa atrás da foto.

## Components

### Buttons
- **Shape:** cantos de 8px, altura 40px no tamanho `lg`.
- **Primary:** azul Techs sobre branco; hover vai para azul profundo.
- **Academy:** âmbar com texto grafite, só em CTA do curso.
- **Outline:** fundo branco, borda cinza, hover em `muted`.
- **Focus:** anel de 3px a 50% de `ring`; `active` desloca 1px para baixo.

### Chips
- **Stack:** fundo `brand-soft`, texto `brand-strong`, mono 11px, cantos de 4px.
- **Status:** badge outline cinza com texto 10px.

### Cards / Containers
- **Case card:** branco, borda cinza, raio 14px, padding 24px; rodapé com cadeado "Repositório privado" e link "Ler case" em azul com seta.
- **Estado:** hover com borda azul 40% e `shadow-md`.

### Navigation
Barra sticky branca a 80% com blur, links cinza que escurecem no hover e ficam `font-medium` quando ativos. Menu mobile abre em painel branco com links empilhados.

### Método (assinatura)
Três passos numerados `01 02 03` em mono azul sobre faixa grafite, seguidos de um bloco tipo log (`sintoma`, `causa raiz`, `correção`, `registro`) em mono. É o componente que traduz o posicionamento em forma visual.

## Do's and Don'ts

### Do:
- **Do** usar azul Techs para toda ação principal e âmbar apenas em Academy e CTAs de curso.
- **Do** manter sombras fora do estado de repouso; borda de 1px faz o trabalho.
- **Do** usar Geist Mono em eyebrows, numeração e stack.
- **Do** alternar faixas claras com grafite para criar ritmo.
- **Do** mostrar cadeado e "Repositório privado" em projetos privados, nunca um botão de repositório.

### Don't:
- **Don't** reintroduzir a divisão em cartões Developer/Teacher, o avatar do Unsplash ou o terminal "build-amazing-things".
- **Don't** usar âmbar como acento geral nem texto âmbar saturado sobre branco.
- **Don't** adicionar dark mode ou gradientes neste ciclo.
- **Don't** usar mono em texto corrido.
- **Don't** inventar métricas, depoimentos ou logos de clientes para preencher seções.
