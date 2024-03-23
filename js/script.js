const colormodeButton = document.querySelector("#color-mode");
const colormodeButtonIcon = document.querySelector("#color-mode-icon");
const navbarEl = document.querySelector("#navbar");
const historyEl = document.querySelector("#history-div");
const weatherDivEl = document.querySelector("#weather-div");
const searchButtonEl = document.querySelector("#city-search-btn");
const searchInputEl = document.querySelector("#search-input");
const searchFormEl = document.querySelector("#search-form");
const cityNameEl = document.querySelector("#city-name");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];



function switchColorMode() {
    const currentColorMode = localStorage.getItem("colorMode");

    if (currentColorMode === "dark") {
        localStorage.setItem("colorMode", "light");
        console.log("ColorMode: " + "Light");
    } else {
        localStorage.setItem("colorMode", "dark");
        console.log("ColorMode: " + "Dark");
    }
    setColorMode();
}

function setColorMode() {
    const currentColorMode = localStorage.getItem("colorMode");
    if (currentColorMode === "dark") {
        //change body theme to dark
        document.body.setAttribute("data-bs-theme", "dark");
        //change background pattern to dark
        document.body.classList.remove("bg-pattern-light");
        document.body.classList.add("bg-pattern-dark");
        //change icon to moon
        colormodeButtonIcon.classList.remove("bi-sun-fill");
        colormodeButtonIcon.classList.add("bi-moon-stars-fill");
        //change button color to dark
        colormodeButton.classList.remove("bg-dark", "text-light");
        colormodeButton.classList.add("bg-light", "text-dark");
        //change navbar color to dark
        navbarEl.classList.remove("bg-light", "text-dark");
        navbarEl.classList.add("bg-dark", "text-light");
        //change history color to dark
        historyEl.classList.remove("bg-light", "text-dark");
        historyEl.classList.add("bg-dark", "text-light");
        //change weather color to dark
        weatherDivEl.classList.remove("bg-light", "text-dark");
        weatherDivEl.classList.add("bg-dark", "text-light");
    } else {
        //change body theme to light
        document.body.setAttribute("data-bs-theme", "light");
        //change background pattern to light
        document.body.classList.remove("bg-pattern-dark");
        document.body.classList.add("bg-pattern-light");
        //change icon to sun
        colormodeButtonIcon.classList.remove("bi-moon-stars-fill");
        colormodeButtonIcon.classList.add("bi-sun-fill");
        //change button color to light
        colormodeButton.classList.remove("bg-light", "text-dark");
        colormodeButton.classList.add("bg-dark", "text-liht");
        //change navbar color to light
        navbarEl.classList.remove("bg-dark", "text-light");
        navbarEl.classList.add("bg-light", "text-dark");
        //change history color to light
        historyEl.classList.remove("bg-dark", "text-light");
        historyEl.classList.add("bg-light", "text-dark");
        //change weather color to light
        weatherDivEl.classList.remove("bg-dark", "text-light");
        weatherDivEl.classList.add("bg-light", "text-dark");
    }
}

function searchWeather(event) {
    event.preventDefault();
    const searchValue = searchInputEl.value;
    console.log(searchValue);
    searchInputEl.value = "";
    searchHistory.push(searchValue);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    //refresh page
    location.reload();
    localStorage.setItem("recentSearch", searchValue);
}

function renderSearchHistory() {
    for (let i = 0; i < searchHistory.length; i++) {
        const searchItem = document.createElement("button");
        searchItem.textContent = searchHistory[i];
        searchItem.classList.add("btn", "btn-secondary", "m-2", "col");
        historyEl.appendChild(searchItem);
    }
}

function renderWeather() {
    const recentSearch = localStorage.getItem("recentSearch");
    cityNameEl.textContent = recentSearch;
}


setColorMode();
renderSearchHistory();
renderWeather();


colormodeButton.addEventListener("click", switchColorMode);
searchButtonEl.addEventListener("click", searchWeather);

