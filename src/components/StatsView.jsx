import { motion } from 'framer-motion'
import { listContainer, listItem, POSITION_SHORT } from '../constants'

export function StatsView({ statsData }) {
  return (
    <>
      <h2 className="section-title">Top scorers</h2>
      {statsData.topScorers.map((row, index) => (
        <motion.div
          key={row.PlayerName}
          className="bar-row"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06 }}
        >
          <span>{row.PlayerName}</span>
          <div className="bar">
            <motion.div
              className="bar-fill bar-fill-garnet"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (row.Goals / statsData.topScorers[0].Goals) * 100)}%`,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <strong>{row.Goals}</strong>
        </motion.div>
      ))}

      <h2 className="section-title">Squad by position</h2>
      <motion.div className="stats-grid" variants={listContainer} initial="hidden" animate="show">
        {statsData.squadByPosition.map((row) => (
          <motion.div
            key={row.Position}
            className="card card-stat"
            variants={listItem}
            whileHover={{ y: -4 }}
          >
            <span className="stat-num">{row.total}</span>
            <small>{POSITION_SHORT[row.Position] || row.Position}</small>
          </motion.div>
        ))}
      </motion.div>

      <h2 className="section-title">Average skill by position</h2>
      {statsData.avgSkillByPosition.map((row, index) => (
        <motion.div
          key={row.Position}
          className="bar-row blue"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06 }}
        >
          <span>{POSITION_SHORT[row.Position] || row.Position}</span>
          <div className="bar">
            <motion.div
              className="bar-fill bar-fill-blue"
              initial={{ width: 0 }}
              animate={{ width: `${row.avgSkill}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <strong>{row.avgSkill}</strong>
        </motion.div>
      ))}
    </>
  )
}
