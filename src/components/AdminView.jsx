import { motion } from 'framer-motion'

export function AdminView({
  adminForm,
  onAdminFormChange,
  adminMessage,
  queryLog,
  onSubmitSkill,
  onLockAction,
}) {
  return (
    <>
      <h2 className="section-title">Admin · SQL tools</h2>
      <p className="subtle admin-lede">
        Transactional updates and table locks — demonstrated against your live database.
      </p>
      <div className="admin-card glass-panel">
        <h3>Update skill (transaction)</h3>
        <div className="admin-row">
          <input
            value={adminForm.playerName}
            onChange={(event) => onAdminFormChange({ playerName: event.target.value })}
            placeholder="Player name"
          />
          <input
            value={adminForm.skill}
            onChange={(event) => onAdminFormChange({ skill: event.target.value })}
            placeholder="New skill (0–100)"
            type="number"
          />
          <motion.button
            type="button"
            className="btn btn-primary"
            onClick={onSubmitSkill}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Commit
          </motion.button>
        </div>
      </div>
      <div className="admin-card glass-panel">
        <h3>Lock / unlock table</h3>
        <div className="admin-row">
          <select
            value={adminForm.tableName}
            onChange={(event) => onAdminFormChange({ tableName: event.target.value })}
          >
            <option value="PLAYER">PLAYER</option>
            <option value="MATCHES">MATCHES</option>
            <option value="COMPETITION">COMPETITION</option>
            <option value="STATS">STATS</option>
          </select>
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={() => onLockAction('lock')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Lock
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-ghost"
            onClick={() => onLockAction('unlock')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Unlock
          </motion.button>
        </div>
      </div>

      {adminMessage && <p className="status status-soft">{adminMessage}</p>}
      <div className="log">
        {queryLog.length === 0 ? (
          <p className="log-empty">No admin query logs yet.</p>
        ) : (
          queryLog.map((row, index) => <p key={`${index}-${row}`}>{row}</p>)
        )}
      </div>
    </>
  )
}
