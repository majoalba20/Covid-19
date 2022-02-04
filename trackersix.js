let url = "https://disease.sh/v3/covid-19/countries/";
let urlGraphic = "https://disease.sh/v3/covid-19/all";

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

let getDataGraphic = async(link)=>{
    let solicitud = await fetch(link);
    let respuesta = await solicitud.json();
    console.log(respuesta)
    let grafica = document.querySelector("#myCanvas").getContext("2d");
    let valorTotal = respuesta.active + respuesta.cases + respuesta.deaths;
    console.log(valorTotal)
    let myChart = new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: ['Active', 'Cases', 'Deaths'],
            datasets: [{
                label: '',
                data: [`${(respuesta.active/valorTotal)*100}`, `${(respuesta.cases/valorTotal)*100}`, `${(respuesta.deaths/valorTotal)*100}`],
                backgroundColor: [
                    'rgb(233, 73, 105)',
                    'rgb(12, 12, 207)',
                    'rgb(200, 100, 218)'
                ]
            }]
        }
    });
}

document.addEventListener("load", getDataGraphic(urlGraphic))