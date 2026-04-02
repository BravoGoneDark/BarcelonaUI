import { motion } from 'framer-motion'
import { useState } from 'react'
import { listContainer, listItem, positions, POSITION_SHORT } from '../constants'
import { playerAccentClass } from '../utils/playerAccent'

const POSITION_COLORS = {
  Goalkeeper: '#f59e0b',
  Defender:   '#3b82f6',
  Midfielder: '#ec4899',
  Forward:    '#a78bfa',
}

function PlayerCard({ player, onSelectPlayer }) {
  const [imgError, setImgError] = useState(false)
  const accentColor = POSITION_COLORS[player.Position] || '#3b82f6'
  const hasImage = player.ImageURL && !imgError

  return (
    <motion.button
      type="button"
      className={`player-card-v2 ${playerAccentClass(player.Position)}`}
      variants={listItem}
      onClick={() => onSelectPlayer(player.PlayerID)}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ '--accent': accentColor }}
    >
      {/* ── Image or fallback ── */}
      <div className="card-media">
        {hasImage ? (
          <img
            src={player.ImageURL}
            alt={player.PlayerName}
            className="card-player-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card-initials-fallback" />
        )}
        <div className="card-gradient-overlay" />
      </div>

      {/* ── Top left — crest + name ── */}
      <div className="card-top-left">
        <img src="/crest.svg" alt="FCB" className="card-crest" />
        <span className="card-top-name">{player.PlayerName}</span>
      </div>

      {/* ── Top right — jersey number watermark ── */}
      <div className="card-jersey-watermark">
        #{player.JerseyNumber}
      </div>

      {/* ── Bottom left — name, nationality, position ── */}
      <div className="card-info">
        <p className="card-nationality">{player.Nationality}</p>
        <h3 className="card-name">{player.PlayerName}</h3>
        <p className="card-position-label">
          <span className="card-position-pill">{POSITION_SHORT[player.Position]}</span>
          {player.Position}
        </p>
      </div>
    </motion.button>
  )
}

export function SquadView({
  search,
  onSearchChange,
  position,
  onPositionChange,
  players,
  onSelectPlayer,
  listKey,
}) {
  return (
    <>
      <h2 className="section-title">First team squad</h2>
      <div className="controls">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search player..."
        />
        <select value={position} onChange={(event) => onPositionChange(event.target.value)}>
          {positions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        className="squad-grid-v2"
        variants={listContainer}
        initial="hidden"
        animate="show"
        key={listKey}
      >
        {players.map((player) => (
          <PlayerCard
            key={player.PlayerID}
            player={player}
            onSelectPlayer={onSelectPlayer}
          />
        ))}
      </motion.div>
    </>
  )
}