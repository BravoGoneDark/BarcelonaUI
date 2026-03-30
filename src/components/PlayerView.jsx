import { motion } from 'framer-motion'
import { listContainer, listItem } from '../constants'
import { playerAccentClass } from '../utils/playerAccent'

export function PlayerView({ playerDetail }) {
  return (
    <>
      <div className="player-hero">
        <motion.div
          className={`player-avatar ${playerAccentClass(playerDetail.Position)}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {playerDetail.PlayerName.split(' ')
            .map((name) => name[0])
            .join('')
            .slice(0, 2)}
        </motion.div>
        <div>
          <h2 className="player-name">{playerDetail.PlayerName}</h2>
          <p className="subtle player-meta">
            #{playerDetail.JerseyNumber} · {playerDetail.Position} · {playerDetail.Nationality}
          </p>
          <span className="pill pill-active">Active</span>
        </div>
      </div>
      <motion.div className="stats-grid" variants={listContainer} initial="hidden" animate="show">
        <motion.div className="card card-stat" variants={listItem} whileHover={{ y: -3 }}>
          <span className="stat-num">{playerDetail.Goals}</span>
          <small>Goals</small>
        </motion.div>
        <motion.div className="card card-stat" variants={listItem} whileHover={{ y: -3 }}>
          <span className="stat-num">{playerDetail.Assists}</span>
          <small>Assists</small>
        </motion.div>
        <motion.div className="card card-stat" variants={listItem} whileHover={{ y: -3 }}>
          <span className="stat-num">{playerDetail.AvgRating}</span>
          <small>Avg rating</small>
        </motion.div>
        <motion.div className="card card-stat" variants={listItem} whileHover={{ y: -3 }}>
          <span className="stat-num">{playerDetail.Skill}</span>
          <small>Skill</small>
        </motion.div>
      </motion.div>
      <div className="detail glass-panel">
        <p>
          <strong>Age</strong>
          <span>{playerDetail.Age}</span>
        </p>
        <p>
          <strong>Position</strong>
          <span>{playerDetail.Position}</span>
        </p>
        <p>
          <strong>Nationality</strong>
          <span>{playerDetail.Nationality}</span>
        </p>
      </div>
    </>
  )
}
