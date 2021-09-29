// *******************************************
// *** Display selected card in data.html ***
// *******************************************

//Params Data
// const params = new URLSearchParams(window.location.search);
// console.log(params.toString());

//Nodes
const cardData = document.getElementById("card-data");
const subTitleBelow = document.getElementById("subtitle-below");
const resultsBelow = document.getElementById("results-below");
const cardsBelowSection = document.getElementById("cards-below-section");
const keypadBelow = document.getElementById("keypad-below");
const firstPageBtnBelow = document.getElementById("first-page-btn-below");
const prevBtnBelow = document.getElementById("prev-btn-below");
const nextBtnBelow = document.getElementById("next-btn-below");
const lastPageBtnBelow = document.getElementById("last-page-btn-below");
const anchorLastPageBtnBelow = document.getElementById("anchor-last-page-btn-below")
let cardHTML;
let cardsBelowHTML;

// *** Fetch for selected Card ***
const displaySelectedCard = (type: string, id: string, page: number) => {
    cardHTML = "";
    const urlAPI = `${baseUrl}${type}/${id}?apikey=${apiKey}&hash=${hash}`;
    fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
            const selectedCard = json.data.results[0];
            const cardTitle = selectedCard.title ? selectedCard.title : selectedCard.name;
            const thumb = selectedCard.thumbnail;
            const cardDescription = selectedCard.description ? selectedCard.description : "Description not available";
            let auxDate;
            let cardDate;
            if (selectedCard.dates) {
                auxDate = selectedCard.dates[0].date;
                cardDate = new Date(auxDate).toLocaleDateString();
            } else {
                auxDate = "";
                cardDate = "";
            }
            let guionist = [];
            let comicCreators;
            if (selectedCard.creators) {
                for (const prop in selectedCard.creators.items) {
                    guionist.push(selectedCard.creators.items[prop].name)
                }
                comicCreators = guionist;
            } else {
                comicCreators = ""
            }
            let infoURLAux;
            if (selectedCard.characters) {
                infoURLAux = selectedCard.characters.collectionURI
            } else if (selectedCard.comics) {
                infoURLAux = selectedCard.comics.collectionURI
            }
            let typeBelow;
            if (type === "comics") {
                typeBelow = "characters"
            } else if (type === "characters") {
                typeBelow = "comics"
            }
            let infoURL = insertStr(infoURLAux, "s", 4)
            fetchCardsBelow(infoURL, typeBelow, page, id);
            cardHTML = `
            <div class="img-data">
            <img src="${thumb.path}.${thumb.extension}" alt="ComicImg/HeroImg">
        </div>
        <div class="text-data">
            <h3 class="item-data">${cardTitle}</h3>
            <div class="item-data">
                <h4>Publicado:</h4>
                <p>${cardDate}</p>
            </div>
            <div class="item-data" id="creator-data">
                <h4>Guionistas:</h4>
                <p>${comicCreators}</p>
            </div>
            <div class="item-data" id="description">
                <h4>Descripción:</h4>
                <p>${cardDescription}</p>
            </div>
        </div>`;
            cardData.innerHTML = cardHTML;
        });
}


// Fetch for infoURL
const fetchCardsBelow = (url: string, type: string, page: number, id: string) => {
    cardsBelowHTML = "";
    let limit = 20;
    let subTitle;
    let offset;
    let opType;
    if (type === "characters") {
        subTitle = "Personajes";
        opType = "comics"
    } else if (type === "comics") {
        subTitle = "Comics";
        opType = "characters"
    }
    subTitleBelow.innerText = subTitle;
    offset = limit * page;
    const urlAPI = `${url}?apikey=${apiKey}&hash=${hash}&offset=${offset}`;
    fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
            const cardsBelowData = json.data.results;
            const totalBelow: number = json.data.total ? json.data.total : 0;
            const lastPageNumberBelow: number = (Math.ceil(totalBelow / limit)) - 1;
            showHiddeKeypadBelow(totalBelow);
            displayTotalResults(totalBelow, resultsBelow);
            showHiddeBackwardBtnBelow(offset);
            showHiddeFordwardBtnBelow(lastPageNumberBelow);
            lastPageBelow(opType, id, lastPageNumberBelow);
            if (cardsBelowData.length > 0) {
                for (let card of cardsBelowData) {
                    let cardTitle = card.title ? card.title : card.name;
                    let thumb = card.thumbnail ? card.thumbnail : "";
                    let hrefData = `./data.html?type=${type}&id=${card.id}&page=0`;
                    cardsBelowHTML += `
                    <div class="card-div-below">
                    <a href= "${hrefData}">
                        <img src= "${thumb.path}.${thumb.extension}" alt="${cardTitle}" class="card-below">
                    </a>
                    <h4>${cardTitle}</h4>
                </div>`
                }
                cardsBelowSection.innerHTML = cardsBelowHTML;
            }
        });
}


// Auxiliar function to insert "s" in infoURLAux
const insertStr = (text: string, strToInsert: string, position: number) => {
    return text.slice(0, position) + strToInsert + text.slice(position);
}

// ***********************************
// *** Pagination Btn in data.html****
// ***********************************

const showHiddeKeypadBelow = (total: number) => {
    if (total < 20) {
        keypadBelow.classList.add("hidden")
    }
}

const nextPageBelow = () => {
    let page = Number(params.get('page'));
    params.set('page', (page + 1).toString())
    window.location.href = 'data.html?' + params;
}
// if(nextBtnBelow)
nextBtnBelow.addEventListener("click", nextPageBelow);

const lastPageBelow = (type: string, id: string, page: number, ) => {
    anchorLastPageBtnBelow.setAttribute("href", `./data.html?type=${type}&id=${id}&page=${page}`);
}

const prevPageBelow = () => {
    let page = Number(params.get('page'));
    params.set('page', (page - 1).toString())
    window.location.href = 'data.html?' + params;
}
// if(prevBtnBelow)
prevBtnBelow.addEventListener("click", prevPageBelow);

const firstPageBelow = () => {
    params.set('page', (0).toString());
    window.location.href = 'data.html?' + params;
}
// if(firstPageBtnBelow)
firstPageBtnBelow.addEventListener("click", firstPageBelow);

// *** Show or hidde Barckward Btn Below (firstPageBtn and prevBtn) ***
const showHiddeBackwardBtnBelow = (offset: number) => {
    if (offset === 0) {
        prevBtnBelow.classList.add("hidden");
        firstPageBtnBelow.classList.add("hidden");
    } else {
        prevBtnBelow.classList.remove("hidden");
        firstPageBtnBelow.classList.remove("hidden");
    }
}

// *** Show or Hidde Forward Btn Below (lastPageBtn and nextBtn) ***
const showHiddeFordwardBtnBelow = (page: number) => {
    const pageNumFromParam: number = Number(params.get('page'));
    if (pageNumFromParam === page) {
        nextBtnBelow.classList.add("hidden");
        lastPageBtnBelow.classList.add("hidden");
    } else {
        nextBtnBelow.classList.remove("hidden");
        lastPageBtnBelow.classList.remove("hidden");
    }
}

// **************************************
// *** Initial function of index.html ***
// **************************************

const initData = () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const id = params.get('id');
    const page = Number(params.get('page'));
    displaySelectedCard(type, id, page)
}
initData()


//-------------GO BACK PARAMETERS------------------
// const goBack= document.createElement('a');
// goBack.innerHTML="Volver";
// goBack.setAttribute('href', "javascript:history.back()");
// goBack.classList.add('go-back');  