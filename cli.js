import { load } from 'cheerio';
import moment from 'moment';
import { table } from 'table';

async function fetchData() {
  try {
    const response = await fetch('https://www.espn.com.ar/futbol/equipo/calendario?id=5');
    const html = await response.text();
    const $ = load(html);

    // Extract the script content
    const scriptContent = $('script')
      .filter(function () {
        return $(this).html().includes('__espnfitt__');
      })
      .html();

    // Extract the page object from the script content
    const pageObject = JSON.parse(scriptContent.match(/window\['__espnfitt__'\]\s*=\s*({.*?});/)[1]);

    // Extract the desired data from the page object
    const desiredData = pageObject.page.content.fixtures.events;

    // Mapping of original league names to simplified names
    const filter = {
      'CONMEBOL Sudamericana': 'Sudamericana',
      'Argentine Copa de la Liga Profesional': 'Copa Argentina',
      'Liga Profesional de Argentina': 'Liga Profesional',
    };

    let data = [];
    // breaks table
    // data.push(['🏆 Liga', '🗓️ Fecha', '⌚ Hora', '⚽ Partido', '🏟️ Locacion']);
    data.push(['Liga', 'Fecha', 'Hora', 'Partido', 'Locacion']);
    desiredData.forEach((match) => {
      const date = moment(match.date).format('DD/MM');
      const time = moment(match.date).format('HH:mm');

      let home;
      let away;
      match.teams.forEach((team) => {
        if (team.isHome) {
          home = team.shortDisplayName;
        } else {
          away = team.shortDisplayName;
        }
      });
      const league = filter[match.league] || match.league;
      const _match = `${home} vs ${away}`;

      // Extract text between parentheses
      let location = match.venue.fullName.match(/\((.*?)\)/);
      if (location && location[1]) {
        location = location[1];
      } else {
        location = match.venue.fullName.slice(0,20);
      }

      data.push([league, date, time, _match, location]);
    });
    console.log(table(data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
