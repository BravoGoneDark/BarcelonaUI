import { motion } from 'framer-motion'
import { listContainer, listItem, positions, POSITION_SHORT } from '../constants'
import { playerAccentClass } from '../utils/playerAccent'

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
        className="squad-grid"
        variants={listContainer}
        initial="hidden"
        animate="show"
        key={listKey}
      >
        {players.map((player) => (
          <motion.button
            key={player.PlayerID}
            type="button"
            className={`player-card ${playerAccentClass(player.Position)}`}
            variants={listItem}
            onClick={() => onSelectPlayer(player.PlayerID)}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="jersey-watermark">#{player.JerseyNumber}</span>
            <div className={`mini-badge ${playerAccentClass(player.Position)}`}>
              {player.PlayerName.split(' ')
                .map((name) => name[0])
                .join('')
                .slice(0, 2)}
            </div>
            <h3>{player.PlayerName}</h3>
            <p>
              {POSITION_SHORT[player.Position]} · {player.Nationality}
            </p>
            <small>Tap for profile</small>
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
