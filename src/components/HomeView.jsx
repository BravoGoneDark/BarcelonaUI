import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { listContainer, listItem } from '../constants'
import { HomeMatchCard } from './HomeMatchCard'

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80'

export function HomeView({ homeData, onNavigate }) {
  const [heroUrl, setHeroUrl] = useState('/hero-stadium.avif')

  useEffect(() => {
    const img = new Image()
    img.onerror = () => setHeroUrl(FALLBACK_HERO)
    img.src = '/hero-stadium.avif'
  }, [])

  const fixtures = homeData.fixtureStrip ?? homeData.recentMatches ?? []

  return (
    <div className="home-page">
      <div className="home-page-bleed">
        <div
          className="home-hero-site"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(6, 8, 14, 0.95) 0%, rgba(6, 8, 14, 0.45) 42%, rgba(6, 8, 14, 0.2) 100%), url(${heroUrl})`,
          }}
        >
          <div className="home-hero-site-inner">
            <p className="eyebrow">Més que un club</p>
            <p className="home-hero-tagline">FC Barcelona — for the fans</p>
            <div className="hero-actions home-hero-actions">
              <motion.button
                type="button"
                className="btn btn-primary"
                onClick={() => onNavigate('squad')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View squad
              </motion.button>
              <motion.button
                type="button"
                className="btn btn-ghost btn-hero-secondary"
                onClick={() => onNavigate('stats')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See stats
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <section className="home-strip-section">
        <div className="home-strip-head">
          <h2 className="home-strip-title">Recent results</h2>
          <button type="button" className="home-strip-link" onClick={() => onNavigate('squad')}>
            View squad →
          </button>
        </div>
        <div className="home-fixture-scroll" role="list">
          {fixtures.slice(0, 8).map((match, index) => (
            <HomeMatchCard key={`${match.MatchDate}-${match.Opponent}-${index}`} match={match} index={index} />
          ))}
        </div>
      </section>

      <motion.div className="stats-grid" variants={listContainer} initial="hidden" animate="show">
        <motion.div className="card card-stat" variants={listItem} whileHover={{ y: -4 }}>
          <span className="stat-num">{homeData.totalPlayers}</span>
          <small>Players</small>
        </motion.div>
        <motion.div className="card card-stat" variants={listItem} whileHover={{ y: -4 }}>
          <span className="stat-num">{homeData.totalPositions}</span>
          <small>Positions</small>
        </motion.div>
        <motion.div className="card card-stat" variants={listItem} whileHover={{ y: -4 }}>
          <span className="stat-num">{homeData.totalNationalities}</span>
          <small>Nationalities</small>
        </motion.div>
      </motion.div>

      <h2 className="section-title">Match log</h2>
      <div className="table-wrap glass-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Competition</th>
              <th>Opponent</th>
              <th>Score</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {homeData.recentMatches.map((match) => (
              <tr key={`${match.MatchDate}-${match.Opponent}`}>
                <td>{new Date(match.MatchDate).toLocaleDateString()}</td>
                <td>{match.competitionName || '—'}</td>
                <td>{match.Opponent}</td>
                <td>
                  {match.GoalsFor}-{match.GoalsAgainst}
                </td>
                <td>
                  <span className={`pill pill-${match.Result.toLowerCase()}`}>{match.Result}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
