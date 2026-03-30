import { motion } from 'framer-motion'

export function HomeMatchCard({ match, index }) {
  const date = new Date(match.MatchDate)
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
    >
      <div className="home-match-card-top">
        <span className="home-match-vs">vs</span>
        <p className="home-match-opponent">{match.Opponent}</p>
      </div>
      <div className="home-match-card-bottom">
        <time dateTime={match.MatchDate}>{dateStr}</time>
        <p className="home-match-comp">{match.competitionName || 'Competition'}</p>
        <p className="home-match-venue">{match.Venue === 'Home' ? 'Estadi' : match.Venue}</p>
        <p className="home-match-score">
          <span className="home-match-barça">Barça</span>
          <strong>
            {match.GoalsFor} – {match.GoalsAgainst}
          </strong>
        </p>
        <span className={`pill pill-${match.Result.toLowerCase()} home-match-result`}>{match.Result}</span>
      </div>
    </motion.article>
  )
}
