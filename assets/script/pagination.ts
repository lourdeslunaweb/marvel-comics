const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const firstPageBtn = document.getElementById("first-page-btn");

// *** PAGINATION CONTROLS ***
const nextPage = () => {
    offset += 20;
    // getDataComics.render(offset);
    if (offset >= 20) {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
}


const prevPage = () => {
    offset -= 20;
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    } else {
        // getDataComics.render(offset);
    }
}