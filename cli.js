#!/usr/bin/env node

import fetch from 'node-fetch'
import cheerio from 'cheerio'

const getPartidosDivs = $ => {
  $('#bannercontainer').remove()
  $('#enlace_proximos').remove()
  return $('#maincontainer').children()
}

const parse = ($, partido) => {
  const equipos = $('.equipo_proximo', partido)
  const info = $('.info_proximo', partido)

  const local = $(equipos[0]).text().trim()
  const visitante = $(equipos[1]).text().trim()
  const descripcion = $('.descripcion_proximo', info).text().trim()
  const fecha = $('.fecha_proximo', info).text().trim()
  const hora = $('.hora_proximo', info).text().trim()

  const ddmm = fecha.split('/').slice(0, 2).join('/')
  return [
    `${ddmm} (${hora}) | ${descripcion}`,
    `${local} vs ${visitante}\n`].join('\n')
}

const main = async () => {
  const response = await fetch('http://www.aquehorajuegaboca.com.ar/proximos')
  const html = await response.text()
  const $ = cheerio.load(html)
  const divs = getPartidosDivs($)
  for (const partido of divs) {
    console.log(parse($, partido))
  }
}

main()
