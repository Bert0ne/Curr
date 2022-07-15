import currCodeAndCountry from './currenciesCodeCountry.js'


let currenciesApiData = []; 
let mainCurrenciesApiData = [];
let restCurrenciesApiData = [];
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
const inputRateSearch = document.querySelectorAll('.inputRateSearch');

window.addEventListener('DOMContentLoaded', init());

function init() {
    isLocalStorage();
}

function renderStuff() {
    filterMainCurrency()
    renderBottomRates()
    renderCountryList()

    timerGetRates()
    initListeners()
}

function isLocalStorage() {
    const storage = localStorage.getItem(LOCAL_STORAGE_DATA);
    const timeStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_HOUR))

    // is local storage
    if(storage && timeStorage == hour) {
        currenciesApiData = JSON.parse(storage)
        currFullData = currenciesApiData
        renderStuff();
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
            currenciesApiData.push(polandData)
            connectData()

            localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(currFullData))
            localStorage.setItem(LOCAL_STORAGE_HOUR, JSON.stringify(hour))

            renderStuff()
    });
}

function connectData() {
    currFullData = currenciesApiData

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
    currenciesApiData.forEach(el => {
        if(mainCountriesCode.includes(el.code)) {
            mainCurrenciesApiData.push(el)
        }
    })

    currenciesApiData.forEach(el => {
        if(!mainCountriesCode.includes(el.code)) {
            restCurrenciesApiData.push(el)
        }
    })
}

function initListeners() {
    countryChooseBtn()
    countryInputFilter()
}

function clearCurrencyInput() {
    inputRateSearch.forEach(el => el.value = '');
    renderCountryList()
}


function countryChooseBtn()
 {
        document.addEventListener('click', e => {

            if(e.target.classList.contains('inputRateSearch')) return
            clearCurrencyInput()
            

            let divTarget = e.target.closest('.country_choose')
            if(divTarget) {
                let indexTarget = divTarget.dataset.index

                if(!countryList[indexTarget].classList.contains('isVisible')) {

                    countryList.forEach(el => {
                        el.classList.remove('isVisible')
                    })
                    countryList[indexTarget].classList.add('isVisible')
                } else {
                    countryList.forEach(el => {
                        el.classList.remove('isVisible')
                    })
                }

            } else { 
                countryList.forEach(el => {
                    el.classList.remove('isVisible')
                })
            }   
        })
}

function countryInputFilter() {
    inputRateSearch.forEach( input => {
        input.addEventListener('keyup', e =>{
            console.log(e.key, input.value);
            let letter = input.value;

            let renderedArray = mainCurrenciesApiData.filter( e => {
                return e.currency.includes(letter)
            })
            renderMainCountryList(renderedArray)

            console.log(renderedArray);
        })
    })
}

function renderCountryList() {
    renderMainCountryList();
    renderRestCountryList();
}

function renderMainCountryList(defaultArr = mainCurrenciesApiData) {
    // countryListMain[0].innerHTML = ' '
    // countryListMain[1].innerHTML = ' '


    countryListMain.forEach( (el, index)  => {
        countryListMain[index].innerHTML = ' '

        defaultArr.forEach( liElement => {
            let liEl= `            
            <li>
                <img class="countryList__subtitles_img" src="${liElement.src}" alt="${liElement.country} flag">

                <div class="countryList__countryName">
                    <span class="countryList__countryName--shortName">${liElement.code}</span>

                    <span class="countryList__countryName--rateName">${liElement.currency}</span>
                </div>
            </li> 
            `        

            countryListMain[index].innerHTML += liEl
        })
    })
}

function renderRestCountryList() {
    countryListMain.forEach( (el, index)  => {
        
        restCurrenciesApiData.forEach( liElement => {
            let liEl= `            
            <li>
                <img class="countryList__subtitles_img" src="${liElement.src}" alt="${liElement.country} flag">

                <div class="countryList__countryName">
                    <span class="countryList__countryName--shortName">${liElement.code}</span>

                    <span class="countryList__countryName--rateName">${liElement.currency}</span>
                </div>
            </li> 
            `
            countryListRest[index].innerHTML += liEl
        })
    })
}

function renderBottomRates() {
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
        window.location.reload()
    }, 3600000);
}


// <li>
// <img class="countryList__subtitles_img" src="https://countryflagsapi.com/png/usa" alt="Europe flag">

// <div class="countryList__countryName">
//     <span class="countryList__countryName--shortName">USD</span>

//     <span class="countryList__countryName--rateName">Amerykański Dolar</span>
// </div>
// </li>