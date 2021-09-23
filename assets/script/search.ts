// ******************
// *** SEARCH BOX ***
// ******************
const baseUrl: string = "https://gateway.marvel.com:443/v1/public/";
const apiKey: string = "06e295e3c238e43e31ef140c424be15b";
const hash: string = "1eee8ff490d4a973b65d6f613e9569ff";
const typeFilter = document.getElementById("type-filter");
const limit = 20;
let offset = 0;
const searchInput = document.getElementById("search-input");
const results = document.getElementById("results");
const older = document.getElementById("older");
const newer = document.getElementById("newer");
const sortFilter = document.getElementById("sort-filter");
const searchBtn = document.getElementById("search-button");
const marvelCards = document.getElementById("marvel-cards");
const typeUrl = typeFilter.value;
let contentHTML = "";


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


const refreshTablesByTypes = (e) => {
    if (typeFilter.value === "comics") {
        refreshCardsTable(offset, "comics")
    } else if (typeFilter.value === "characters") {
        refreshCardsTable(offset, "characters")
    }
}

typeFilter.addEventListener("change", refreshTablesByTypes);

const init = () =>{
    refreshCardsTable(offset, typeFilter.value);

}
init()

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