#!/usr/bin/env node

import fetch from 'node-fetch';
import cheerio from 'cheerio';

const getPartidos = $ => {
  $("#bannercontainer").remove();
  $("#enlace_proximos").remove();
  return $("#maincontainer").children();
};
const parsePartido = ($, partido) => {
  const equipos = $(".equipo_proximo", partido);
  const info = $(".info_proximo", partido);
  return {
    local: $(equipos[0])
      .text()
      .trim(),
    visitante: $(equipos[1])
      .text()
      .trim(),
    descripcion: $(".descripcion_proximo", info)
      .text()
      .trim(),
    fecha: $(".fecha_proximo", info)
      .text()
      .trim(),
    hora: $(".hora_proximo", info)
      .text()
      .trim()
  };
};
const printPartido = partido => {
  console.log(partido.descripcion);
  console.log(`${partido.local} vs ${partido.visitante}`);
  console.log(`Fecha: ${partido.fecha}`);
  console.log(`Horario: ${partido.hora}`);
  const faltan = 22; // Dummy
  console.log(`Faltan: ${faltan} Dias`);
  console.log("--------------------------------");
};
const printPartidos = ($, partidos) => {
  for (let i = 0; i < partidos.length; i++) {
    const partido = parsePartido($, partidos[i]);
    printPartido(partido);
  }
};

const main = async () => {
  const response = await fetch('http://www.aquehorajuegaboca.com.ar/proximos');
  const html = await response.text();
  const $ = cheerio.load(html);
  const partidos = getPartidos($);
  printPartidos($, partidos);
};

main();