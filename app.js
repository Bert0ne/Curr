import currCodeAndCountry from './currenciesCodeCountry.js'

    
//     fetch(
//         `http://api.nbp.pl/api/exchangerates/tables/a/`
//         )
//     .then(resp => resp.json())
//     .then(data => {
//         currenciesApiData = data[0].rates
//             connectData()
//             console.log(currFullData);
//     });


// function connectData() {
//     currenciesApiData.map( el =>{
//         currCodeAndCountry.forEach((elSM, index) => {
//             if(el.code == elSM.code) {
//                 currFullData = currenciesApiData
//                 currFullData[index].country = currCodeAndCountry[index].country.toLowerCase()
//                 currFullData[index].src = `https://countryflagsapi.com/png/${currFullData[index].country}`
//             }
//         })
//     })
// }

let currenciesApiData = []; 
let currFullData;
const LOCAL_STORAGE_DATA = 'countryData'
const LOCAL_STORAGE_HOUR = 'hourData'
const d = new Date();
let hour = d.getHours();
    
window.addEventListener('DOMContentLoaded', init());

function init() {
    isLocalStorage();
    timerGetRates()
}

function timerGetRates() {
    setInterval(() => {
        getData()
    }, 3600000);
}

function isLocalStorage() {
    const storage = localStorage.getItem(LOCAL_STORAGE_DATA);
    const timeStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HOUR))

    if(storage && timeStorage == hour) {
        currenciesApiData = JSON.parse(storage)
        
        console.log(currenciesApiData);
    } else {
        getData()
    }
}

function getData() {
    fetch(
        `http://api.nbp.pl/api/exchangerates/tables/a/`
        )
    .then(resp => resp.json())
    .then(data => {
        currenciesApiData = data[0].rates
            connectData()
            console.log(currFullData);
            localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(currenciesApiData))
            localStorage.setItem(LOCAL_STORAGE_HOUR, JSON.stringify(hour))
    });
}

function connectData() {
    currenciesApiData.map( el =>{
        currCodeAndCountry.forEach((elSM, index) => {
            if(el.code == elSM.code) {
                currFullData = currenciesApiData
                currFullData[index].country = currCodeAndCountry[index].country.toLowerCase()
                currFullData[index].src = `https://countryflagsapi.com/png/${currFullData[index].country}`
            }
        })
    })
}


