// ***********************************
// *** Display cards in index.html ***
// ***********************************
// *** Params Index ***
var paramsIndex = new URLSearchParams(window.location.search);
// *** Set variables ***
var baseUrl = "https://gateway.marvel.com:443/v1/public/";
var apiKey = "06e295e3c238e43e31ef140c424be15b";
var hash = "1eee8ff490d4a973b65d6f613e9569ff";
var limit = 20;
var offset = limit * (Number(paramsIndex.get('page')));
// let typeUrl = paramsIndex.get('type');
var contentHTML = "";
var totalPages;
// *** Nodes ***
var typeFilter = document.getElementById("type-filter");
// const typeUrl = typeFilter.value;
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
// *** Fetch Function of Index ***
var fetchFunction = function (offset, type) {
    contentHTML = "";
    var urlAPI = "" + baseUrl + type + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&limit=" + limit + "&offset=" + offset;
    fetch(urlAPI)
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var totalResults = json.data.total ? json.data.total : 0;
        var cards = json.data.results;
        displayTotalResults(totalResults, results);
        lastPage(totalResults, limit);
        showHiddeBackwardBtn(totalResults, offset, limit);
        displayCards(cards, type);
    });
};
// *** Display Marvel Cards ***
var displayCards = function (cards, type) {
    for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
        var card = cards_1[_i];
        var thumbPath = card.thumbnail.path ? card.thumbnail.path : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953";
        var thumbExtension = card.thumbnail.extension ? card.thumbnail.extension : "jpg";
        var cardTitle = card.title ? card.title : card.name;
        var hrefData = "./data.html?type=" + type + "&id=" + card.id;
        contentHTML += "\n    <div class=\"card-div\">\n        <a href=\"" + hrefData + "\">\n            <img src=\"" + thumbPath + "." + thumbExtension + "\" alt=\"" + cardTitle + "\"  class=\"card-home\">\n        </a>\n        <h3>" + cardTitle + "</h3>\n    </div>";
    }
    marvelCards.innerHTML = contentHTML;
};
// *** Display Totals Results of fetch ***
var displayTotalResults = function (result, node) {
    node.innerText = result + " resultados";
};
// *** Refresh cards table by types (comics or characters) ***
var refreshTablesByTypes = function () {
    if (typeFilter.value === "comics") {
        fetchFunction(offset, "comics");
    }
    else if (typeFilter.value === "characters") {
        fetchFunction(offset, "characters");
    }
};
typeFilter.addEventListener("change", refreshTablesByTypes);
// **********************************
// *** Pagination Btn in index.html***
// **********************************
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
var lastPage = function (result, limit) {
    totalPages = (Math.ceil(result / limit)) - 1;
    anchorLastPageBtn.setAttribute("href", "./index.html?page=" + totalPages);
};
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
// *** Show or hidde Barckward Btn (firstPageBtn and prevBtn) ***
var showHiddeBackwardBtn = function (results, offset, limit) {
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    }
    else {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
};
// *** Show or Hidde Forward Btn (lastPageBtn and nextBtn) ***
// const showHiddeFordwardBtn = (finalPage) =>{
// getparam(page)
// if page === finalPage
//         if (results === offset + limit) {
//         nextBtn.classList.add("hidden");
//         lastPageBtn.classList.add("hidden");
//     } else {
//         nextBtn.classList.remove("hidden");
//         lastPageBtn.classList.remove("hidden");
//     }
// }
// **************************************
// *** Initial function of index.html ***
// **************************************
var initIndex = function () {
    // let page = Number(paramsIndex.get('page'));
    // let typeAux = paramsIndex.get('type');
    // if (!typeAux) {
    //     paramsIndex.set('type', typeFilter.value)
    // }
    // if (!page) {
    //     paramsIndex.set('page', '0')
    // }
    // window.location.href = 'index.html?' + paramsIndex;
    fetchFunction(offset, typeFilter.value);
};
initIndex();
