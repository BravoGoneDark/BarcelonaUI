export function playerAccentClass(position) {
  switch (position) {
    case 'Goalkeeper':
      return 'accent-gk'
    case 'Defender':
      return 'accent-def'
    case 'Midfielder':
      return 'accent-mid'
    case 'Forward':
      return 'accent-fwd'
    default:
      return 'accent-def'
  }
}
