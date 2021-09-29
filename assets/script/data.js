// *******************************************
// *** Display selected card in data.html ***
// *******************************************
//Params Data
// const params = new URLSearchParams(window.location.search);
// console.log(params.toString());
//Nodes
var cardData = document.getElementById("card-data");
var subTitleBelow = document.getElementById("subtitle-below");
var resultsBelow = document.getElementById("results-below");
var cardsBelowSection = document.getElementById("cards-below-section");
var keypadBelow = document.getElementById("keypad-below");
var firstPageBtnBelow = document.getElementById("first-page-btn-below");
var prevBtnBelow = document.getElementById("prev-btn-below");
var nextBtnBelow = document.getElementById("next-btn-below");
var lastPageBtnBelow = document.getElementById("last-page-btn-below");
var anchorLastPageBtnBelow = document.getElementById("anchor-last-page-btn-below");
var cardHTML;
var cardsBelowHTML;
// *** Fetch for selected Card ***
var displaySelectedCard = function (type, id, page) {
    cardHTML = "";
    var urlAPI = "" + baseUrl + type + "/" + id + "?apikey=" + apiKey + "&hash=" + hash;
    fetch(urlAPI)
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var selectedCard = json.data.results[0];
        var cardTitle = selectedCard.title ? selectedCard.title : selectedCard.name;
        var thumb = selectedCard.thumbnail;
        var cardDescription = selectedCard.description ? selectedCard.description : "Description not available";
        var auxDate;
        var cardDate;
        if (selectedCard.dates) {
            auxDate = selectedCard.dates[0].date;
            cardDate = new Date(auxDate).toLocaleDateString();
        }
        else {
            auxDate = "";
            cardDate = "";
        }
        var guionist = [];
        var comicCreators;
        if (selectedCard.creators) {
            for (var prop in selectedCard.creators.items) {
                guionist.push(selectedCard.creators.items[prop].name);
            }
            comicCreators = guionist;
        }
        else {
            comicCreators = "";
        }
        var infoURLAux;
        if (selectedCard.characters) {
            infoURLAux = selectedCard.characters.collectionURI;
        }
        else if (selectedCard.comics) {
            infoURLAux = selectedCard.comics.collectionURI;
        }
        var typeBelow;
        if (type === "comics") {
            typeBelow = "characters";
        }
        else if (type === "characters") {
            typeBelow = "comics";
        }
        var infoURL = insertStr(infoURLAux, "s", 4);
        fetchCardsBelow(infoURL, typeBelow, page, id);
        cardHTML = "\n            <div class=\"img-data\">\n            <img src=\"" + thumb.path + "." + thumb.extension + "\" alt=\"ComicImg/HeroImg\">\n        </div>\n        <div class=\"text-data\">\n            <h3 class=\"item-data\">" + cardTitle + "</h3>\n            <div class=\"item-data\">\n                <h4>Publicado:</h4>\n                <p>" + cardDate + "</p>\n            </div>\n            <div class=\"item-data\" id=\"creator-data\">\n                <h4>Guionistas:</h4>\n                <p>" + comicCreators + "</p>\n            </div>\n            <div class=\"item-data\" id=\"description\">\n                <h4>Descripci\u00F3n:</h4>\n                <p>" + cardDescription + "</p>\n            </div>\n        </div>";
        cardData.innerHTML = cardHTML;
    });
};
// Fetch for infoURL
var fetchCardsBelow = function (url, type, page, id) {
    cardsBelowHTML = "";
    var limit = 20;
    var subTitle;
    var offset;
    var opType;
    if (type === "characters") {
        subTitle = "Personajes";
        opType = "comics";
    }
    else if (type === "comics") {
        subTitle = "Comics";
        opType = "characters";
    }
    subTitleBelow.innerText = subTitle;
    offset = limit * page;
    var urlAPI = url + "?apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset;
    fetch(urlAPI)
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var cardsBelowData = json.data.results;
        var totalBelow = json.data.total ? json.data.total : 0;
        var lastPageNumberBelow = (Math.ceil(totalBelow / limit)) - 1;
        showHiddeKeypadBelow(totalBelow);
        displayTotalResults(totalBelow, resultsBelow);
        showHiddeBackwardBtnBelow(offset);
        showHiddeFordwardBtnBelow(lastPageNumberBelow);
        lastPageBelow(opType, id, lastPageNumberBelow);
        if (cardsBelowData.length > 0) {
            for (var _i = 0, cardsBelowData_1 = cardsBelowData; _i < cardsBelowData_1.length; _i++) {
                var card = cardsBelowData_1[_i];
                var cardTitle = card.title ? card.title : card.name;
                var thumb = card.thumbnail ? card.thumbnail : "";
                var hrefData = "./data.html?type=" + type + "&id=" + card.id + "&page=0";
                cardsBelowHTML += "\n                    <div class=\"card-div-below\">\n                    <a href= \"" + hrefData + "\">\n                        <img src= \"" + thumb.path + "." + thumb.extension + "\" alt=\"" + cardTitle + "\" class=\"card-below\">\n                    </a>\n                    <h4>" + cardTitle + "</h4>\n                </div>";
            }
            cardsBelowSection.innerHTML = cardsBelowHTML;
        }
    });
};
// Auxiliar function to insert "s" in infoURLAux
var insertStr = function (text, strToInsert, position) {
    return text.slice(0, position) + strToInsert + text.slice(position);
};
// ***********************************
// *** Pagination Btn in data.html****
// ***********************************
var showHiddeKeypadBelow = function (total) {
    if (total < 20) {
        keypadBelow.classList.add("hidden");
    }
};
var nextPageBelow = function () {
    var page = Number(params.get('page'));
    params.set('page', (page + 1).toString());
    window.location.href = 'data.html?' + params;
};
// if(nextBtnBelow)
nextBtnBelow.addEventListener("click", nextPageBelow);
var lastPageBelow = function (type, id, page) {
    anchorLastPageBtnBelow.setAttribute("href", "./data.html?type=" + type + "&id=" + id + "&page=" + page);
};
var prevPageBelow = function () {
    var page = Number(params.get('page'));
    params.set('page', (page - 1).toString());
    window.location.href = 'data.html?' + params;
};
// if(prevBtnBelow)
prevBtnBelow.addEventListener("click", prevPageBelow);
var firstPageBelow = function () {
    params.set('page', (0).toString());
    window.location.href = 'data.html?' + params;
};
// if(firstPageBtnBelow)
firstPageBtnBelow.addEventListener("click", firstPageBelow);
// *** Show or hidde Barckward Btn Below (firstPageBtn and prevBtn) ***
var showHiddeBackwardBtnBelow = function (offset) {
    if (offset === 0) {
        prevBtnBelow.classList.add("hidden");
        firstPageBtnBelow.classList.add("hidden");
    }
    else {
        prevBtnBelow.classList.remove("hidden");
        firstPageBtnBelow.classList.remove("hidden");
    }
};
// *** Show or Hidde Forward Btn Below (lastPageBtn and nextBtn) ***
var showHiddeFordwardBtnBelow = function (page) {
    var pageNumFromParam = Number(params.get('page'));
    if (pageNumFromParam === page) {
        nextBtnBelow.classList.add("hidden");
        lastPageBtnBelow.classList.add("hidden");
    }
    else {
        nextBtnBelow.classList.remove("hidden");
        lastPageBtnBelow.classList.remove("hidden");
    }
};
// **************************************
// *** Initial function of index.html ***
// **************************************
var initData = function () {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    var id = params.get('id');
    var page = Number(params.get('page'));
    displaySelectedCard(type, id, page);
};
initData();
//-------------GO BACK PARAMETERS------------------
// const goBack= document.createElement('a');
// goBack.innerHTML="Volver";
// goBack.setAttribute('href', "javascript:history.back()");
// goBack.classList.add('go-back');  
