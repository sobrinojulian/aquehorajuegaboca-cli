import { table } from 'table'

const URL = 'https://boca.sobrinojulian.workers.dev/'

const HEADER_ROW = ['Fecha', 'Hora', 'Local', 'Visitante', 'Competencia']

const LEAGUE_MAPPINGS = {
  'CONMEBOL Sudamericana': 'Sudamericana',
  'Argentine Copa de la Liga Profesional': 'Copa Argentina',
  'Liga Profesional de Argentina': 'Liga Profesional'
}

function formatDate(date) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}`
}

function formatTime(date) {
  const d = new Date(date)
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  return `${hour}:${minute}`
}

function formatMatch(match) {
  const { date, league, teams } = match

  const formattedDate = formatDate(date)
  const formattedTime = formatTime(date)

  const home = teams.find(team => team.isHome).shortDisplayName
  const away = teams.find(team => !team.isHome).shortDisplayName

  const formattedLeague = LEAGUE_MAPPINGS[league] || league

  return [formattedDate, formattedTime, home, away, formattedLeague]
}

async function fetchData() {
  const response = await fetch(URL)
  const matches = await response.json()

  const formattedMatches = matches.map(match => formatMatch(match))
  const tableData = [HEADER_ROW, ...formattedMatches]
  console.log(table(tableData))
}

fetchData()
