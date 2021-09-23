// ***********************************
// *** Display cards in index.html ***
// ***********************************

// Set variables
const baseUrl: string = "https://gateway.marvel.com:443/v1/public/";
const apiKey: string = "06e295e3c238e43e31ef140c424be15b";
const hash: string = "1eee8ff490d4a973b65d6f613e9569ff";
const limit = 20;
let offset = 0;
let contentHTML = "";

// Nodes
const typeFilter = document.getElementById("type-filter");
const typeUrl = typeFilter.value;
const searchInput = document.getElementById("search-input");
const results = document.getElementById("results");
const older = document.getElementById("older");
const newer = document.getElementById("newer");
const sortFilter = document.getElementById("sort-filter");
const searchBtn = document.getElementById("search-button");
const marvelCards = document.getElementById("marvel-cards");


// Refresh cards table function
const refreshCardsTable = (offset: number, type: string) => {
    contentHTML ="";
    const urlAPI = `${baseUrl}${type}?ts=1&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
            const totalResults = json.data.total ? json.data.total : "No hay resultados";
            results.innerText = `${totalResults} resultados`;
            const cards = json.data.results;
            for (const card of cards) {
                let thumb = card.thumbnail ? card.thumbnail : "";
                let cardTitle = card.title ? card.title : card.name;
                let hrefData = `./data.html?type=${type}&id=${card.id}`;
                contentHTML += `
            <div class="card-div">
                <a href="${hrefData}">
                    <img src="${thumb.path}.${thumb.extension}" alt="${cardTitle}"  class="card-home">
                </a>
                <h3>${cardTitle}</h3>
            </div>`;
            }
            marvelCards.innerHTML = contentHTML;
        });
}

// Refresh cards table by types (comics or characters)
const refreshTablesByTypes = (e) => {
    if (typeFilter.value === "comics") {
        refreshCardsTable(offset, "comics")
    } else if (typeFilter.value === "characters") {
        refreshCardsTable(offset, "characters")
    }
}
typeFilter.addEventListener("change", refreshTablesByTypes);

// Initial function of index.html
const initIndex = () =>{
    refreshCardsTable(offset, typeFilter.value);
}
initIndex()



