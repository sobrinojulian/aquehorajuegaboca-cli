#!/usr/bin/env node

const http = require("http");
const cheerio = require("cheerio");

const main = () => {
    const url = "http://www.aquehorajuegaboca.com.ar/";
    http.get(url, res => {
        let data = "";
        res.on("data", chunk => (data += chunk));
        res.on("end", () => {
            const $ = cheerio.load(data);

            console.log($("#descripcion_torneo").text())
            console.log($("#descripcion_instancia").text())
            console.log($("#fecha_partido").text())
            console.log($("#hora_partido").text())
        });
    });
};

const main2 = () => {
    const url = "http://www.aquehorajuegaboca.com.ar/proximos";
    http.get(url, res => {
        let data = "";
        res.on("data", chunk => (data += chunk));
        res.on("end", () => {
            const $ = cheerio.load(data);
            $('#bannercontainer').remove()
            $('#enlace_proximos').remove()

            let partidos = $('#maincontainer').children()
            for (let i = 0; i < partidos.length; i++) {
                const partido = partidos[i];
                const equipos = $(".equipo_proximo", partido)
                const info = $(".info_proximo", partido)


                const local = $(equipos[0]).text().trim()
                const visitante = $(equipos[1]).text().trim()
                const descripcion = $(".descripcion_proximo", info).text().trim()
                const fecha = $(".fecha_proximo", info).text().trim()
                const hora = $(".hora_proximo", info).text().trim()
                const faltan = 22 // Dummy

                console.log(descripcion)
                console.log(`${local} vs ${visitante}`)
                console.log(`Fecha: ${fecha}`)
                console.log(`Horario: ${hora}`)
                console.log(`Faltan: ${faltan} Dias`)
                    //console.log(local, visitante, descripcion, fecha, hora)
                console.log("--------------------------------")
            }
        });
    });
};
main2();