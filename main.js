#!/usr/bin/env node

const https = require("http");
const cheerio = require("cheerio");

const main = () => {
    const url = "http://www.aquehorajuegaboca.com.ar/";
    https.get(url, res => {
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
main();