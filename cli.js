#!/usr/bin/env node

import fetch from 'node-fetch'
import cheerio from 'cheerio'

const getPartidosDivs = $ => {
  $('#bannercontainer').remove()
  $('#enlace_proximos').remove()
  return $('#maincontainer').children()
}
const parsePartido = ($, partido) => {
  const equipos = $('.equipo_proximo', partido)
  const info = $('.info_proximo', partido)
  return {
    local: $(equipos[0]).text().trim(),
    visitante: $(equipos[1]).text().trim(),
    descripcion: $('.descripcion_proximo', info).text().trim(),
    fecha: $('.fecha_proximo', info).text().trim(),
    hora: $('.hora_proximo', info).text().trim()
  }
}

const toString = partido => {
  return [
    partido.descripcion,
   `${partido.local} vs ${partido.visitante}`,
   `Fecha: ${partido.fecha}`,
   `Horario: ${partido.hora}`,
   '--------------------------------'].join('\n')
}

const main = async () => {
  const response = await fetch('http://www.aquehorajuegaboca.com.ar/proximos')
  const html = await response.text()
  const $ = cheerio.load(html)
  const divs = getPartidosDivs($)
  for (const p of divs) {
    console.log(toString(parsePartido($, p)))
  }
}

main()
