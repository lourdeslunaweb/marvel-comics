// ***********************************
// *** Display cards in index.html ***
// ***********************************

// *** Params Index ***
const paramsIndex = new URLSearchParams(window.location.search);

// *** Set variables ***
const baseUrl: string = "https://gateway.marvel.com:443/v1/public/";
const apiKey: string = "06e295e3c238e43e31ef140c424be15b";
const hash: string = "1eee8ff490d4a973b65d6f613e9569ff";
const limit = 20;
let offset = limit * (Number(paramsIndex.get('page')));
// let typeUrl = paramsIndex.get('type');
let contentHTML = "";
let totalPages;

// *** Nodes ***
const typeFilter = document.getElementById("type-filter");
// const typeUrl = typeFilter.value;
const searchInput = document.getElementById("search-input");
const results = document.getElementById("results");
const older = document.getElementById("older");
const newer = document.getElementById("newer");
const sortFilter = document.getElementById("sort-filter");
const searchBtn = document.getElementById("search-button");
const marvelCards = document.getElementById("marvel-cards");
const firstPageBtn = document.getElementById("first-page-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const lastPageBtn = document.getElementById("last-page-btn");
const anchorLastPageBtn = document.getElementById("anchor-last-page-btn");

// *** Fetch Function of Index ***
const fetchFunction = (offset: number, type: string) => {
    contentHTML = "";
    const urlAPI = `${baseUrl}${type}?ts=1&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
            const totalResults = json.data.total ? json.data.total : 0;
            const cards = json.data.results;
            displayTotalResults(totalResults, results);
            lastPage(totalResults, limit);
            showHiddeBackwardBtn(totalResults, offset, limit);
            displayCards(cards, type)
        });
}

// *** Display Marvel Cards ***
const displayCards = (cards: Card[], type: string) => {
    for (const card of cards) {
        let thumbPath = card.thumbnail.path ? card.thumbnail.path : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953"
        let thumbExtension = card.thumbnail.extension ? card.thumbnail.extension : "jpg"
        let cardTitle = card.title ? card.title : card.name;
        let hrefData = `./data.html?type=${type}&id=${card.id}`;
        contentHTML += `
    <div class="card-div">
        <a href="${hrefData}">
            <img src="${thumbPath}.${thumbExtension}" alt="${cardTitle}"  class="card-home">
        </a>
        <h3>${cardTitle}</h3>
    </div>`;
    }
    marvelCards.innerHTML = contentHTML;
}

// *** Display Totals Results of fetch ***
const displayTotalResults = (result: number, node) => {
    node.innerText = `${result} resultados`;
}


// *** Refresh cards table by types (comics or characters) ***
const refreshTablesByTypes = () => {
    if (typeFilter.value === "comics") {
        fetchFunction(offset, "comics")
    } else if (typeFilter.value === "characters") {
        fetchFunction(offset, "characters")
    }
}
typeFilter.addEventListener("change", refreshTablesByTypes);

// **********************************
// *** Pagination Btn in index.html***
// **********************************

const nextPage = () => {
    let page = Number(paramsIndex.get('page'));
    if (!page) {
        paramsIndex.set('page', '1')
    } else {
        paramsIndex.set('page', (page + 1).toString())
    }
    window.location.href = 'index.html?' + paramsIndex;
}
nextBtn.addEventListener("click", nextPage);

const lastPage = (result: number, limit: number) => {
    totalPages = (Math.ceil(result / limit)) - 1;
    anchorLastPageBtn.setAttribute("href", `./index.html?page=${totalPages}`);
}

const prevPage = () => {
    let page = Number(paramsIndex.get('page'));
    if (!page) {
        paramsIndex.set('page', '1')
    } else {
        paramsIndex.set('page', (page - 1).toString())
    }
    window.location.href = 'index.html?' + paramsIndex;
}
prevBtn.addEventListener("click", prevPage);

const firstPage = () => {
    paramsIndex.set('page', (0).toString());
    window.location.href = 'index.html?' + paramsIndex;
}
firstPageBtn.addEventListener("click", firstPage);

// *** Show or hidde Barckward Btn (firstPageBtn and prevBtn) ***
const showHiddeBackwardBtn = (results: number, offset: number, limit: number) => {
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    } else {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
}

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

const initIndex = () => {
    // let page = Number(paramsIndex.get('page'));
    // let typeAux = paramsIndex.get('type');
    // if (!typeAux) {
    //     paramsIndex.set('type', typeFilter.value)
    // }
    // if (!page) {
    //     paramsIndex.set('page', '0')
    // }
    // window.location.href = 'index.html?' + paramsIndex;
    fetchFunction(offset, typeFilter.value)
}
initIndex()



