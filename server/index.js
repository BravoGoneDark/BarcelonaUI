import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mysql from 'mysql2/promise'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 4000)

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'barcadatabase',
  waitForConnections: true,
  connectionLimit: 10,
})

const sendError = (res, error, message = 'Database operation failed') => {
  res.status(500).json({
    ok: false,
    message,
    error: error.message,
  })
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, message: 'API and database are connected' })
  } catch (error) {
    sendError(res, error, 'Database connection failed')
  }
})

app.get('/api/home-summary', async (_req, res) => {
  try {
    const [[playersCount]] = await pool.query('SELECT COUNT(*) AS totalPlayers FROM PLAYER')
    const [[positionsCount]] = await pool.query(
      'SELECT COUNT(DISTINCT Position) AS totalPositions FROM PLAYER',
    )
    const [[nationalitiesCount]] = await pool.query(
      'SELECT COUNT(DISTINCT Nationality) AS totalNationalities FROM PLAYER',
    )

    res.json({
      ok: true,
      data: {
        totalPlayers: playersCount.totalPlayers,
        totalPositions: positionsCount.totalPositions,
        totalNationalities: nationalitiesCount.totalNationalities,
      },
    })
  } catch (error) {
    sendError(res, error)
  }
})

app.get('/api/players', async (req, res) => {
  const search = req.query.search?.trim() || ''
  const position = req.query.position?.trim() || 'All'

  try {
    let sql = `
      SELECT p.PlayerID, p.PlayerName, p.Position, p.Nationality, p.JerseyNumber, p.Skill,
             p.ImageURL,
             s.Goals, s.Assists, s.AvgRating
      FROM PLAYER p
      LEFT JOIN STATS s ON p.StatsID = s.StatsID
      WHERE 1=1
    `
    const params = []

    if (position !== 'All') {
      sql += ' AND p.Position = ?'
      params.push(position)
    }

    if (search) {
      sql += ' AND p.PlayerName LIKE ?'
      params.push(`%${search}%`)
    }

    sql += ' ORDER BY p.PlayerName ASC'

    const [players] = await pool.query(sql, params)
    res.json({ ok: true, data: players })
  } catch (error) {
    sendError(res, error)
  }
})

