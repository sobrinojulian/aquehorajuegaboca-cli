import moment from 'moment';
import { table } from 'table';

const URL = 'https://boca.sobrinojulian.workers.dev/'

const HEADER_ROW = ['Fecha', 'Hora', 'Local', 'Visitante', 'Competencia']

const DATE_FORMAT = 'DD/MM';
const TIME_FORMAT = 'HH:mm';

const LEAGUE_MAPPINGS = {
  'CONMEBOL Sudamericana': 'Sudamericana',
  'Argentine Copa de la Liga Profesional': 'Copa Argentina',
  'Liga Profesional de Argentina': 'Liga Profesional',
};

async function fetchData() {
  const response = await fetch(URL);
  const matches = await response.json();

  const formattedMatches = matches.map(match => formatMatch(match));
  const tableData = [HEADER_ROW, ...formattedMatches];
  console.log(table(tableData));
}

function formatMatch(match) {
  const { date, league, teams } = match;

  const formattedDate = moment(date).format(DATE_FORMAT);
  const formattedTime = moment(date).format(TIME_FORMAT);

  const home = teams.find(team => team.isHome).shortDisplayName;
  const away = teams.find(team => !team.isHome).shortDisplayName;

  const formattedLeague = LEAGUE_MAPPINGS[league] || league;

  return [formattedDate, formattedTime, home, away, formattedLeague];
}

fetchData();
