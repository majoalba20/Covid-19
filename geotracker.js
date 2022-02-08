let url = "https://disease.sh/v3/covid-19/countries/";

let contTotal = 0;
let contActive = 0;
let contRecovered = 0;
let contMuertes = 0;

let getData = async (url) => {
    let peticion = await fetch(url);
    let resultado = await peticion.json();
    resultado.map(m => contTotal += m.cases)
    resultado.map(m => contActive += m.active)
    resultado.map(m => contRecovered += m.recovered)
    resultado.map(m => contMuertes += m.deaths)
    document.querySelector(".CasosTotales").innerHTML = `Total Case <p class="caseNumber case">${contTotal}</p>`;
    document.querySelector(".CasosActivos").innerHTML = `Active Case <p class="caseNumberuno case">${contActive}</p>`;
    document.querySelector(".CasosRecuperados").innerHTML = `Recovered Case <p class="caseNumberdos case">${contRecovered}</p>`;
    document.querySelector(".Muertes").innerHTML = `Deaths Case <p class="caseNumbertres case">${contMuertes}</p>`;
    ///////////////////////////////////Top 10 global cases////////////////////////////
    let res = resultado.map(g => g.cases)
    res.sort(function (a, b) {
        return b - a
    });
    let topCasos = []
    for (let i = 0; i < 10; i++) {
        topCasos.push(res[i])
    }

    for (let i = 0; i < topCasos.length; i++) {
        for (let j = 0; j < resultado.length; j++) {
            if (resultado[j].cases === topCasos[i]) {
                codeHTML = `<div class="countryCard"><img class="flag" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].cases}</div>`;
                document.querySelector(".top10").innerHTML += codeHTML;
            }
        }
    }
}

document.addEventListener("load", getData(url))

///////////////////////////////////////////////////
const width = 900;
const height = 600;

const svg = d3.select('section').append('svg').attr('width', width).attr('height', height);

const projection = d3.geoMercator().scale(100)
    .translate([width / 2, height / 1.4]);
const path = d3.geoPath(projection);

const g = svg.append('g');

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(data => {
        const countries = topojson.feature(data, data.objects.countries);
        g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);
    });

