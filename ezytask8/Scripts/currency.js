var currency = (function () {
    var priv = {};
    var pub = {};

    pub.init = function () {
        priv.loadCurrencyData();
    }
    priv.loadCurrencyData = function (updateCurrencyData) {
        priv.viewModel.isLoading(true);
        priv.viewModel.displayErrorMessage(false);
        var xhr = new XMLHttpRequest();
        var url = "/Home/GetCurrencyDataAsync"
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function (data) {
            var errorMessage = data.target.response.ErrorMessage;
            if (xhr.readyState == 4 && xhr.status == 200 && errorMessage.length == 0) {
                priv.viewModel.currencyData(data.target.response.ForexDataList);
                priv.viewModel.isLoading(false);
            } else {
                priv.viewModel.errorMessage(errorMessage);
                priv.viewModel.displayErrorMessage(true);
            }
        };
        xhr.send();
    };
    priv.viewModel = {
        isLoading: ko.observable(false),
        sortAscending: ko.observable(true),
        displayErrorMessage: ko.observable(false),
        errorMessage: ko.observable(""),
        currencyData: ko.observable([]),
        loadCurrency: function () {
            priv.loadCurrencyData()
        },
        sort: function (inputParam) {
            if (inputParam === "name") {
                if (priv.viewModel.sortAscending() == true) {
                    priv.viewModel.sortAscending(false);
                    var currencyData = priv.viewModel.currencyData().sort(function (a, b) {
                        return (a.CurrencyName < b.CurrencyName) - (a.CurrencyName > b.CurrencyName);
                    });
                } 
                else {
                    priv.viewModel.sortAscending(true);
                    var currencyData = priv.viewModel.currencyData().sort(function (a, b) {
                        return (a.CurrencyName > b.CurrencyName) - (a.CurrencyName < b.CurrencyName);
                    });
                }

                priv.viewModel.currencyData(currencyData);
            }
        }
    }

    return {
        init: pub.init,
        getCurrencyData: pub.getCurrencyData,
        viewModel: priv.viewModel
    }

})();


currency.init();
ko.applyBindings(currency.viewModel);

