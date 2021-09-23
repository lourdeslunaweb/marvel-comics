// Your public key: 06e295e3c238e43e31ef140c424be15b
// Your private key: fb7c2312c6804213e326c91c5d7d6683169968ae
// hash : 953044dd6187bef3005abdd0e7cf0d93
var pageNumber = 1;
var pagination;
var nextBtn = document.getElementById("next-btn");
var prevBtn = document.getElementById("prev-btn");
var firstPageBtn = document.getElementById("first-page-btn");
// *** GET COMICS' DATA ***
var getDataComics = {
    render: function (offset) {
        var urlAPI = baseUrl + "comics?ts=1&apikey=" + apiKey + "&hash=" + hash + "&limit=" + limit + "&offset=" + offset;
        var contentHTML = "";
        fetch(urlAPI)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            console.log("COMICS", json);
            // Display results
            for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
                var comic = _a[_i];
                var thumb = comic.thumbnail ? comic.thumbnail : "";
                var comicTitle = comic.title ? comic.title : "";
                var comicDescription = comic.description ? comic.description : "";
                var comicDate = comic.dates[0].date ? comic.dates[0].date : "";
                var comicCharacters = comic.characters.collectionURI ? comic.characters.collectionURI : "";
                var guionist = [];
                for (var prop in comic.creators.items) {
                    guionist.push(comic.creators.items[prop].name);
                }
                var comicCreators = guionist ? guionist : "";
                var hrefData = "./data.html?title=" + comicTitle + "&ImgSrc=" + thumb.path + "." + thumb.extension + "&published=" + comicDate + "&description=" + comicDescription + "&characters=" + comicCharacters + "&creator=" + comicCreators;
                contentHTML += "\n                <div class=\"card-div\">\n                    <a href=\"" + hrefData + "\">\n                        <img src=\"" + thumb.path + "." + thumb.extension + "\" alt=\"" + comicTitle + "\"  class=\"card-home\">\n                    </a>\n                    <h3>" + comicTitle + "</h3>\n                </div>";
            }
            marvelCards.innerHTML = contentHTML;
            // Pagination
            var resNumber = json.data.total;
            results.innerText = resNumber + " resultados";
            var totalPages = Math.ceil(resNumber / limit);
        });
    }
};
// *** GET CHARACTERS' DATA ***
var getDataCharacter = {
    render: function () {
        var urlAPI = baseUrl + "characters?ts=1&apikey=" + apiKey + "&hash=" + hash + "&limit=" + limit + "&offset=" + offset;
        var contentHTML = "";
        fetch(urlAPI)
            .then(function (res) { return res.json(); })
            .then(function (json) {
            console.log(json);
            var resNumber = json.data.total;
            results.innerText = resNumber + " resultados";
            var filterByWord = function () { return console.log(searchInput.value); };
            searchBtn.addEventListener("click", filterByWord);
            for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
                var hero = _a[_i];
                var urlHero = hero.urls[0].url;
                var thumb = hero.thumbnail;
                contentHTML += "\n                <div class=\"card-div\">\n                    <a href=\"" + urlHero + "\" target=\"_blank\">\n                        <img src=\"" + thumb.path + "." + thumb.extension + "\" alt=\"" + hero.name + "\"  class=\"card-home\">\n                    </a>\n                    <h3>" + hero.name + "</h3>\n                </div>";
            }
            marvelCards.innerHTML = contentHTML;
            console.log("PERSONAJES", json);
        });
    }
};
// *** PAGINATION CONTROLS ***
var nextPage = function () {
    offset += 20;
    getDataComics.render(offset);
    if (offset >= 20) {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
};
nextBtn.addEventListener("click", nextPage);
var prevPage = function () {
    offset -= 20;
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    }
    else {
        getDataComics.render(offset);
    }
};
prevBtn.addEventListener("click", prevPage);
// ******************
// *** SEARCH BOX ***
// ******************
// *** REFRESH BY SEARCH FUNCTION ***
var refreshBySearch = function (array) {
    marvelCards.innerHTML = "";
    var contentHTML = "";
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var comic = array_1[_i];
        var thumb = comic.thumbnail;
        contentHTML += "\n        <div class=\"card-div\">\n        <a href=\"#\" target=\"_blank\">\n        <img src=\"" + thumb.path + "." + thumb.extension + "\" alt=\"" + comic.title + "\"  class=\"card-home\">\n        </a>\n        <h3>" + comic.title + "</h3>\n        </div>";
    }
    marvelCards.innerHTML = contentHTML;
};
// *** INIT FUNCTION ***
// const indexInit = () => {
//     getDataComics.render(offset);
//     prevBtn.classList.add("hidden");
//     firstPageBtn.classList.add("hidden");
// }
// indexInit();
