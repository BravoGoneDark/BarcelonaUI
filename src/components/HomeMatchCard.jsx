import { motion } from 'framer-motion'

export function HomeMatchCard({ match, index, onClick }) {
  const date = new Date(match.date)
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.article
      className="home-match-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="home-match-card-top">
        {match.opponentLogo && (
          <img
            src={match.opponentLogo}
            alt={match.opponent}
            style={{ width: 28, height: 28, objectFit: 'contain' }}
          />
        )}
        <span className="home-match-vs">vs</span>
        <p className="home-match-opponent">{match.opponent}</p>
      </div>
      <div className="home-match-card-bottom">
        <time dateTime={match.date}>{dateStr}</time>
        <p className="home-match-comp">{match.competition || 'Competition'}</p>
        <p className="home-match-venue">{match.venue === 'Home' ? 'Estadi' : match.venue}</p>
        <p className="home-match-score">
          <span className="home-match-barça">Barça</span>
          <strong>
            {match.goalsFor} – {match.goalsAgainst}
          </strong>
        </p>
        <span className={`pill pill-${match.result.toLowerCase()} home-match-result`}>
          {match.result}
        </span>
      </div>
    </motion.article>
  )
}