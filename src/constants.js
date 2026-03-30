// src/constants.js

export const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'squad', label: 'Squad' },
  { id: 'player', label: 'Player' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'stats', label: 'Stats' },
  { id: 'admin', label: 'Admin' },
]

export const positions = ['All', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward']

export const POSITION_SHORT = {
  Goalkeeper: 'GK',
  Defender: 'DEF',
  Midfielder: 'MID',
  Forward: 'FWD',
}

export const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.06 },
  },
}

export const listItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
}

export const API_URL = "http://localhost:4000/api";

const TEAM_IDS = {
  "Barcelona": 529, "Barça": 529, "Real Madrid": 541, "Atletico Madrid": 530,
  "Valencia CF": 532, "Athletic Bilbao": 531, "Sevilla": 536, "Villarreal": 533,
  "Real Sociedad": 548, "Girona": 547, "Real Betis": 543, "Celta Vigo": 538,
  "Osasuna": 527, "Getafe": 546, "Alaves": 542, "Rayo Vallecano": 535,
  "Las Palmas": 534, "Mallorca": 798, "Leganes": 545, "Espanyol": 540,
  "Real Valladolid": 550, "Monaco": 91, "Young Boys": 187, "Bayern Munich": 157,
  "Red Star Belgrade": 624, "Brest": 106, "Borussia Dortmund": 165,
  "Benfica": 190, "Atalanta": 499, "Inter Milan": 497, "Barbastro": 3843,
};

const COMP_IDS = {
  "la liga": 140, "champions league": 2, "uefa": 2,
  "copa del rey": 143, "supercopa": 556, "club world cup": 15
};

export const getClubLogo = (clubName) => {
  if (!clubName) return "/crest.svg";
  if (clubName === "Barça" || clubName === "Barcelona") return "/crest.svg";
  const teamId = TEAM_IDS[clubName];
  return teamId ? `https://media.api-sports.io/football/teams/${teamId}.png` : "https://media.api-sports.io/football/teams/0.png";
};

export const getCompLogo = (compName) => {
  if (!compName) return "";
  const name = compName.toLowerCase();
  const match = Object.keys(COMP_IDS).find(key => name.includes(key));
  if (match) {
    const id = COMP_IDS[match];
    return `https://media.api-sports.io/football/leagues/${id}.png`;
  }
  return "";
};

export const TROPHIES = [
  { name: 'La Liga', count: 28, label: 'TITLES' },
  { name: 'UEFA Champions League', count: 5, label: 'TROPHIES' },
  { name: 'FIFA Club World Cup', count: 3, label: 'TROPHIES' },
  { name: 'Copa Del Rey', count: 32, label: 'TROPHIES' },
];

/**
 * UPDATED CLUB HISTORY
 * Mapped to the specific file extensions in your public folder
 */
export const CLUB_HISTORY = [
  {
    title: "1899: THE FOUNDATION",
    description: ["Joan Gamper placed an ad in a local paper.", "Twelve pioneers gathered at Gimnàs Solé.", "The colors Blue and Garnet were chosen.", "A legend was born in the heart of Catalonia."],
    img: "/hist-1899.webp"
  },
  {
    title: "1950s: THE KUBALA EFFECT",
    description: ["Ladislao Kubala arrived and changed everything.", "His skill was so great fans couldn't fit in the old stadium.", "He inspired the construction of the Camp Nou.", "Barça became a global football powerhouse."],
    img: "/hist-kubala.webp"
  },
  {
    title: "1957: CAMP NOU OPENS",
    description: ["The grandest stadium in Europe was unveiled.", "Over 90,000 fans witnessed the opening ceremony.", "It became a fortress of Catalan identity.", "A cathedral of football for generations to come."],
    img: "/hist-campnou.webp"
  },
  {
    title: "1974: THE CRUYFF REVOLUTION",
    description: ["Johan Cruyff signed as a player.", "He led Barça to a historic 5-0 win at the Bernabéu.", "He brought the 'Total Football' philosophy to Spain.", "The club's DNA was altered forever."],
    img: "/hist-cruyff-player.webp"
  },
  {
    title: "1979: LA MASIA IS BORN",
    description: ["The farmhouse became a youth academy.", "The goal was to produce players, not buy them.", "It became the world's most famous talent factory.", "A unique philosophy of home-grown excellence."],
    img: "/hist-lamasia.webp"
  },
  {
    title: "1992: THE DREAM TEAM",
    description: ["Johan Cruyff returned as a manager.", "Koeman's rocket at Wembley won the first European Cup.", "The world fell in love with their style of play.", "Barça finally conquered the summit of Europe."],
    img: "/hist-wembley92.avif"
  },
  {
    title: "2006: THE REIGN OF RONALDINHO",
    description: ["Ronaldinho brought the smile back to football.", "He received a standing ovation at the Bernabéu.", "Barça won their second Champions League in Paris.", "A new era of dominance began."],
    img: "/hist-ronaldinho.webp"
  },
  {
    title: "2009: THE SEXTUPLE",
    description: ["Pep Guardiola led the team to six trophies in one year.", "No club had ever achieved such perfection.", "Tiki-Taka became the benchmark for the world.", "The greatest club season in football history."],
    img: "/hist-sextuple.webp"
  },
  {
    title: "2011: MASTERS OF THE UNIVERSE",
    description: ["The Champions League final at Wembley was a masterclass.", "Ferguson called them the best team he ever faced.", "Messi, Xavi, and Iniesta shared the Ballon d'Or podium.", "Barça reached the pinnacle of sporting beauty."],
    img: "/hist-tikitaka.webp"
  },
  {
    title: "2015: THE MSN TREBLE",
    description: ["Messi, Suarez, and Neymar formed the deadliest trio.", "They scored 122 goals in a single season.", "Barça became the first club to win two trebles.", "An unstoppable force of attacking brilliance."],
    img: "/hist-msn.jpg"
  },
  {
    title: "2021: THE END OF AN ERA",
    description: ["The world wept as Lionel Messi departed.", "The greatest player in history left a 21-year legacy.", "778 games, 672 goals, and 35 trophies later.", "Barça began the difficult journey of rebuilding."],
    img: "/hist-king-messi.webp"
  },
  {
    title: "2024: 125 YEARS OF GREATNESS",
    description: ["The club celebrates its historic anniversary.", "A return to the renovated Spotify Camp Nou looms.", "The next generation of Masia stars takes the stage.", "The motto remains: Més que un club."],
    img: "/hist-125years.webp"
  }
];