// ******************
// *** SEARCH BOX ***
// ******************
var baseUrl = "https://gateway.marvel.com:443/v1/public/";
var apiKey = "06e295e3c238e43e31ef140c424be15b";
var hash = "1eee8ff490d4a973b65d6f613e9569ff";
var typeFilter = document.getElementById("type-filter");
var limit = 20;
var offset = 0;
var searchInput = document.getElementById("search-input");
var results = document.getElementById("results");
var older = document.getElementById("older");
var newer = document.getElementById("newer");
var sortFilter = document.getElementById("sort-filter");
var searchBtn = document.getElementById("search-button");
var marvelCards = document.getElementById("marvel-cards");
var typeUrl = typeFilter.value;
var contentHTML = "";
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
var refreshTablesByTypes = function (e) {
    if (typeFilter.value === "comics") {
        refreshCardsTable(offset, "comics");
    }
    else if (typeFilter.value === "characters") {
        refreshCardsTable(offset, "characters");
    }
};
typeFilter.addEventListener("change", refreshTablesByTypes);
var init = function () {
    refreshCardsTable(offset, typeFilter.value);
};
init();
// case "a-z":
//       operations.sort((a, b) => {
//         if (a.description > b.description) { return 1 }
//         if (a.description < b.description) { return -1 }
//         a must be equal to b
//         return 0;
// const sortByAz = (array) => {
//     array.sort((a, b) => {
//         if (a.title > b.title) { return 1 };
//         if (a.title < b.title) { return -1 };
//         return 0
//     })
// }
// *** FILTERS ***
// const filterByType = () => {
//     typeFilter.value === "comics"
//         older.classList.remove("hidden");
//         newer.classList.remove("hidden");
//         getDataComics.render(offset);
//     }
// let contentHTML = "";
// const search = (input,type,filter) => {
//     let object = typeFilter.value;
//     const urlAPI = `${baseUrl}${object}?ts=1&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
//     // COMIC FILTERS
//     fetch(urlAPI)
//     .then(res => res.json())
//     .then((json) => {
//         const comics:Comic[] = json.data.results;
//         // console.log(comics,characters)
//         // *** FILTERS ***
//         const filterByType = () => {
//             typeFilter.value === "comics"
//                 older.classList.remove("hidden");
//                 newer.classList.remove("hidden");
//                 getDataComics.render(offset);
//             }
//             typeFilter.addEventListener("change", filterByType);
// }
// orden : {
//     az: () => {},
//     za: () => {},
//     newer: () => {},
//     older: () => {},
// }
// fetch(urlAPI)
// .then(res => res.json())
// .then((json) => {
//     const characters:Comic[] = json.data.results;
//     // console.log(comics,characters)
// })
// // // *** INPUT ***
// const comicsByWord:Comic[] = [];
// const filterByWord = () => {
//     let inputLower = searchInput.value.toLowerCase();
//     // console.log(input)
//     let input = inputLower.split(' ');
//     for (let word of input) {
//         for (let comic of comics) {
//             let comicTitle = comic.title.toLowerCase();
//             if (comicTitle.includes(word)) {
//                 comicsByWord.push(comic)
//             }
//         }
//     }
//     // console.log(comicsByWord)
//     refreshBySearch(comicsByWord)
//     // return comicsByWord
// }
// searchBtn.addEventListener("click",filterByWord);
