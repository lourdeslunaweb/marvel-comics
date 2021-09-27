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
let contentHTML = "";


// *** Nodes ***
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
    let sort = paramsIndex.get('orderBy') ? paramsIndex.get('orderBy') : 'title';
    contentHTML = "";
    let urlInit = `${baseUrl}${type}?ts=1&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=${sort}`;
    let text;
    let textLast;
    if (type === "comics") {
        text = paramsIndex.get('titleStartsWith')
        if (text) {
            textLast = `&titleStartsWith=${text}`
            urlInit += `&titleStartsWith=${text}`
        }
    } else if (type === "characters") {
        text = paramsIndex.get('nameStartsWith')
        if (text) {
            textLast =`&nameStartsWith=${text}`
            urlInit += `&nameStartsWith=${text}`
        }
    }
    let textLastPage = textLast ? textLast : ''
    let urlAPI = urlInit;
    console.log(urlAPI);
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

// ***********************************
// *** Pagination Btn in index.html***
// ***********************************

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

const lastPage = (page: number, type: string, sort: string, text: string) => {
    anchorLastPageBtn.setAttribute("href", `./index.html?page=${page}&type=${type}&orderBy=${sort}${text}`);
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
    const pageNumFromParam: number = Number(paramsIndex.get('page'));
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
const updateOrderFilter = () => {
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
const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// *** Set filters in params ***
const filters = () => {
    // page
    paramsIndex.delete('page');
    // type
    const searchType = typeFilter.value;
    paramsIndex.set('type', searchType);
    // text
    const searchText = searchInput.value;
    const searchTextSlugify = slugify(searchText);
    if (searchType === "comics") {
        paramsIndex.set('titleStartsWith', searchTextSlugify);
    } else if (searchType === "characters") {
        paramsIndex.set('nameStartsWith', searchTextSlugify);
    } else { }
    // sort
    const searchSort = sortFilter.value;
    if (searchType === "comics") {
        if (searchSort === "a-z") {
            paramsIndex.set('orderBy', 'title');
        } else if (searchSort === "z-a") {
            paramsIndex.set('orderBy', '-title');
        } else if (searchSort === "mas-nuevos") {
            paramsIndex.set('orderBy', '-focDate');
        } else if (searchSort === "mas-viejos") {
            paramsIndex.set('orderBy', 'focDate');
        }
    } else if (searchType === "characters") {
        if (searchSort === "a-z") {
            paramsIndex.set('orderBy', 'name');
        } else if (searchSort === "z-a") {
            paramsIndex.set('orderBy', '-name');
        }
    }
    window.location.href = 'index.html?' + paramsIndex;
}
searchBtn.addEventListener("click", filters)


// **************************************
// *** Initial function of index.html ***
// **************************************

const initIndex = () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'comics';
    fetchFunction(offset, type)
}
initIndex()



