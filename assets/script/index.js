// ***********************************
// *** Display cards in index.html ***
// ***********************************
// Params Index
var paramsIndex = new URLSearchParams(window.location.search);
// Set variables
var baseUrl = "https://gateway.marvel.com:443/v1/public/";
var apiKey = "06e295e3c238e43e31ef140c424be15b";
var hash = "1eee8ff490d4a973b65d6f613e9569ff";
var limit = 20;
var offset = limit * (Number(paramsIndex.get('page')));
var contentHTML = "";
var totalPages;
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
var firstPageBtn = document.getElementById("first-page-btn");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var lastPageBtn = document.getElementById("last-page-btn");
var anchorLastPageBtn = document.getElementById("anchor-last-page-btn");
// Refresh cards table function
var refreshCardsTable = function (offset, type) {
    contentHTML = "";
    var urlAPI = "" + baseUrl + type + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&limit=" + limit + "&offset=" + offset;
    fetch(urlAPI)
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var totalResults = json.data.total ? json.data.total : "No hay resultados";
        totalPages = (Math.ceil(totalResults / limit)) - 1;
        anchorLastPageBtn.setAttribute("href", "./index.html?page=" + totalPages);
        showHiddeBtn(totalResults, offset, limit);
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
refreshCardsTable(offset, typeFilter.value);
// Refresh cards table by types (comics or characters)
var refreshTablesByTypes = function () {
    if (typeFilter.value === "comics") {
        refreshCardsTable(offset, "comics");
    }
    else if (typeFilter.value === "characters") {
        refreshCardsTable(offset, "characters");
    }
};
typeFilter.addEventListener("change", refreshTablesByTypes);
// *******************************
// *** Pagination in index.html***
// *******************************
// Note: Last Page is setted into refreshCardsTable with an anchor in anchorLastPageBtn
var nextPage = function () {
    var page = Number(paramsIndex.get('page'));
    if (!page) {
        paramsIndex.set('page', '1');
    }
    else {
        paramsIndex.set('page', (page + 1).toString());
    }
    window.location.href = 'index.html?' + paramsIndex;
};
nextBtn.addEventListener("click", nextPage);
var prevPage = function () {
    var page = Number(paramsIndex.get('page'));
    if (!page) {
        paramsIndex.set('page', '1');
    }
    else {
        paramsIndex.set('page', (page - 1).toString());
    }
    window.location.href = 'index.html?' + paramsIndex;
};
prevBtn.addEventListener("click", prevPage);
var firstPage = function () {
    paramsIndex.set('page', (0).toString());
    window.location.href = 'index.html?' + paramsIndex;
};
firstPageBtn.addEventListener("click", firstPage);
// Show or hidde fordward btn and backward btn
var showHiddeBtn = function (results, offset, limit) {
    if (results === offset + limit) {
        nextBtn.classList.add("hidden");
        lastPageBtn.classList.add("hidden");
    }
    else {
        nextBtn.classList.remove("hidden");
        lastPageBtn.classList.remove("hidden");
    }
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    }
    else {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
};
// **************************************
// *** Initial function of index.html ***
// **************************************
// const initIndex = () => {
// }
// initIndex()
