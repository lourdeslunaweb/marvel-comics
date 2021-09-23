// ***********************************
// *** Display cards in index.html ***
// ***********************************
// Set variables
var baseUrl = "https://gateway.marvel.com:443/v1/public/";
var apiKey = "06e295e3c238e43e31ef140c424be15b";
var hash = "1eee8ff490d4a973b65d6f613e9569ff";
var limit = 20;
var offset = 0;
var contentHTML = "";
// Nodes
var typeFilter = document.getElementById("type-filter");
var typeUrl = typeFilter.value;
var searchInput = document.getElementById("search-input");
var results = document.getElementById("results");
var older = document.getElementById("older");
var newer = document.getElementById("newer");
var sortFilter = document.getElementById("sort-filter");
var searchBtn = document.getElementById("search-button");
var marvelCards = document.getElementById("marvel-cards");
// Refresh cards table function
var refreshCardsTable = function (offset, type) {
    contentHTML = "";
    var urlAPI = "" + baseUrl + type + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&limit=" + limit + "&offset=" + offset;
    fetch(urlAPI)
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var totalResults = json.data.total ? json.data.total : "No hay resultados";
        results.innerText = totalResults + " resultados";
        var cards = json.data.results;
        for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
            var card = cards_1[_i];
            var thumb = card.thumbnail ? card.thumbnail : "";
            var cardTitle = card.title ? card.title : card.name;
            var hrefData = "./data.html?type=" + type + "&id=" + card.id;
            contentHTML += "\n            <div class=\"card-div\">\n                <a href=\"" + hrefData + "\">\n                    <img src=\"" + thumb.path + "." + thumb.extension + "\" alt=\"" + cardTitle + "\"  class=\"card-home\">\n                </a>\n                <h3>" + cardTitle + "</h3>\n            </div>";
        }
        marvelCards.innerHTML = contentHTML;
    });
};
// Refresh cards table by types (comics or characters)
var refreshTablesByTypes = function (e) {
    if (typeFilter.value === "comics") {
        refreshCardsTable(offset, "comics");
    }
    else if (typeFilter.value === "characters") {
        refreshCardsTable(offset, "characters");
    }
};
typeFilter.addEventListener("change", refreshTablesByTypes);
// Initial function of index.html
var initIndex = function () {
    refreshCardsTable(offset, typeFilter.value);
};
initIndex();
