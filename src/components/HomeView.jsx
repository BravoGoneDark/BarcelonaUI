import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { listContainer, listItem, TROPHIES, getCompLogo } from '../constants'
import { HomeMatchCard } from './HomeMatchCard'
import { MatchStatsModal } from './MatchStatsModal'
import HistorySection from './HistorySection';

const HERO_SLIDES = [
  '/pre-match.avif',
  '/stadium-2.avif',
  '/messi-ballon.avif',
  '/fans.avif',
  '/hero-stadium.avif',
]

export function HomeView({ homeData, onNavigate, recentFixtures,}) {
  const [slideIndex, setSlideIndex] = useState(0)
const [prevIndex, setPrevIndex] = useState(null)
const [fading, setFading] = useState(false)
const [selectedFixture, setSelectedFixture] = useState(null)

useEffect(() => {
  const timer = setInterval(() => {
    setPrevIndex(slideIndex)
    setFading(true)
    setTimeout(() => {
      setSlideIndex(i => (i + 1) % HERO_SLIDES.length)
      setFading(false)
      setPrevIndex(null)
    }, 800)
  }, 3000)
  return () => clearInterval(timer)
}, [slideIndex])

  const fixtures = recentFixtures ?? []

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <div className="home-page-bleed">
  <div className="home-hero-site" style={{ position: 'relative', overflow: 'hidden', background: '#06080e' }}>

    {/* Previous slide fading out */}
    {prevIndex !== null && (
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(to top, rgba(6,8,14,0.95) 0%, rgba(6,8,14,0.45) 42%, rgba(6,8,14,0.2) 100%), url(${HERO_SLIDES[prevIndex]})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      />
    )}

    {/* Current slide fading in */}
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(to top, rgba(6,8,14,0.95) 0%, rgba(6,8,14,0.45) 42%, rgba(6,8,14,0.2) 100%), url(${HERO_SLIDES[slideIndex]})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    />

    {/* Text content — sits above both background layers */}
    <div className="home-hero-site-inner" style={{ position: 'relative', zIndex: 1 }}>
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

  </div>  {/* closes home-hero-site */}
</div>  {/* closes home-page-bleed */}

      {/* 2. Recent Results Section */}
      <section className="home-strip-section">
        <div className="home-strip-head">
          <h2 className="home-strip-title">Recent results</h2>
          <button 
            type="button" 
            className="home-strip-link" 
            onClick={() => onNavigate('calendar')}
          >
            Full calendar →
          </button>
        </div>
        
        <div className="home-fixture-scroll" role="list">
          {fixtures.slice(0, 8).map((match, index) => (
            <HomeMatchCard
              key={match.fixtureId}
              match={match}
              index={index}
              onClick={() => setSelectedFixture(match)}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
      {selectedFixture && (
        <MatchStatsModal
          fixtureId={selectedFixture.fixtureId}
          matchInfo={selectedFixture}
          onClose={() => setSelectedFixture(null)}
        />
      )}
      </AnimatePresence>

      {/* 3. Honors Section */}
      <motion.div 
        className="honors-grid" 
        variants={listContainer} 
        initial="hidden" 
        animate="show"
      >
        {TROPHIES.map((trophy) => (
          <motion.div 
            key={trophy.name} 
            className="trophy-card" 
            variants={listItem}
            whileHover={{ y: -8, scale: 1.02, borderColor: '#edbb00' }}
          >
            <div className="trophy-logo-wrap">
              <img 
                src={getCompLogo(trophy.name)} 
                alt={trophy.name} 
                className="trophy-comp-logo" 
              />
            </div>

            <div className="trophy-info-wrap">
              <div className="trophy-name-top">{trophy.name}</div>
              <div className="trophy-main-row">
                <span className="trophy-count-big">{trophy.count}</span>
                <div className="trophy-info-sub">
                   <div className="trophy-label-bottom">{trophy.label}</div>
                   <svg className="mini-gold-cup" viewBox="0 0 24 24">
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2ZM4 9V2H2v7a4 4 0 0 0 4 4v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2a4 4 0 0 0 4-4V2h-2v7a4 4 0 0 0-4 4H8a4 4 0 0 0-4-4ZM12 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-5 4h10v1H7v-1Z" />
                   </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 4. Club History Slider */}
      <HistorySection />

      {/* 5. Stats Quick Cards (Directly follows History) */}
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
      <section className="home-partners-branding">
        <div className="partners-inner">
          <div className="partners-header">
            <h3 className="partners-title">Main Partners</h3>
            <button className="btn-view-partners">VIEW ALL PARTNERS</button>
          </div>
          
          <div className="partners-logos">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="partner-nike" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" className="partner-spotify" />
            <div className="partner-philips">
              <span className="philips-main">PHILIPS</span>
              <span className="philips-sub">AMBILIGHT tv</span>
            </div>
          </div>
        </div>

        <div className="socials-inner">
          <h3 className="socials-title">Follow FC Barcelona on social media</h3>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-x-twitter"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-spotify"></i>
            <i className="fab fa-discord"></i>
            <i className="fab fa-tiktok"></i>
          </div>
        </div>
      </section>
    </div>
  )
}