import currCodeAndCountry from './currenciesCodeCountry.js'


let currenciesApiData = []; 
let mainCurrenciesApiData = [];
let mainCountriesCode = ['USD','CHF','UAH','GBP','EUR'];
let polandData = {currency: 'polski złoty', code: 'PLN', mid: 1, country: 'poland', src: 'https://countryflagsapi.com/png/poland'}
let currFullData;
const LOCAL_STORAGE_DATA = 'countryData'
const LOCAL_STORAGE_HOUR = 'hourData'
const d = new Date();
let hour = d.getHours();
const bottomRatesContainer = document.querySelector('.bottom_rates');
const countryChoose = document.querySelectorAll('.country_choose');
const countryList = document.querySelectorAll('.countryList')
const countryListMain = document.querySelectorAll('.countryList_main');
const countryListRest = document.querySelectorAll('.countryList_rest');

window.addEventListener('DOMContentLoaded', init());

function init() {
    isLocalStorage();
    // timerGetRates()
    filterMainCurrency()
    renderBottomRates()
    initListeners()
    renderCountryList()
}

function isLocalStorage() {
    const storage = localStorage.getItem(LOCAL_STORAGE_DATA);
    const timeStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HOUR))

    // is local storage
    if(storage && timeStorage == hour) {
        currenciesApiData = JSON.parse(storage)
        currFullData = currenciesApiData

    } else {
        getData()
        console.log('dupa');
    }
}

function getData() {
    fetch(
        `http://api.nbp.pl/api/exchangerates/tables/a/`
        )
    .then(resp => resp.json())
    .then(data => {
        currenciesApiData = data[0].rates
            currenciesApiData.push(polandData)
            connectData()

            localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(currFullData))
            localStorage.setItem(LOCAL_STORAGE_HOUR, JSON.stringify(hour))
    });
}

function connectData() {
    currFullData = currenciesApiData
    console.log(currFullData);

    currFullData.forEach( el =>{
        currCodeAndCountry.forEach((elSM, index) => {
            if(el.code == elSM.code) {
                currFullData[index].country = currCodeAndCountry[index].country.toLowerCase()
                currFullData[index].src = `https://countryflagsapi.com/png/${currFullData[index].country}`
            }
        })
    })
}

function filterMainCurrency() {
console.log(currenciesApiData);
    currenciesApiData.forEach(el => {
        if(mainCountriesCode.includes(el.code)) {
            mainCurrenciesApiData.push(el)
        }
    })
}

function initListeners() {
    // country_choose
    // countryList/
    countryChoose.forEach(el => {
        el.addEventListener('click', (e) => {
            let index = e.currentTarget.dataset.index
            countryList[index].classList.toggle('isVisible')
        })
    })

}

function renderCountryList() {

}


function renderBottomRates() {
    console.log(mainCurrenciesApiData);
    mainCurrenciesApiData.forEach(el => {
        let liEl = `
        <div class="single__rates">
        <img src="https://countryflagsapi.com/png/${el.country}" alt="${el.country} flag">
        <div class="single__rates--country">
            <h3>${el.code}</h3>
            <p>${el.mid}</p>
        </div>
    </div>
        `

        bottomRatesContainer.innerHTML += liEl;
    })
}

function timerGetRates() {
    setInterval(() => {
        // getData()
        // DODAĆ RENDER KURSÓW
    }, 3600000);
}


// <li>
// <img class="countryList__subtitles_img" src="https://countryflagsapi.com/png/usa" alt="Europe flag">

// <div class="countryList__countryName">
//     <span class="countryList__countryName--shortName">USD</span>

//     <span class="countryList__countryName--rateName">Amerykański Dolar</span>
// </div>
// </li>