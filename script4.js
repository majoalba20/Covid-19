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




let conteototal = 0;
let conteoactivo = 0;
let conteorecuperados = 0;
let conteomuertes = 0;

let pruebita = 0;

let getpais = async (url) => {
    let peticiion = await fetch(url);
    let result = await peticiion.json();
    result.map(m => conteototal += m.cases)
    result.map(m => conteoactivo += m.active)
    result.map(m => conteorecuperados += m.recovered)
    result.map(m => conteomuertes += m.deaths)


    console.log(result)

    for (let i = 0; i < result.length; i++) {
        elemento = `<div class="tarjetabandera"><img class="banderilla" id=${result[i].country} src=${result[i].countryInfo.flag} </div>`;
        document.querySelector(".banderillas").innerHTML += elemento;
    }



    let tarjetabandera4 = document.querySelectorAll(".tarjetabandera");
    tarjetabandera4.forEach(bandera => {

        bandera.addEventListener("click", (e) => {
            let vino = e.target.id;
            for (const pais of result) {

                if (pais.country == vino) {
                    paisinfo = pais
                    console.log(paisinfo)
                    document.querySelector(".zerob").innerHTML = ` <strong>  ${paisinfo.country}  </strong> `;
                    document.querySelector(".oneb").innerHTML = ` Total Cases <br> <br><strong>${paisinfo.cases}</strong>`;
                    document.querySelector(".twob").innerHTML = ` Total Deaths <br> <br><strong>${paisinfo.deaths}</strong>`;
                    document.querySelector(".threb").innerHTML = `Total recovered <br> <br><strong> ${paisinfo.recovered}</strong>`;
                    document.querySelector(".fourb").innerHTML = `Total active <br> <br><strong> ${paisinfo.active}</strong>`;
                    document.querySelector(".fiveb").innerHTML = `New Cases <br> <br><strong>${paisinfo.todayCases}</strong>`;
                    document.querySelector(".sixb").innerHTML = `New Deaths <br> <br><strong>${paisinfo.todayDeaths}</strong>`;

                }
            }
        })
    })

    document.querySelector(".zerob").innerHTML = ` <strong>  ${result[0].country}  </strong> `;
    document.querySelector(".oneb").innerHTML = ` Total Cases <br> <br> <strong> ${result[0].cases} </strong>`;
    document.querySelector(".twob").innerHTML = ` Total Deaths <br> <br> <strong> ${result[0].deaths}</strong>`;
    document.querySelector(".threb").innerHTML = `Total recovered <br> <br> <strong> ${result[0].recovered}</strong>`;
    document.querySelector(".fourb").innerHTML = `Total active <br> <br> <strong> ${result[0].active}</strong>`;
    document.querySelector(".fiveb").innerHTML = `New Cases <br> <br> <strong> ${result[0].todayCases}</strong>`;
    document.querySelector(".sixb").innerHTML = `New Deaths <br> <br> <strong> ${result[0].todayDeaths}</strong>`;





    /*     let barba=document.querySelectorAll(".tarjetabandera");

        barba.forEach(bandera=> {
            bandera.addEventListener("click",(e)=>{
                console.log("cali")
            }) 
        });
         */






}

document.addEventListener("load", getpais(url))