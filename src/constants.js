export const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'squad', label: 'Squad' },
  { id: 'player', label: 'Player' },
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
