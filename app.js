import currCodeAndCountry from './currenciesCodeCountry.js'

    let currenciesApiData = []; 
    let currFullData;
    
    fetch(
        `http://api.nbp.pl/api/exchangerates/tables/a/`
        )
    .then(resp => resp.json())
    .then(data => {
        currenciesApiData = data[0].rates
            connectData()
            console.log(currFullData);
    });


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
