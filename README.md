# Site — Consultório de Fisioterapia Dr. Lázaro Juliano Teixeira

React + Vite + TypeScript + Tailwind CSS v4 · React Router · GSAP + ScrollTrigger (`@gsap/react`) · Lenis · Lucide.

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist (checa tipos antes)
npm run preview   # serve o build
```

Publicação: o projeto já traz `vercel.json` (Vercel) e `public/_redirects` (Netlify), para as rotas do React Router funcionarem ao recarregar a página.

## Onde editar

- **Todos os dados do consultório:** `src/data/empresa.ts` (contatos, horários, serviços, avaliações, perguntas frequentes).
- **Domínio:** `empresa.ts`, `index.html`, `public/robots.txt` e `public/sitemap.xml`.
- **Cores e fontes:** bloco `@theme` em `src/index.css`.
- **Fotos:** `public/images/`. Todas recebem o mesmo tratamento de cor (`.photo-grade`).

## Estrutura

```
src/
  pages/                 Início, Sobre, Serviços, Serviço (dinâmica), Dúvidas, Contato, Privacidade, 404
  components/            Header, Footer, Layout, Reviews, ContactForm, MapEmbed, RevealImage…
  components/reactbits/  SplitText, RotatingText, CountUp, ScrollReveal, SpotlightCard, MagicBento,
                         ScrollStack, Magnet, ClickSpark, LogoLoop, StaggeredMenu, Noise
                         (recriados em React + GSAP, com o mesmo comportamento dos originais)
  components/ui/         ButtonPrimary, ButtonSecondary, FloatingField, Checkbox, Loader, Accordion
                         (micro-interações no estilo Uiverse, nas cores da marca)
  hooks/                 useLenis, useSEO
  lib/                   gsap (registro único dos plugins), whatsapp, jsonld
  data/empresa.ts
```

## Agenda online

Seção "Escolha o seu horário" na Início (terceira seção, `src/components/Agenda.tsx`, regras em `src/lib/agenda.ts`).

- Mostra só dias e horários de expediente (seg. a sex., 13h30–18h), sempre no horário de Brasília, mesmo para quem acessa de outro fuso.
- Esconde feriados, fins de semana e horários de hoje que começam em menos de 2h.
- Não há servidor: o pedido abre no WhatsApp e o consultório confirma. A agenda não sabe quais horários já estão ocupados.
  Para bloquear horários ocupados automaticamente, é preciso integrar com um calendário (por exemplo Google Agenda ou Cal.com).
- Tudo configurável em `empresa.agenda` (dias, horários, intervalo, antecedência, semanas exibidas, feriados).

## Arquitetura da Início (reformulação de novembro de 2026)

Cada seção é um componente em `src/components/home/` e tem uma âncora usada no menu:

| # | Seção | Âncora | Componente |
|---|-------|--------|------------|
| 01 | Abertura (lema, nome, CTAs) | `#inicio` | `Hero.tsx` |
| 02 | Apresentação profissional | `#sobre` | `Apresentacao.tsx` |
| 03 | Áreas de atuação | `#areas` | `Areas.tsx` |
| 04 | Avaliação e tecnologia | `#tecnologia` | `Tecnologia.tsx` |
| 05 | Processo de atendimento | `#processo` | `Processo.tsx` |
| 06 | Envelhecimento e quedas | `#envelhecimento` | `Envelhecimento.tsx` |
| 07 | Atuação acadêmica | `#academico` | `Academico.tsx` |
| 08 | Produção científica | `#publicacoes` | `Publicacoes.tsx` |
| 09 | Depoimentos (Google, texto íntegro) | `#depoimentos` | `Reviews.tsx` |
| 10 | Contato + agenda online | `#contato`, `#agenda` | `Contato.tsx`, `Agenda.tsx` |

Textos e listas ficam em `src/data/empresa.ts` (`areas`, `tecnologias`, `processo`, `envelhecimento`, `academico`, `publicacoes`, `navLinks`, `navDesktop`).
Links de seção usam `SmartLink` (rola até a seção, inclusive vindo de outra página).

### Como adicionar fotos e publicações

- **Equipamentos:** salve em `public/images/tecnologia/` e preencha `foto: { src, alt }` no item de `tecnologias`.
- **Aulas, palestras e eventos:** salve em `public/images/academico/` e preencha `academico.fotos`.
- **Publicações:** preencha `publicacoes` (tipo, título, veículo, ano, autores, link/DOI, capa). Enquanto a lista estiver vazia, a seção mostra espaços reservados.
- **Botão "Conheça minha trajetória acadêmica":** preencha `curriculoAcademico` (ex.: link do Lattes). Vazio, leva para a página Sobre.

## Pendências [CONFIRMAR]

Procure `CONFIRMAR` no projeto para encontrar todas. Principais:

1. Fotos reais: equipamentos (vHIT, videooculografia, posturografia, AVD, BAIOBIT, Balance Mat), aulas/palestras/eventos, consultório.
2. Publicações reais (títulos, autores, revista, ano, DOI, capas) e link do Lattes ou página acadêmica.
3. Instituições e cursos em que leciona e coordena a pós-graduação.
4. Descrição exata do Balance Mat e lista dos "outros recursos" de avaliação e tratamento.
5. Número do CREFITO.
6. Valor da consulta, convênios, formas de pagamento, duração da primeira consulta.
7. Estacionamento, ponto de referência, sala/andar, acessibilidade.
8. Atendimento domiciliar? Relatório escrito da avaliação? Média de sessões?
9. E-mail, Instagram, CPF/CNPJ (Política de Privacidade) e prazo de retenção dos dados.
10. Coordenadas (lat/lng) para o JSON-LD e domínio definitivo.
11. Agenda online: duração de cada consulta, feriados municipais, recesso e férias.
