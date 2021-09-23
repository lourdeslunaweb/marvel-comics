// *******************************************
// *** Display selected card in data.html ***
// *******************************************

//Params
const params = new URLSearchParams(window.location.search);
const typeData = params.get('type');
const cardId = params.get('id');

//Nodes
const cardData = document.getElementById("card-data");
const subTitleBelow = document.getElementById("subtitle-below");
const resultsBelow = document.getElementById("results-below");
const cardsBelowSection = document.getElementById("cards-below-section");
let cardHTML;
let cardsBelowHTML;

//Fetch for selected Card
const displaySelectedCard = (type: string, id: string) => {
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
            let infoURL;
            if (selectedCard.characters) {
                infoURL = selectedCard.characters.collectionURI
            } else if (selectedCard.comics) {
                infoURL = selectedCard.comics.collectionURI
            }
            let typeBelow;
            if (type === "comics") {
                typeBelow = "characters"
            } else if (type === "characters") {
                typeBelow = "comics"
            }
            console.log(infoURL);
            displayInfoBelow("https://gateway.marvel.com/v1/public/comics/1689/characters", typeBelow);
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
displaySelectedCard(typeData, cardId)

// Fetch for infoURL
const displayInfoBelow = (url: string, type: string) => {
    cardsBelowHTML = "";
    let subTitle;
    if (type === "characters") {
        subTitle = "Personajes"
    } else if (type === "comics") {
        subTitle = "Comics"
    }
    subTitleBelow.innerText = subTitle;
    const urlAPI = `${url}?apikey=${apiKey}&hash=${hash}`;
    fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
            const cardsBelowData = json.data.results;
            resultsBelow.innerText = `${cardsBelowData.length} resultados`;
            if (cardsBelowData.length > 0) {
                for (let card of cardsBelowData) {
                    let cardTitle = card.title ? card.title : card.name;
                    let thumb = card.thumbnail ? card.thumbnail : "";
                    let hrefData = `./data.html?type=${type}&id=${card.id}`;
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



