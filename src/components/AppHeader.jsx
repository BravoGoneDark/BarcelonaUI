import { motion } from 'framer-motion'
import { ClubCrest } from './ClubCrest'
import { tabs } from '../constants'

export function AppHeader({ activeTab, onTabChange }) {
  return (
    <header className="header">
      <motion.div
        className="brand"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="brand-crest-wrap">
          <ClubCrest />
        </div>
        <div className="brand-text">
          <p className="brand-title">FC Barcelona</p>
        </div>
      </motion.div>
      <nav className="tabs">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            type="button"
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            {tab.label}
            {tab.id === activeTab && (
              <motion.span
                className="tab-glow"
                layoutId="tabGlow"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
          </motion.button>
        ))}
      </nav>
    </header>
  )
}
