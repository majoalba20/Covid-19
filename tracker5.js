let url = "https://disease.sh/v3/covid-19/countries/";

let contTotal = 0;
let contActive = 0;
let contRecovered = 0;
let contMuertes = 0;

let getData = async (url) => {
    let peticion = await fetch(url);
    //Toda la informacion de la API
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
    //Llenar targetas
    console.log(resultado)
    for (const valor of resultado) {
        console.log(valor)
         //llamamos cada elemento del array 
        let codeHTML= `
        <div class="Targeta" >
            <div class="tarjetaContenido">
                <div class="divCarta1" > <img class="flag" src=${valor.countryInfo.flag}> ${valor.country} </div> 
                <div class="divCarta2" > Cases <h4>${valor.cases}</h4></div>
                <div class="divCarta3">Deaths <h4>${valor.deaths}</h4> </div>
                <div class="divCarta4"> Recovered <h4>${valor.recovered}</h4></div>
                <div class="divCarta5"> Today Deaths <h4>${valor.todayDeaths}</h4> </div>
                <div class="divCarta6" > Today Cases  <h4>${valor.todayCases}</h4> </div>
                <div class="divCarta7"> Critical <h4>${valor.critical}</h4> </div>
                <div class="divCarta8" > Active Cases <h4>${valor.active}</h4> </div>
            </div>
        </div>`
        //meter code html en el div Contenedor-targeta
        document.querySelector(".Contenedor-targeta").innerHTML+=codeHTML
    }  
}

document.addEventListener("load", getData(url))
