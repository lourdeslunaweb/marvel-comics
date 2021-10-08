// ***********************************
// *** Display cards in index.html ***
// ***********************************
// *** Params ***
var params = new URLSearchParams(window.location.search);
// *** Set variables ***
var baseUrl = "https://gateway.marvel.com:443/v1/public/";
var apiKey = "06e295e3c238e43e31ef140c424be15b";
var hash = "1eee8ff490d4a973b65d6f613e9569ff";
var limit = 20;
var offset = limit * (Number(params.get('page')));
var contentHTML = "";
// *** Nodes ***
var searchForm = document.getElementById("search-form");
var typeFilter = document.getElementById("type-filter");
var newerItem = document.getElementById("newer");
var olderItem = document.getElementById("older");
var searchInput = document.getElementById("search-input");
var results = document.getElementById("results");
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
    var sort = params.get('orderBy') ? params.get('orderBy') : 'title';
    contentHTML = "";
    var urlInit = "" + baseUrl + type + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&limit=" + limit + "&offset=" + offset + "&orderBy=" + sort;
    var text;
    var textLast;
    if (type === "comics") {
        text = params.get('titleStartsWith');
        if (text) {
            textLast = "&titleStartsWith=" + text;
            urlInit += "&titleStartsWith=" + text;
        }
    }
    else if (type === "characters") {
        text = params.get('nameStartsWith');
        if (text) {
            textLast = "&nameStartsWith=" + text;
            urlInit += "&nameStartsWith=" + text;
        }
    }
    var textLastPage = textLast ? textLast : '';
    var urlAPI = urlInit;
    fetch(urlAPI)
        .then(function (res) { return res.json(); })
        .then(function (json) {
        var totalResults = json.data.total ? json.data.total : 0;
        var cards = json.data.results;
        var lastPageNumber = (Math.ceil(totalResults / limit)) - 1;
        displayTotalResults(totalResults, results);
        lastPage(lastPageNumber, type, sort, textLastPage);
        showHiddeBackwardBtn(offset);
        showHiddeFordwardBtn(lastPageNumber);
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
        var hrefData = "./data.html?type=" + type + "&id=" + card.id + "&page=0";
        contentHTML += "\n    <div class=\"card-div\">\n        <a href=\"" + hrefData + "\">\n            <img src=\"" + thumbPath + "." + thumbExtension + "\" alt=\"" + cardTitle + "\"  class=\"card-home\">\n        </a>\n        <h3>" + cardTitle + "</h3>\n    </div>";
    }
    marvelCards.innerHTML = contentHTML;
};
// *** Display Totals Results of fetch ***
var displayTotalResults = function (result, node) {
    node.innerText = result + " resultados";
};
// ***********************************
// *** Pagination Btn in index.html***
// ***********************************
var nextPage = function () {
    var page = Number(params.get('page'));
    if (!page) {
        params.set('page', '1');
    }
    else {
        params.set('page', (page + 1).toString());
    }
    window.location.href = 'index.html?' + params;
};
if (nextBtn)
    nextBtn.addEventListener("click", nextPage);
var lastPage = function (page, type, sort, text) {
    anchorLastPageBtn.setAttribute("href", "./index.html?page=" + page + "&type=" + type + "&orderBy=" + sort + text);
};
var prevPage = function () {
    var page = Number(params.get('page'));
    if (!page) {
        params.set('page', '1');
    }
    else {
        params.set('page', (page - 1).toString());
    }
    window.location.href = 'index.html?' + params;
};
if (prevBtn)
    prevBtn.addEventListener("click", prevPage);
var firstPage = function () {
    params.set('page', (0).toString());
    window.location.href = 'index.html?' + params;
};
if (firstPageBtn)
    firstPageBtn.addEventListener("click", firstPage);
// *** Show or hidde Barckward Btn (firstPageBtn and prevBtn) ***
var showHiddeBackwardBtn = function (offset) {
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
var showHiddeFordwardBtn = function (page) {
    var pageNumFromParam = Number(params.get('page'));
    if (pageNumFromParam === page) {
        nextBtn.classList.add("hidden");
        lastPageBtn.classList.add("hidden");
    }
    else {
        nextBtn.classList.remove("hidden");
        lastPageBtn.classList.remove("hidden");
    }
};
// ***************
// *** Filters ***
// ***************
// *** Update order filter by types (comics or characters) ***
var updateOrderFilter = function (e) {
    if (typeFilter.value === "characters") {
        newerItem.classList.add("hidden");
        olderItem.classList.add("hidden");
    }
    else {
        newerItem.classList.remove("hidden");
        olderItem.classList.remove("hidden");
    }
};
typeFilter.addEventListener("change", updateOrderFilter);
// *** Slugify helper ***
var slugify = function (text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};
// *** Set filters in params ***
var filters = function (e) {
    e.preventDefault();
    var form = e.target;
    // delete page
    params["delete"]('page');
    // delete id from data.html
    if (params.get('id')) {
        params["delete"]('id');
    }
    // deleted search before
    if (params.get('nameStartsWith')) {
        params["delete"]('nameStartsWith');
    }
    if (params.get('titleStartsWith')) {
        params["delete"]('titleStartsWith');
    }
    // type
    var searchType = form.type_filter.value;
    params.set('type', searchType);
    // text
    var searchText = form.text.value;
    var searchTextSlugify = slugify(searchText);
    if (searchText !== "") {
        if (searchType === "comics") {
            params.set('titleStartsWith', searchTextSlugify);
        }
        else if (searchType === "characters") {
            params.set('nameStartsWith', searchTextSlugify);
        }
    }
    // sort
    var searchSort = form.sort_filter.value;
    if (searchType === "comics") {
        if (searchSort === "a-z") {
            params.set('orderBy', 'title');
        }
        else if (searchSort === "z-a") {
            params.set('orderBy', '-title');
        }
        else if (searchSort === "mas-nuevos") {
            params.set('orderBy', '-focDate');
        }
        else if (searchSort === "mas-viejos") {
            params.set('orderBy', 'focDate');
        }
    }
    else if (searchType === "characters") {
        if (searchSort === "a-z") {
            params.set('orderBy', 'name');
        }
        else if (searchSort === "z-a") {
            params.set('orderBy', '-name');
        }
    }
    window.location.href = 'index.html?' + params;
};
if (searchForm)
    searchForm.addEventListener("submit", filters);
// **************************************
// *** Initial function of index.html ***
// **************************************
var initIndex = function () {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type') || 'comics';
    fetchFunction(offset, type);
};
initIndex();
