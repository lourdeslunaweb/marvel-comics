// Your public key: 06e295e3c238e43e31ef140c424be15b
// Your private key: fb7c2312c6804213e326c91c5d7d6683169968ae
// hash : 953044dd6187bef3005abdd0e7cf0d93


let pageNumber: number = 1;

let pagination;



const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const firstPageBtn = document.getElementById("first-page-btn");


// *** GET COMICS' DATA ***
const getDataComics = {
    render: (offset) => {
        const urlAPI = `${baseUrl}comics?ts=1&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
        let contentHTML = "";
        fetch(urlAPI)
            .then(res => res.json())
            .then((json) => {
                console.log("COMICS", json)
                // Display results
                for (const comic of json.data.results) {
                    let thumb = comic.thumbnail ? comic.thumbnail : "";
                    let comicTitle = comic.title ? comic.title : "";
                    let comicDescription = comic.description ? comic.description : "";
                    let comicDate = comic.dates[0].date ? comic.dates[0].date : "";
                    let comicCharacters = comic.characters.collectionURI ? comic.characters.collectionURI : "";
                    let guionist = [];
                    for (const prop in comic.creators.items) {
                        guionist.push(comic.creators.items[prop].name)
                    }
                    let comicCreators = guionist ? guionist : "";
                    let hrefData = `./data.html?title=${comicTitle}&ImgSrc=${thumb.path}.${thumb.extension}&published=${comicDate}&description=${comicDescription}&characters=${comicCharacters}&creator=${comicCreators}`;
                    contentHTML += `
                <div class="card-div">
                    <a href="${hrefData}">
                        <img src="${thumb.path}.${thumb.extension}" alt="${comicTitle}"  class="card-home">
                    </a>
                    <h3>${comicTitle}</h3>
                </div>`;
            }
            marvelCards.innerHTML = contentHTML;
            
            // Pagination
            const resNumber = json.data.total;
            results.innerText = `${resNumber} resultados`;
            const totalPages = Math.ceil(resNumber / limit);
        })
    }
}


// *** GET CHARACTERS' DATA ***

const getDataCharacter = {
    render: () => {
        const urlAPI = `${baseUrl}characters?ts=1&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
        let contentHTML = "";
        fetch(urlAPI)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                const resNumber = json.data.total;
                results.innerText = `${resNumber} resultados`;

                const filterByWord = () => console.log(searchInput.value);
                searchBtn.addEventListener("click",filterByWord);

                for (const hero of json.data.results) {
                    let urlHero = hero.urls[0].url;
                    let thumb = hero.thumbnail;
                    contentHTML += `
                <div class="card-div">
                    <a href="${urlHero}" target="_blank">
                        <img src="${thumb.path}.${thumb.extension}" alt="${hero.name}"  class="card-home">
                    </a>
                    <h3>${hero.name}</h3>
                </div>`;
                }
                marvelCards.innerHTML = contentHTML;
                console.log("PERSONAJES", json)
            })
    }
}



// *** PAGINATION CONTROLS ***
const nextPage = () => {
    offset += 20;
    getDataComics.render(offset);
    if (offset >= 20) {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
}
nextBtn.addEventListener("click", nextPage);

const prevPage = () => {
    offset -= 20;
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    } else {
        getDataComics.render(offset);
    }
}
prevBtn.addEventListener("click", prevPage);


// ******************
// *** SEARCH BOX ***
// ******************





// *** REFRESH BY SEARCH FUNCTION ***
const refreshBySearch = array => {
    marvelCards.innerHTML = "";
    let contentHTML = "";

    for (let comic of array) {
        let thumb = comic.thumbnail;
        contentHTML += `
        <div class="card-div">
        <a href="#" target="_blank">
        <img src="${thumb.path}.${thumb.extension}" alt="${comic.title}"  class="card-home">
        </a>
        <h3>${comic.title}</h3>
        </div>`;
    }
    marvelCards.innerHTML = contentHTML;
}


// *** INIT FUNCTION ***
// const indexInit = () => {
//     getDataComics.render(offset);
//     prevBtn.classList.add("hidden");
//     firstPageBtn.classList.add("hidden");
// }
// indexInit();