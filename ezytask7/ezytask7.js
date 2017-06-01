var ezyTask7 = (function () {
    var init = function () {
        updateClock();
        setLoadListButton();
        startTimerFor30SecondCount();
    }
    var loadList = function () {
        var getUlList = document.getElementById("listOfNumbers");
        getUlList.innerHTML = "";
        createListOfNumbers(getUlList);
        updateClock();
    }
    var createListOfNumbers = function (element) {
        for (var i = 0; i < 10; i++) {
            element.appendChild(createLiElement(i));
        }
    }
    var createLiElement = function (value) {
        var el = document.createElement("li");
        el.innerText = value;
        el.addEventListener("click", function (value) {
            value.target.innerHTML == "5" ? alert("Five!!") : alert(value.target.innerHTML);
        });
        return el;
    }
    var setLoadListButton = function () {
        var getloadListButton = document.getElementById("loadListButton");
        getloadListButton.addEventListener("click", function () {
            ezyTask7.loadList();
        });
    }
    var startTimerFor30SecondCount = function () {
        setTimeout(function () {
            alert("You have now been on the page for half a minute!")
        }, 30000);
    }
    var updateClock = function () {
        var getClockElement = document.getElementById("currentTime");
        getClockElement.innerHTML = new Date().toLocaleTimeString();
        setTimeout(function () {
            updateClock();
        }, 1000);
    }

    return {
        loadList: loadList,
        init: init
    };
})();

ezyTask7.init();
