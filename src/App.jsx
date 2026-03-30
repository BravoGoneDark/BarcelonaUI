import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AdminView } from './components/AdminView'
import { AppBackground } from './components/AppBackground'
import { AppHeader } from './components/AppHeader'
import { HomeView } from './components/HomeView'
import { PlayerView } from './components/PlayerView'
import { SquadView } from './components/SquadView'
import { StatsView } from './components/StatsView'
import { TabPanel } from './components/TabPanel'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [homeData, setHomeData] = useState(null)
  const [players, setPlayers] = useState([])
  const [playerDetail, setPlayerDetail] = useState(null)
  const [statsData, setStatsData] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [position, setPosition] = useState('All')
  const [selectedPlayerId, setSelectedPlayerId] = useState(1)
  const [queryLog, setQueryLog] = useState([])
  const [adminMessage, setAdminMessage] = useState('')
  const [adminForm, setAdminForm] = useState({
    playerName: '',
    skill: '',
    tableName: 'PLAYER',
  })

  const patchAdminForm = (patch) => {
    setAdminForm((prev) => ({ ...prev, ...patch }))
  }

  const fetchJson = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, options)
    const json = await response.json()
    if (!response.ok || !json.ok) {
      throw new Error(json.message || 'Request failed')
    }
    return json.data || json
  }

  const fetchHome = async () => setHomeData(await fetchJson('/api/home-summary'))

  const fetchPlayers = async () => {
    const query = new URLSearchParams({
      search,
      position,
    })
    const data = await fetchJson(`/api/players?${query.toString()}`)
    setPlayers(data)
  }

  const fetchPlayerDetail = async (id) => setPlayerDetail(await fetchJson(`/api/players/${id}`))

  const fetchStats = async () => setStatsData(await fetchJson('/api/stats/dashboard'))

  const refreshAll = async () => {
    setIsLoading(true)
    setError('')
    try {
      await Promise.all([fetchHome(), fetchPlayers(), fetchPlayerDetail(selectedPlayerId), fetchStats()])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchPlayers().catch((requestError) => setError(requestError.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, position])

  useEffect(() => {
    fetchPlayerDetail(selectedPlayerId).catch((requestError) => setError(requestError.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayerId])

  const submitSkillUpdate = async () => {
    setAdminMessage('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/update-player-skill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: adminForm.playerName,
          skill: Number(adminForm.skill),
        }),
      })
      const json = await response.json()
      setQueryLog(json.queryLog || [])
      if (!response.ok || !json.ok) {
        throw new Error(json.message || 'Update failed')
      }
      setAdminMessage(json.message)
      await Promise.all([fetchPlayers(), fetchPlayerDetail(selectedPlayerId), fetchStats()])
    } catch (requestError) {
      setAdminMessage(requestError.message)
    }
  }

  const runTableLockAction = async (action) => {
    setAdminMessage('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/lock-table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableName: adminForm.tableName,
          action,
        }),
      })
      const json = await response.json()
      if (!response.ok || !json.ok) {
        throw new Error(json.message || 'Action failed')
      }
      setAdminMessage(json.message)
      setQueryLog((prev) => [`[OK] ${json.message}`, ...prev].slice(0, 6))
    } catch (requestError) {
      setAdminMessage(requestError.message)
    }
  }

  return (
    <main className="app-shell">
      <AppBackground />

      <section className="panel">
        <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {error && (
          <motion.p className="status error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error}
          </motion.p>
        )}
        {isLoading && (
          <motion.p className="status loading-strip" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="loading-dots">Loading from database</span>
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {activeTab === 'home' && homeData && (
            <TabPanel key="home" className="content home-content">
              <HomeView homeData={homeData} onNavigate={setActiveTab} />
            </TabPanel>
          )}

          {activeTab === 'squad' && (
            <TabPanel key="squad" className="content">
              <SquadView
                search={search}
                onSearchChange={setSearch}
                position={position}
                onPositionChange={setPosition}
                players={players}
                listKey={`${search}-${position}`}
                onSelectPlayer={(id) => {
                  setSelectedPlayerId(id)
                  setActiveTab('player')
                }}
              />
            </TabPanel>
          )}

          {activeTab === 'player' && playerDetail && (
            <TabPanel key="player" className="content player-page">
              <PlayerView playerDetail={playerDetail} />
            </TabPanel>
          )}

          {activeTab === 'stats' && statsData && (
            <TabPanel key="stats" className="content">
              <StatsView statsData={statsData} />
            </TabPanel>
          )}

          {activeTab === 'admin' && (
            <TabPanel key="admin" className="content admin-content">
              <AdminView
                adminForm={adminForm}
                onAdminFormChange={patchAdminForm}
                adminMessage={adminMessage}
                queryLog={queryLog}
                onSubmitSkill={submitSkillUpdate}
                onLockAction={runTableLockAction}
              />
            </TabPanel>
          )}
        </AnimatePresence>
      </section>
    </main>
  )
}

export default App
