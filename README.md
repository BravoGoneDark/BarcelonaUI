# Barcelona UI + SQL Integration

Minimal, polished UI integrated with Node.js + Express + MySQL.

## 1) Database setup

1. Create a MySQL database:
   - `CREATE DATABASE barcadatabase;`
2. Import `BarcaDatabase.sql` into that database.

## 2) Environment setup

1. Copy `.env.example` to `.env`
2. Fill DB values:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

## 3) Run app

Use two terminals:

1. Start backend API:
   - `npm run server`
2. Start frontend:
   - `npm run dev`

Frontend runs on Vite and calls Express API on `http://localhost:4000` by default.

## Implemented pages

- Home: total players/positions/nationalities + recent matches
- Squad: player list with search and position filters
- Player: detailed profile + stats card
- Stats: top scorers, squad by position, average skill by position
- Admin: transaction demo (update player skill), table lock/unlock, schema checks

## Schema notes

Your SQL runs clean for MySQL.  
Current schema does **not** include `PLAYER.Club` and `PLAYER.Wage`, so transfer/new-club and wage-specific admin features are shown as schema gaps instead of fake behavior.
