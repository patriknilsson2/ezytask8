var currency = (function () {
    var currencies = [];
    var init = function () {
        setCurrencyButton();
    }
    var getCurrencyData = function () {
        loadCurrencyData(updateCurrencyData);
    }
    var updateCurrencyData = function () {
        var currencyData = document.getElementById("currencyDataBody");
        currencyData.innerHTML = "";
        currencies.forEach(function(i, v){
            var newLiElement = createNewLiElement(i.LanguageCode, i.Currency);
            currencyData.appendChild(newLiElement);
        });
        document.getElementById("loadingText").style.display = "none";
    }
    var createNewLiElement = function(languageCode, currency) {
        var el = document.createElement("tr");
        var languageSpan = document.createElement("span");
        var currencySpan = document.createElement("span");
        languageSpan.innerHTML = languageCode;
        currencySpan.innerHTML = currency;
        el.appendChild(languageSpan);
        el.appendChild(currencySpan);
        return el;
    }
    var loadCurrencyData = function (updateCurrencyData) {
        document.getElementById("loadingText").style.display = "block";
        document.getElementById("currencyDataBody").innerHTML = "";
        var xhr = new XMLHttpRequest();
        var url = "/Home/GetCurrencyDataAsync"
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function (data) {             
            var status = xhr.status;
            if (xhr.readyState == 4 && xhr.status == 200){ 
                currencies = [];
                currencies = data.target.response;  
                updateCurrencyData();      
            } else {
                alert("error!");
            }
        };
        xhr.send();
    };

    var setCurrencyButton = function () {
        var getCurrencyButton = document.getElementById("getCurrencyData");
        getCurrencyButton.addEventListener("click", function () {
            currency.getCurrencyData();
        });
    }
    return {
        init: init,
        getCurrencyData: getCurrencyData
    }
})();
currency.init();