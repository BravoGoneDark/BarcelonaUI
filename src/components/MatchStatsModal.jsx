import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const STAT_KEYS = [
  'Ball Possession',
  'Total Shots',
  'Shots on Goal',
  'Corner Kicks',
  'Fouls',
  'Yellow Cards',
  'Red Cards',
  'Total passes',
  'Passes accurate',
  'Passes %',
  'Offsides',
  'Goalkeeper Saves',
]

function StatRow({ label, barcaVal, oppVal }) {
  const toNum = v => parseFloat(String(v).replace('%', '')) || 0
  const bNum = toNum(barcaVal)
  const oNum = toNum(oppVal)
  const total = bNum + oNum || 1
  const bPct = (bNum / total) * 100

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem',
        gap: '1rem',
      }}>
        <span style={{ color: '#edbb00', fontWeight: 700, minWidth: 36, textAlign: 'left' }}>
          {barcaVal ?? 0}
        </span>
        <span style={{ color: '#666', flex: 1, textAlign: 'center', letterSpacing: '0.05em' }}>
          {label}
        </span>
        <span style={{ color: '#94a3b8', fontWeight: 700, minWidth: 36, textAlign: 'right' }}>
          {oppVal ?? 0}
        </span>
      </div>
      <div style={{
        height: '5px', borderRadius: '3px',
        background: '#1a1a2e', overflow: 'hidden',
        display: 'flex',
      }}>
        <div style={{
          width: `${bPct}%`,
          background: 'linear-gradient(90deg, #a50044, #edbb00)',
          transition: 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          borderRadius: '3px 0 0 3px',
        }} />
        <div style={{
          flex: 1,
          background: 'linear-gradient(90deg, #1e3a5f, #94a3b8)',
          borderRadius: '0 3px 3px 0',
        }} />
      </div>
    </div>
  )
}

export function MatchStatsModal({ fixtureId, matchInfo, onClose }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!fixtureId) return
    setLoading(true)
    fetch(`${API_BASE_URL}/api/fixtures/${fixtureId}/stats`)
      .then(r => r.json())
      .then(json => {
        if (!json.ok) throw new Error(json.message)
        setData(json.data)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [fixtureId])

  const resultColor = matchInfo.result === 'Win' ? '#4ade80'
    : matchInfo.result === 'Loss' ? '#f87171' : '#facc15'

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg, #0d1117 0%, #0a0f1a 100%)',
          border: '1px solid rgba(165,0,68,0.25)',
          borderRadius: '20px',
          padding: '2rem 2.5rem',
          width: '100%',
          maxWidth: 'min(760px, 70vw)',
          maxHeight: '88vh',
          overflowY: 'auto',
          fontFamily: "'Orbitron', sans-serif",
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(237,187,0,0.06)',
        }}
      >
        {/* ── Top bar: competition + close ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '1.75rem',
        }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {matchInfo.competition}{matchInfo.round ? ` · ${matchInfo.round}` : ''}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#555', marginTop: '0.2rem' }}>
              {new Date(matchInfo.date).toLocaleDateString('en-GB', {
                weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
              })}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: '1px solid #2a2a3a',
              color: '#666', borderRadius: '8px',
              padding: '0.4rem 0.9rem', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: '0.7rem',
              letterSpacing: '0.08em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#a50044'; e.target.style.color = '#fff' }}
            onMouseLeave={e => { e.target.style.borderColor = '#2a2a3a'; e.target.style.color = '#666' }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* ── Score hero: Logo — Score — Logo ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1.5rem',
          background: 'linear-gradient(135deg, rgba(165,0,68,0.08) 0%, rgba(0,0,0,0) 50%, rgba(0,77,152,0.08) 100%)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
        }}>
          {/* Barça side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            {data?.barca?.team?.logo
              ? <img src={data.barca.team.logo} alt="Barcelona" style={{ width: 64, height: 64, objectFit: 'contain' }} />
              : <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#a5004422' }} />
            }
            <span style={{ fontSize: '0.7rem', color: '#edbb00', letterSpacing: '0.1em' }}>BARCELONA</span>
          </div>

          {/* Score center */}
          <div style={{ textAlign: 'center', flex: 'none' }}>
            <div style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '0.08em',
              lineHeight: 1,
            }}>
              {matchInfo.goalsFor}
              <span style={{ color: '#333', margin: '0 0.3em' }}>—</span>
              {matchInfo.goalsAgainst}
            </div>
            <div style={{
              marginTop: '0.6rem',
              display: 'inline-block',
              padding: '0.2rem 0.8rem',
              borderRadius: '999px',
              background: `${resultColor}18`,
              border: `1px solid ${resultColor}44`,
              fontSize: '0.65rem',
              color: resultColor,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              {matchInfo.result} · {matchInfo.venue}
            </div>
          </div>

          {/* Opponent side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            {data?.opponent?.team?.logo
              ? <img src={data.opponent.team.logo} alt={matchInfo.opponent} style={{ width: 64, height: 64, objectFit: 'contain' }} />
              : matchInfo.opponentLogo
                ? <img src={matchInfo.opponentLogo} alt={matchInfo.opponent} style={{ width: 64, height: 64, objectFit: 'contain' }} />
                : <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#00519822' }} />
            }
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.1em', textAlign: 'center' }}>
              {matchInfo.opponent.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Stats section ── */}
        {loading && (
          <div style={{ textAlign: 'center', color: '#555', padding: '2.5rem', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            LOADING STATS...
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', color: '#f87171', padding: '1rem', fontSize: '0.8rem' }}>
            {error}
          </div>
        )}
        {data && (
          <>
            {/* Team name labels above stats */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
            }}>
              <span style={{ color: '#edbb00' }}>BARCELONA</span>
              <span style={{ color: '#94a3b8' }}>{data.opponent.team.name.toUpperCase()}</span>
            </div>

            {STAT_KEYS.map(key => (
              <StatRow
                key={key}
                label={key}
                barcaVal={data.barca.stats[key]}
                oppVal={data.opponent.stats[key]}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body
  )
}