app.get('/api/players/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.PlayerID, p.PlayerName, p.Age, p.Skill, p.Position, p.Nationality, p.JerseyNumber,
              p.ImageURL,
              s.Goals, s.Assists, s.AvgRating
       FROM PLAYER p
       LEFT JOIN STATS s ON p.StatsID = s.StatsID
       WHERE p.PlayerID = ?`,
      [req.params.id],
    )

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, message: 'Player not found' })
    }

    return res.json({ ok: true, data: rows[0] })
  } catch (error) {
    return sendError(res, error)
  }
})

app.get('/api/stats/dashboard', async (_req, res) => {
  try {
    const [topScorers] = await pool.query(
      `SELECT p.PlayerName, s.Goals
       FROM PLAYER p
       JOIN STATS s ON p.StatsID = s.StatsID
       ORDER BY s.Goals DESC, p.PlayerName ASC
       LIMIT 5`,
    )

    const [squadByPosition] = await pool.query(
      `SELECT Position, COUNT(*) AS total
       FROM PLAYER
       GROUP BY Position
       ORDER BY total DESC`,
    )

    const [avgSkillByPosition] = await pool.query(
      `SELECT Position, ROUND(AVG(Skill), 1) AS avgSkill
       FROM PLAYER
       GROUP BY Position
       ORDER BY avgSkill DESC`,
    )

    res.json({
      ok: true,
      data: {
        topScorers,
        squadByPosition,
        avgSkillByPosition,
      },
    })
  } catch (error) {
    sendError(res, error)
  }
})

app.get('/api/admin/schema-check', async (_req, res) => {
  try {
    const requiredTables = ['PLAYER', 'MATCHES', 'COMPETITION', 'STATS']
    const availableTables = []

    for (const tableName of requiredTables) {
      const [rows] = await pool.query(
        `SELECT COUNT(*) AS total
         FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?`,
        [tableName],
      )
      if (rows[0].total > 0) {
        availableTables.push(tableName)
      }
    }

    const [triggerRows] = await pool.query(
      `SELECT TRIGGER_NAME
       FROM information_schema.TRIGGERS
       WHERE TRIGGER_SCHEMA = DATABASE()`,
    )

    res.json({
      ok: true,
      data: {
        availableTables,
        triggers: triggerRows.map((row) => row.TRIGGER_NAME),
      },
    })
  } catch (error) {
    sendError(res, error)
  }
})

app.post('/api/admin/update-player-skill', async (req, res) => {
  const { playerName, skill } = req.body

  if (!playerName || !Number.isFinite(Number(skill))) {
    return res.status(400).json({
      ok: false,
      message: 'playerName and numeric skill are required',
    })
  }

  const connection = await pool.getConnection()
  const queryLog = []

  try {
    await connection.beginTransaction()
    queryLog.push('[OK] BEGIN')

    const [result] = await connection.query(
      'UPDATE PLAYER SET Skill = ? WHERE PlayerName = ?',
      [Number(skill), playerName],
    )
    queryLog.push(`[OK] UPDATE PLAYER Skill=${Number(skill)} WHERE PlayerName="${playerName}"`)

    if (result.affectedRows === 0) {
      throw new Error('Player not found')
    }

    await connection.commit()
    queryLog.push('[OK] COMMIT')

    return res.json({
      ok: true,
      message: 'Player skill updated successfully',
      queryLog,
    })
  } catch (error) {
    await connection.rollback()
    queryLog.push('[OK] ROLLBACK')
    return res.status(400).json({
      ok: false,
      message: error.message,
      queryLog,
    })
  } finally {
    connection.release()
  }
})

app.post('/api/admin/lock-table', async (req, res) => {
  const { tableName, action } = req.body
  const allowedTables = ['PLAYER', 'MATCHES', 'COMPETITION', 'STATS']

  if (!allowedTables.includes(tableName)) {
    return res.status(400).json({ ok: false, message: 'Invalid table name' })
  }

  if (!['lock', 'unlock'].includes(action)) {
    return res.status(400).json({ ok: false, message: 'Action must be lock or unlock' })
  }

  try {
    if (action === 'lock') {
      await pool.query(`LOCK TABLES ${tableName} WRITE`)
      return res.json({ ok: true, message: `Table ${tableName} locked for write operations` })
    }

    await pool.query('UNLOCK TABLES')
    return res.json({ ok: true, message: 'Tables unlocked' })
  } catch (error) {
    return sendError(res, error)
  }
})

// Get all matches for the Calendar View
app.get('/api/matches/all', async (_req, res) => {
  try {
    const [matches] = await pool.query(`
      SELECT 
        m.MatchID, 
        m.MatchDate, 
        m.Opponent, 
        m.GoalsFor, 
        m.GoalsAgainst, 
        m.Result, 
        m.Venue,
        c.CompName AS competitionName
      FROM MATCHES m
      LEFT JOIN COMPETITION c ON m.CompetitionID = c.CompetitionID
      ORDER BY m.MatchDate ASC
    `)

    res.json({
      ok: true,
      data: matches,
    })
  } catch (error) {
    sendError(res, error, 'Could not fetch matches for calendar')
  }
})

// Fetch recent Barcelona La Liga fixtures from API-Football
app.get('/api/fixtures/recent', async (_req, res) => {
  try {
    const response = await fetch(
      'https://v3.football.api-sports.io/fixtures?team=529&season=2024&league=140',
      {
        headers: {
          'x-apisports-key': process.env.FOOTBALL_API_KEY,
        },
      }
    )
    const json = await response.json()

    // Sort by date desc, take last 8 finished matches
    const finished = json.response
      .filter(f => f.fixture.status.short === 'FT')
      .sort((a, b) => b.fixture.timestamp - a.fixture.timestamp)
      .slice(0, 8)
      .map(f => {
        const isHome = f.teams.home.id === 529
        const opponent = isHome ? f.teams.away : f.teams.home
        const goalsFor = isHome ? f.goals.home : f.goals.away
        const goalsAgainst = isHome ? f.goals.away : f.goals.home

        return {
          fixtureId: f.fixture.id,
          date: f.fixture.date,
          opponent: opponent.name,
          opponentLogo: opponent.logo,
          goalsFor,
          goalsAgainst,
          result: goalsFor > goalsAgainst ? 'Win' : goalsFor < goalsAgainst ? 'Loss' : 'Draw',
          venue: isHome ? 'Home' : 'Away',
          competition: f.league.name,
          round: f.league.round,
        }
      })

    res.json({ ok: true, data: finished })
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

// Fetch stats for a specific fixture
app.get('/api/fixtures/:id/stats', async (req, res) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures/statistics?fixture=${req.params.id}`,
      {
        headers: {
          'x-apisports-key': process.env.FOOTBALL_API_KEY,
        },
      }
    )
    const json = await response.json()

    // Find Barca (id 529) and opponent separately
    const barca = json.response.find(t => t.team.id === 529)
    const opponent = json.response.find(t => t.team.id !== 529)

    const parseStats = (statsArray) => {
      const obj = {}
      statsArray?.forEach(s => { obj[s.type] = s.value ?? 0 })
      return obj
    }

    res.json({
      ok: true,
      data: {
        barca: {
          team: barca?.team,
          stats: parseStats(barca?.statistics),
        },
        opponent: {
          team: opponent?.team,
          stats: parseStats(opponent?.statistics),
        },
      },
    })
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})