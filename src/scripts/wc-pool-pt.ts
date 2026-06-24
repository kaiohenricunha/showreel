import { DemoScript } from "../core/types";

// Demo prediction pool walkthrough (PT). Screenshots come from
// `node scripts/capture.mjs pool pt` against /pt/pool/demo. Captions follow the
// SquadRanks analyst voice: específico, direto, sem travessões, sem encheção.
// Sem regiões de destaque: as capturas são recortes 1920x1080 dentro de uma
// moldura de navegador com padding e objectFit cover, então sobreposições em
// porcentagem não alinham. As legendas conduzem o foco.
export const wcPoolPT: DemoScript = {
  id: "wc-pool-pt",
  title: "Bolão — Copa do Mundo 2026 (PT)",
  tagline: "Faça um bolão da Copa com os amigos, grátis e sem custódia",
  url: "https://www.squadranks.com/pt/pool/demo",
  fps: 30,
  width: 1920,
  height: 1080,
  scenes: [
    {
      type: "title",
      duration: 3,
      heading: "🏆 Bolões SquadRanks",
      subheading: "Palpite em cada jogo. Suba na tabela. Sem segurar dinheiro.",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/pt/pool-predictions.png",
      duration: 5,
      caption:
        "Crave o placar de cada jogo. Placar exato vale 10, acertar o resultado vale 5.",
      transition: "fade",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/pt/pool-members.png",
      duration: 4,
      caption: "Convide a galera por código, link ou QR. 17 dentro, 13 vagas livres.",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/pt/pool-leaderboard.png",
      duration: 6,
      caption:
        "Uma tabela ao vivo classifica todos. Bruno lidera com 80, você é o 8º com 43.",
      transition: "slide-left",
    },
    {
      type: "screenshot",
      src: "screenshots/wc-pool/pt/pool-member-detail.png",
      duration: 5,
      caption: "Abra qualquer rival e veja cada palpite travado e onde os pontos foram.",
      transition: "slide-up",
    },
    {
      type: "title",
      duration: 3,
      heading: "Crie seu bolão grátis",
      subheading: "squadranks.com · o dinheiro fica com o organizador, nunca com a gente",
    },
  ],
};
