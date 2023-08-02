#!/usr/bin/env node

import { load } from 'cheerio'

const main = async () => {
  const url = 'https://aquehorajuega.co/equipos/a-que-hora-juega-boca-juniors/'
  const response = await fetch(url)
  const html = await response.text()
  const $ = load(html)
  const divs = getEventsDivs($)
  for (const event of divs) {
    const data = parse($, event)
    const formattedEvent = format(data)
    console.log(formattedEvent)
  }
}

const getEventsDivs = ($) => {
  return $('[itemprop="startDate"]')
    .map((_, el) => $(el).parent().parent())
    .get()
}

const parse = ($, event) => {
  const date = $('[itemprop="startDate"]', event).text().split('\n')[1].trim().split('  ').join(' ')
  const city = $('[itemprop="address"]', event).text().trim()
  const stadium = $('[itemprop="name"]', event).text().trim().split('\n')[0]
  const match = $('.row[itemprop="name"]', event).attr('content').replace('Vs.', 'vs')
  const tournament = $('span[itemprop="description"]', event).text().trim().replace('Torneo: ', '')

  return {
    date,
    city,
    stadium,
    match,
    tournament,
  }
}

const format = (data) => {
  const { date, city, stadium, match, tournament } = data

  // prettier-ignore
  return [
    `🗓️  ${date}`,
    `⚽️ ${match}`,
    `🏟️  ${stadium} (${city})`,
    `🏆 ${tournament}`,
    '',
  ].join('\n');
}

main()
