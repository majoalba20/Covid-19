let url = "https://disease.sh/v3/covid-19/countries/";
let urlGraphic = "https://disease.sh/v3/covid-19/all";
let urlHistory = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";

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

    ////////////////Top5/////////////////////////////////
    let res5 = resultado.map(f => f.cases)
    res5.sort(function (a, b) {
        return b - a
    });
    let topCinco = []
    for (let i = 0; i < 5; i++) {
        topCinco.push(res5[i])
    }

    arrayTop5 = []
    for (let i = 0; i < topCinco.length; i++) {
        for (let j = 0; j < resultado.length; j++) {
            if (resultado[j].cases === topCinco[i]) {
                arrayTop5.push(resultado[j])
            }
        }
    }
    ///////////////////////////////////////////////////////

    grafica = document.getElementById("myCanvas").getContext('2d');
    grafica1 = document.getElementById("myCanvas1").getContext('2d');
    grafica2 = document.getElementById("myCanvas2").getContext('2d');
    grafica3 = document.getElementById("myCanvas3").getContext('2d');
    grafica4 = document.getElementById("myCanvas4").getContext('2d');

    let pintarGrafica = (valor, x) => {
        let valorTotal = arrayTop5[x].recovered + arrayTop5[x].cases + arrayTop5[x].deaths;
        let myChart = new Chart(valor, {
            type: "pie",
            data: {
                labels: ['Recovered', 'Cases', 'Deaths'],
                datasets: [{
                    label: '',
                    data: [`${(arrayTop5[x].recovered/valorTotal)*100}`, `${(arrayTop5[x].cases/valorTotal)*100}`, `${(arrayTop5[x].deaths/valorTotal)*100}`],
                    backgroundColor: [
                        'rgb(233, 73, 105)',
                        'rgb(12, 12, 207)',
                        'rgb(200, 100, 218)'
                    ]
                }]
            }
        });
    }

    pintarGrafica(grafica, 0);
    pintarGrafica(grafica1, 1);
    pintarGrafica(grafica2, 2);
    pintarGrafica(grafica3, 3);
    pintarGrafica(grafica4, 4);
}

let getDataGlobal = async (urlGraphic) => {
    let peticion = await fetch(urlGraphic);
    let respuesta = await peticion.json();
    mundialData = document.getElementById("pCanvas").getContext('2d');
    let valorTotal = respuesta.recovered + respuesta.cases + respuesta.deaths;
    let myChart = new Chart(mundialData, {
        type: "doughnut",
        data: {
            labels: ['Recovered', 'Cases', 'Deaths'],
            datasets: [{
                label: '',
                data: [`${(respuesta.recovered/valorTotal)*100}`, `${(respuesta.cases/valorTotal)*100}`, `${(respuesta.deaths/valorTotal)*100}`],
                backgroundColor: [
                    'rgb(143, 188, 143)',
                    'rgb(32, 178, 170)',
                    'rgb(65, 105, 225)'
                ]
            }]
        }
    });
}

document.addEventListener("load", getData(url))
document.addEventListener("load", getDataGlobal(urlGraphic))

let getHistory = async(url)=>{
    let pet = await fetch(url);
    let res = await pet.json()
    for (let i = 0; i < res.length; i++) {
        console.log(res.cases[i])
        
    }
}

document.addEventListener("load", getHistory(urlHistory))

