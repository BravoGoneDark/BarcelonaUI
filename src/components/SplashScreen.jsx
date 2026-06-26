import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('counter')
  const [count, setCount] = useState(1850)

  // Phase 1: count from 1850 → 1899 quickly
  useEffect(() => {
    if (phase !== 'counter') return
    if (count < 1899) {
      const t = setTimeout(() => setCount(c => Math.min(c + 2, 1899)), 50)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setPhase('motto'), 700)
      return () => clearTimeout(t)
    }
  }, [phase, count])

  // Phase 2 → 3 → done
  useEffect(() => {
    if (phase === 'motto') {
      const t = setTimeout(() => setPhase('crest'), 1200)
      return () => clearTimeout(t)
    }
    if (phase === 'crest') {
      const t = setTimeout(() => onComplete(), 1400)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', overflow: 'hidden',
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        {/* ── Vortex Background ── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          {/* Clockwise ring */}
          <div style={{
            position: 'absolute',
            inset: '-20%',
            background: `conic-gradient(
              from 0deg,
              #a50044 0deg, #004d98 90deg,
              #a50044 180deg, #004d98 270deg,
              #a50044 360deg
            )`,
            borderRadius: '50%',
            filter: 'blur(60px)',
            opacity: 0.55,
            animation: 'vortexCW 4s linear infinite',
          }} />

          {/* Counter-clockwise ring */}
          <div style={{
            position: 'absolute',
            inset: '-10%',
            background: `conic-gradient(
              from 180deg,
              #004d98 0deg, #a50044 90deg,
              #004d98 180deg, #a50044 270deg,
              #004d98 360deg
            )`,
            borderRadius: '50%',
            filter: 'blur(45px)',
            opacity: 0.45,
            animation: 'vortexCCW 2.5s linear infinite',
          }} />

          {/* Dark radial core */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(
              ellipse 55% 55% at 50% 50%,
              #06080e 0%,
              #06080ecc 40%,
              transparent 100%
            )`,
          }} />

          {/* Gold pulsing ring — only during counter phase */}
            {phase === 'counter' && (
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '420px', height: '420px',
                borderRadius: '50%',
                border: '2px solid #edbb00',
                opacity: 0.35,
                animation: 'goldPulse 2s ease-in-out infinite',
                pointerEvents: 'none',
              }} />
            )}
        </div>

        <style>{`
          @keyframes vortexCW {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes vortexCCW {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes goldPulse {
            0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
            50%       { opacity: 0.5; transform: translate(-50%, -50%) scale(1.06); }
          }
        `}</style>

        {/* Center content */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1rem',
        }}>
          {/* Phase 1: Counter */}
          {phase === 'counter' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 'clamp(5rem, 15vw, 9rem)',
                fontWeight: 900,
                letterSpacing: '0.05em',
                color: '#edbb00',
                lineHeight: 1,
                textShadow: '0 0 60px rgba(237,187,0,0.4)',
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              {Math.min(count, 1899)}
            </motion.div>
          )}

          {/* Phase 2: Motto */}
          {phase === 'motto' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}
            >
              {'MÉS QUE UN CLUB'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2, ease: 'easeOut' }}
                  style={{
                    display: 'inline-block',
                    fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#edbb00',
                    textShadow: '0 0 30px rgba(237,187,0,0.5)',
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Phase 3: Crest */}
          {phase === 'crest' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <img
                src="/crest.svg"
                alt="FC Barcelona"
                style={{
                  width: 'clamp(80px, 15vw, 130px)',
                  filter: 'drop-shadow(0 0 24px rgba(237,187,0,0.6))',
                }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                style={{
                  height: '2px', width: '180px',
                  background: 'linear-gradient(90deg, #a50044, #edbb00, #004d98)',
                }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}