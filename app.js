import currCodeAndCountry from './currenciesCodeCountry.js'

    let currenciesApiData = []; 
    let currFullData;
    
    fetch(
        `http://api.nbp.pl/api/exchangerates/tables/a/`
        )
    .then(resp => resp.json())
    .then(data => {

        console.log(data[0].rates);
        currenciesApiData = data[0].rates
            connectData()
            console.log(currFullData);
    });


function connectData() {

    currenciesApiData.map( el =>{
        currCodeAndCountry.forEach((elSM, index) => {
            // el.code == elSM.code ? console.log('hi') : console.log('no');
            if(el.code == elSM.code) {
                currFullData = currenciesApiData
                currFullData[index].country = currCodeAndCountry[index].country
            }

        })
    })
}
