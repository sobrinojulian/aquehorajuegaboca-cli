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

            //const children = $('#maincontainer').children()[1]
            //const foo = $(".equipo_proximo", "children")
            //console.log(children)
            const ch = $('#maincontainer').children()
            const a = $(ch).slice(1)
            const partidos = $(a).map(function(i, el) {
                    const equipos = $(".equipo_proximo", el).map(function(i, el) {
                        const equipo = $(el).text()
                        console.log(i, equipo)
                        return el

                    })

                    //return $(this).text();
                }).get()
                //console.log(partidos)
        });
    });
};
main2();