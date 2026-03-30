import { motion } from 'framer-motion'
import { pageTransition } from '../constants'

export function TabPanel({ className, children }) {
  return (
    <motion.section className={className} {...pageTransition}>
      {children}
    </motion.section>
  )
}
