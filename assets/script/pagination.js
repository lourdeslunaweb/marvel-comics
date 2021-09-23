var nextBtn = document.getElementById("next-btn");
var prevBtn = document.getElementById("prev-btn");
var firstPageBtn = document.getElementById("first-page-btn");
// *** PAGINATION CONTROLS ***
var nextPage = function () {
    offset += 20;
    // getDataComics.render(offset);
    if (offset >= 20) {
        prevBtn.classList.remove("hidden");
        firstPageBtn.classList.remove("hidden");
    }
};
var prevPage = function () {
    offset -= 20;
    if (offset === 0) {
        prevBtn.classList.add("hidden");
        firstPageBtn.classList.add("hidden");
    }
    else {
        // getDataComics.render(offset);
    }
};
