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
    function getTopTen(){
        let res = []
        for (let i = 0; i < resultado.length; i++) {
            res.push(resultado[i].cases)
        }
        res.sort(function(a, b){return b-a});
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

    function getTopTenActive(){
        let res = []
        for (let i = 0; i < resultado.length; i++) {
            res.push(resultado[i].active)
        }
        res.sort(function(a, b){return b-a});
        let topCasos = []
        for (let i = 0; i < 10; i++) {
            topCasos.push(res[i])
        }
    
        for (let i = 0; i < topCasos.length; i++) {
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[j].active === topCasos[i]) {
                    codeHTML = `<div class="columna"><img class="flagRadius" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].active}</div>`;
                    document.querySelector(".topActiveGlobal").innerHTML += codeHTML;
                }
            }
        }
    }
    
    function getTopTenDeaths(){
        let res = []
        for (let i = 0; i < resultado.length; i++) {
            res.push(resultado[i].deaths)
        }
        res.sort(function(a, b){return b-a});
        let topCasos = []
        for (let i = 0; i < 10; i++) {
            topCasos.push(res[i])
        }
    
        for (let i = 0; i < topCasos.length; i++) {
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[j].deaths === topCasos[i]) {
                    codeHTML = `<div class="columna"><img class="flagRadius" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].deaths}</div>`;
                    document.querySelector(".topDeathsGlobal").innerHTML += codeHTML;
                }
            }
        }
    }

    function getTopTenRecovered(){
        let res = []
        for (let i = 0; i < resultado.length; i++) {
            res.push(resultado[i].recovered)
        }
        res.sort(function(a, b){return b-a});
        let topCasos = []
        for (let i = 0; i < 10; i++) {
            topCasos.push(res[i])
        }
    
        for (let i = 0; i < topCasos.length; i++) {
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[j].recovered === topCasos[i]) {
                    codeHTML = `<div class="columna"><img class="flagRadius" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].recovered}</div>`;
                    document.querySelector(".topRecoveredlobal").innerHTML += codeHTML;
                }
            }
        }
    }

    function getTopTenCritical(){
        let res = []
        for (let i = 0; i < resultado.length; i++) {
            res.push(resultado[i].critical)
        }
        res.sort(function(a, b){return b-a});
        let topCasos = []
        for (let i = 0; i < 10; i++) {
            topCasos.push(res[i])
        }
    
        for (let i = 0; i < topCasos.length; i++) {
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[j].critical === topCasos[i]) {
                    codeHTML = `<div class="columna"><img class="flagRadius" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].critical}</div>`;
                    document.querySelector(".topCriticalGlobal").innerHTML += codeHTML;
                }
            }
        }
    }

    function getTopTenTD(){
        let res = []
        for (let i = 0; i < resultado.length; i++) {
            res.push(resultado[i].todayDeaths)
        }
        res.sort(function(a, b){return b-a});
        let topCasos = []
        for (let i = 0; i < 10; i++) {
            topCasos.push(res[i])
        }
    
        for (let i = 0; i < topCasos.length; i++) {
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[j].todayDeaths === topCasos[i]) {
                    codeHTML = `<div class="columna"><img class="flagRadius" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].todayDeaths}</div>`;
                    document.querySelector(".topTDGlobal").innerHTML += codeHTML;
                }
            }
        }
    }

    function getTopTenTR(){
        let res = []
        for (let i = 0; i < resultado.length; i++) {
            res.push(resultado[i].todayRecovered)
        }
        res.sort(function(a, b){return b-a});
        let topCasos = []
        for (let i = 0; i < 10; i++) {
            topCasos.push(res[i])
        }
    
        for (let i = 0; i < topCasos.length; i++) {
            for (let j = 0; j < resultado.length; j++) {
                if (resultado[j].todayRecovered === topCasos[i]) {
                    codeHTML = `<div class="columna"><img class="flagRadius" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].todayRecovered}</div>`;
                    document.querySelector(".topTRGlobal").innerHTML += codeHTML;
                }
            }
        }
    }

    getTopTen()
    getTopTenActive()
    getTopTenDeaths()
    getTopTenRecovered()
    getTopTenTD()
    getTopTenTR()
    getTopTenCritical()
}

document.addEventListener("load", getData(url))