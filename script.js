const api = "https://api.exchangerate-api.com/v4/latest/USD";

// for selecting different controls
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrency = document.getElementById("from");
var toCurrency = document.getElementById("to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var resultFrom = fromCurrency.value;
var resultTo = toCurrency.value;
var searchValue = search.value;

// Event when currency is changed
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

// Event when currency is changed
toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
});
    
search.addEventListener('input', (event) => {
    searchValue = event.target.value;
});

// Filter out non-numeric characters except decimal point
search.addEventListener('keypress', (event) => {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        event.preventDefault();
    }
});

// when user clicks, it calls function getResults
convert.addEventListener("click", getResults);

// function getResults
function getResults() {
    searchValue = search.value;
    if (isNaN(searchValue) || searchValue <= 0) {
        alert("Please enter a valid number greater than 0");
        return;
    }
    fetch(api)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.rates) {
                console.error('Invalid API response');
                return;
            }
            let fromRate = data.rates[resultFrom];
            let toRate = data.rates[resultTo];
            if (!fromRate || !toRate) {
                console.error('Currency conversion rates not available');
                return;
            }
            let convertedAmount = (toRate / fromRate * searchValue).toFixed(2);
            finalAmount.textContent = convertedAmount;
            finalValue.style.display = "block";
        })
        .catch(error => console.error('Error:', error));
}

// when user clicks on reset button
function clearVal() {
    window.location.reload();
}

// function to swap currencies
function swapCurrencies() {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    resultFrom = fromCurrency.value;
    resultTo = toCurrency.value;
}
