var currency = (function () {
    var currencyData = [];
    var init = function () {
        setLoadCurrencyButton();
    }
    var getCurrencyData = function () {
        loadCurrencyData(updateCurrencyData);
    }
    var updateCurrencyData = function () {
        hideLoadingText();
        var currencyDataBody = document.getElementById("currencyDataBody");
        currencyDataBody.innerHTML = "";
        currencyData.forEach(function (i, v) {
            var newLiElement = createTrElement(i.CurrencyCode, i.Currency, i.CurrencyName);
            currencyDataBody.appendChild(newLiElement);
        });        
    }
    var createTrElement = function (languageCode, currency, name) {
        var trElement = document.createElement("tr");
        trElement.appendChild(createTdElement(languageCode));     
        trElement.appendChild(createTdElement(currency));     
        trElement.appendChild(createTdElement(name));     
        return trElement;
    }
    var createTdElement = function (value) {
        var newTdElement = document.createElement("td");
        newTdElement.innerHTML = value;
        return newTdElement;
    }
    var loadCurrencyData = function (updateCurrencyData) {
        showLoadingText();        
        var xhr = new XMLHttpRequest();
        var url = "/Home/GetCurrencyDataAsync"
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function (data) {
            var errorMessage = data.target.response.ErrorMessage;
            if (xhr.readyState == 4 && xhr.status == 200 && errorMessage.length == 0) {
                currencyData = [];
                currencyData = data.target.response.ForexDataList;
                updateCurrencyData();
            } else {
                displayErrorMessage(errorMessage)                
            }
        };
        xhr.send();
    };
    var hideLoadingText = function() {
        document.getElementById("loadingText").style.display = "none";
    }
    var showLoadingText = function () {
        document.getElementById("loadingText").style.display = "inline-block";
        document.getElementById("currencyDataBody").innerHTML = "";
        document.getElementById("errorMessage").style.display = "none";
    }
    var displayErrorMessage = function (message) {
        hideLoadingText();
        document.getElementById("errorMessage").style.display = "inline-block";
        document.getElementById("errorMessage").innerHTML = message;
    }    
    var setLoadCurrencyButton = function () {
        var getCurrencyButton = document.getElementById("getCurrencyDataButton");
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