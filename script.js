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
    res.sort(function(a, b){return b-a}); // organizar desendentemente
    

    let topCasos = []
    for (let i = 0; i < 10; i++) {
        topCasos.push(res[i])
    }

    for (let i = 0; i < topCasos.length; i++) {
        for (let j = 0; j < resultado.length; j++) {
            if (resultado[j].cases === topCasos[i]) {
                let codeHTML = `<div class="countryCard"><img class="flag" src=${resultado[j].countryInfo.flag}>${resultado[j].country} ${resultado[j].cases}</div>`;
                document.querySelector(".top10").innerHTML += codeHTML;
            }
        }
    }
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////////////Date////////////////////////////////////////////
    const update = new Date();
    function getMes(n){
        switch(n){
            case 1: return "January"; break;
            case 2: return "February"; break;
            case 3: return "March"; break;
            case 4: return "April"; break;
            case 5: return "May"; break;
            case 6: return "June"; break;
            case 7: return "July"; break;
            case 8: return "August"; break;
            case 9: return "September"; break;
            case 10: return "October"; break;
            case 11: return "November"; break;
            case 12: return "December"; break;
        }
    }
    let mes = update.getMonth()+1;
    let fechaActual = `Updated: ${getMes(mes)} ${update.getDate()}, ${update.getFullYear()}`
    document.querySelector(".fecha").innerHTML = fechaActual;
    ////////////////////////////////////////////////////////////////////////////

    //////////////////////Llenar el selector desplegable////////////////////////
    for (let i = 0; i < resultado.length; i++) {
        codeSelection = `<option>${resultado[i].country}</option>`;
        document.querySelector(".paisesList").innerHTML += codeSelection; 
    }
    ///////////////////////////////////////////////////////////////////////////

    //////////////////////////Info Cards Desplegable/////////////////////////////
    let dataCountry = ()=>{
        let paisCode = document.querySelector(".paisesList").value;
        for (let i = 0; i < resultado.length; i++) {
            if (resultado[i].country === paisCode) {
                let paisNuevo = resultado[i]
                document.querySelector(".tc").innerHTML = paisNuevo.cases;
                document.querySelector(".td").innerHTML = paisNuevo.deaths;
                document.querySelector(".tr").innerHTML = paisNuevo.recovered;
                document.querySelector(".ta").innerHTML = paisNuevo.active;
                document.querySelector(".nc").innerHTML = paisNuevo.todayCases;
                document.querySelector(".nd").innerHTML = paisNuevo.todayDeaths;
            }
        }
    }

    dataCountry()

    document.querySelector(".paisesList").addEventListener("change",()=>{
        dataCountry()
    })
    ////////////////////////////////////////////////////////////////////////
    console.log(resultado)
}

document.addEventListener("load", getData(url))
