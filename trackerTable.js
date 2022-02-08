let url = "https://disease.sh/v3/covid-19/countries/";

let contTotal = 0;
let contActive = 0;
let contRecovered = 0;
let contMuertes = 0;

////////////////////////////////Buscador////////////////////////////////
paisesTable = []

document.querySelector(".search").addEventListener("input", (e) => {
    const inputValue = e.target.value.toLowerCase();
    for (let i = 0; i < paisesTable.length; i++) {
        let isVisible = paisesTable[i].country.toLowerCase().includes(inputValue)
        document.querySelectorAll(".mostrarFila")[i].classList.toggle("hide",!isVisible);
    }
})
////////////////////////////////////////////////////////////////////////

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

    paisesTable = resultado.map(valor => {
        htmlCode = `<tr class="mostrarFila">
                        <td ><img style="width: 60%" src=${valor.countryInfo.flag}></th>
                        <td >${valor.country}</td>
                        <td >${valor.cases}</td>
                        <td >${valor.todayCases}</td>
                        <td >${valor.deaths}</th>
                        <td >${valor.todayDeaths}</td>
                        <td >${valor.recovered}</td>
                        <td >${valor.active}</td>
                        <td >${valor.critical}</td>
                        <td >${valor.tests}</td>
                    </tr>`
        document.querySelector(".contenidoTable").innerHTML += htmlCode
        return {
            flag: valor.countryInfo.flag,
            country: valor.country,
            cases: valor.cases,
            todayCases: valor.todayCases,
            deaths: valor.deaths,
            todayDeaths: valor.todayDeaths,
            recovered: valor.recovered,
            active: valor.active,
            critical: valor.critical,
            tests: valor.tests
        }
    })
}

document.addEventListener("load", getData(url))