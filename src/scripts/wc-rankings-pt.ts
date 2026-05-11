import { DemoScript } from "../core/types";

export const wcRankingsPT: DemoScript = {
  id: "wc-rankings-pt",
  title: "Ranking de Seleções — Copa 2026 (PT)",
  tagline: "Notas do Sofascore + previsões do Kalshi",
  url: "https://wc-squad-rankings.vercel.app",
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [
    {
      type: "title",
      duration: 3,
      heading: "⚽ Ranking de Seleções — Copa do Mundo 2026",
      subheading: "12 seleções · 198 jogadores · Sofascore + Kalshi",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/composite-view.png",
      duration: 4,
      caption:
        "Rankings compostos combinam notas do elenco com previsões do mercado Kalshi",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/weight-slider-50.png",
      duration: 4,
      caption:
        "Ajuste o equilíbrio entre talento do elenco e sentimento do mercado",
      cursor: {
        points: [
          { x: 27, y: 29 },
          { x: 49, y: 29 },
        ],
        clickAt: [0],
      },
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/spain-expanded.png",
      duration: 5,
      caption:
        "Expanda qualquer seleção — titulares, banco de reservas e dados do técnico",
      highlight: { x: 5, y: 30, width: 90, height: 55 },
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/xi-rating-view.png",
      duration: 4,
      caption:
        "Notas puras do Sofascore — quem tem o melhor time titular?",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/bench-depth.png",
      duration: 4,
      caption:
        "Profundidade do banco — Copa do Mundo exige mais que 11 jogadores",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/france-expanded-bench.png",
      duration: 5,
      caption:
        "Banco da França: Olise, Cherki, Rabiot, Konaté — mais forte que a maioria dos titulares",
      highlight: { x: 5, y: 45, width: 90, height: 45 },
      transition: "slide-up",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/light-mode.png",
      duration: 3,
      caption: "Temas claro e escuro",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-rankings/pt/language-switch.png",
      duration: 3,
      caption: "Disponível em inglês, português, francês e espanhol",
      transition: "fade",
    },
    {
      type: "title",
      duration: 3,
      heading: "github.com/kaiohenricunha/wc-squad-rankings",
      subheading: "Feito com React + Vite · Deploy no Vercel",
    },
  ],
};
