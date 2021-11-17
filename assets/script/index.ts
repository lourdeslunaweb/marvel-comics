// ***********************************
// *** Display cards in index.html ***
// ***********************************

// *** Params ***
const params = new URLSearchParams(window.location.search);

// *** Set variables ***
const baseUrl: string = "https://gateway.marvel.com:443/v1/public/";
const apiKey: string = "06e295e3c238e43e31ef140c424be15b";
const hash: string = "1eee8ff490d4a973b65d6f613e9569ff";
const limit = 20;
let offset = limit * (Number(params.get('page')));
let contentHTML = "";


// *** Nodes ***
const searchForm = document.getElementById("search-form");
const typeFilter = document.getElementById("type-filter");
const newerItem = document.getElementById("newer");
const olderItem = document.getElementById("older");
const searchInput = document.getElementById("search-input");
const results = document.getElementById("results");
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
    let sort = params.get('orderBy') ? params.get('orderBy') : 'title';
    contentHTML = "";
    let urlInit = `${baseUrl}${type}?ts=1&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=${sort}`;
    let text: string;
    let textLast: string;
    if (type === "comics") {
        text = params.get('titleStartsWith')
        if (text) {
            textLast = `&titleStartsWith=${text}`
            urlInit += `&titleStartsWith=${text}`
        }
    } else if (type === "characters") {
        text = params.get('nameStartsWith')
        if (text) {
            textLast = `&nameStartsWith=${text}`
            urlInit += `&nameStartsWith=${text}`
        }
    }
    let textLastPage = textLast ? textLast : ''
    let urlAPI = urlInit;
    fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
            const totalResults: number = json.data.total ? json.data.total : 0;
            const cards = json.data.results;
            const lastPageNumber: number = (Math.ceil(totalResults / limit)) - 1;
            displayTotalResults(totalResults, results);
            lastPage(lastPageNumber, type, sort, textLastPage);
            showHiddeBackwardBtn(offset);
            showHiddeFordwardBtn(lastPageNumber);
            displayCards(cards, type)
        });
}

// *** Display Marvel Cards ***
const displayCards = (cards: Card[], type: string) => {
    for (const card of cards) {
        let thumbPath = card.thumbnail.path ? card.thumbnail.path : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953"
        let thumbExtension = card.thumbnail.extension ? card.thumbnail.extension : "jpg"
        let cardTitle = card.title ? card.title : card.name;
        let hrefData = `./data.html?type=${type}&id=${card.id}&page=0`;
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
const displayTotalResults = (result: number, node: HTMLElement) => {
    if(result !== null){
    node.innerText =  `${result} resultados`}
}

// ***********************************
// *** Pagination Btn in index.html***
// ***********************************

const nextPage = () => {
    let page = Number(params.get('page'));
    if (!page) {
        params.set('page', '1')
    } else {
        params.set('page', (page + 1).toString())
    }
    window.location.href = 'index.html?' + params;
}
if (nextBtn)
    nextBtn.addEventListener("click", nextPage);

const lastPage = (page: number, type: string, sort: string, text: string) => {
    anchorLastPageBtn.setAttribute("href", `./index.html?page=${page}&type=${type}&orderBy=${sort}${text}`);
}

const prevPage = () => {
    let page = Number(params.get('page'));
    if (!page) {
        params.set('page', '1')
    } else {
        params.set('page', (page - 1).toString())
    }
    window.location.href = 'index.html?' + params;
}
if (prevBtn)
    prevBtn.addEventListener("click", prevPage);

const firstPage = () => {
    params.set('page', (0).toString());
    window.location.href = 'index.html?' + params;
}
if (firstPageBtn)
    firstPageBtn.addEventListener("click", firstPage);

// *** Show or hidde Barckward Btn (firstPageBtn and prevBtn) ***
const showHiddeBackwardBtn = (offset: number) => {
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    } else {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
}

// *** Show or Hidde Forward Btn (lastPageBtn and nextBtn) ***
const showHiddeFordwardBtn = (page: number) => {
    const pageNumFromParam: number = Number(params.get('page'));
    if (pageNumFromParam === page) {
        nextBtn.classList.add("hidden");
        lastPageBtn.classList.add("hidden");
    } else {
        nextBtn.classList.remove("hidden");
        lastPageBtn.classList.remove("hidden");
    }
}

// ***************
// *** Filters ***
// ***************

// *** Update order filter by types (comics or characters) ***
const updateOrderFilter = (e) => {
    if (typeFilter.value === "characters") {
        newerItem.classList.add("hidden")
        olderItem.classList.add("hidden")
    } else {
        newerItem.classList.remove("hidden")
        olderItem.classList.remove("hidden")
    }
}
typeFilter.addEventListener("change", updateOrderFilter);

// *** Slugify helper ***
const slugify = (text: { toString: () => string; }) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// *** Set filters in params ***
const filters = (e) => {
    e.preventDefault()
    const form = e.target;
    // delete page
    params.delete('page');
    // delete id from data.html
    if (params.get('id')) {
        params.delete('id')
    }
    // deleted search before
    if (params.get('nameStartsWith')) {
        params.delete('nameStartsWith')
    }
    if (params.get('titleStartsWith')) {
        params.delete('titleStartsWith')
    }
    // type
    const searchType = form.type_filter.value;
    params.set('type', searchType);
    // text
    const searchText = form.text.value;
    const searchTextSlugify = slugify(searchText);
    if (searchText !== "") {
        if (searchType === "comics") {
            params.set('titleStartsWith', searchTextSlugify);
        } else if (searchType === "characters") {
            params.set('nameStartsWith', searchTextSlugify);
        }
    }
    // sort
    const searchSort = form.sort_filter.value;
    if (searchType === "comics") {
        if (searchSort === "a-z") {
            params.set('orderBy', 'title');
        } else if (searchSort === "z-a") {
            params.set('orderBy', '-title');
        } else if (searchSort === "mas-nuevos") {
            params.set('orderBy', '-focDate');
        } else if (searchSort === "mas-viejos") {
            params.set('orderBy', 'focDate');
        }
    } else if (searchType === "characters") {
        if (searchSort === "a-z") {
            params.set('orderBy', 'name');
        } else if (searchSort === "z-a") {
            params.set('orderBy', '-name');
        }
    }
    window.location.href = 'index.html?' + params;
}
if (searchForm)
    searchForm.addEventListener("submit", filters)


// **************************************
// *** Initial function of index.html ***
// **************************************

const initIndex = () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'comics';
    fetchFunction(offset, type)
}
initIndex()



