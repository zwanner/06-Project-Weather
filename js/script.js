const colormodeButton = document.querySelector("#color-mode");
const navbarEl = document.querySelector("#navbar");
const historyEl = document.querySelector("#history-div");
const weatherDivEl = document.querySelector("#weather-div");
const searchButtonEl = document.querySelector("#city-search-btn");
const searchInputEl = document.querySelector("#search-input");
const searchFormEl = document.querySelector("#search-form");



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
        document.body.setAttribute("data-bs-theme", "dark");
        document.body.classList.remove("bg-pattern-light");
        document.body.classList.add("bg-pattern-dark");
        colormodeButton.textContent = "🌙";
        colormodeButton.classList.remove("bg-dark", "text-light");
        colormodeButton.classList.add("bg-light", "text-dark");
        navbarEl.classList.remove("bg-light", "text-dark");
        navbarEl.classList.add("bg-dark", "text-light");
        historyEl.classList.remove("bg-light", "text-dark");
        historyEl.classList.add("bg-dark", "text-light");
        weatherDivEl.classList.remove("bg-light", "text-dark");
        weatherDivEl.classList.add("bg-dark", "text-light");
    } else {
        document.body.setAttribute("data-bs-theme", "light");
        document.body.classList.remove("bg-pattern-dark");
        document.body.classList.add("bg-pattern-light");
        colormodeButton.textContent = "☀️";
        colormodeButton.classList.remove("bg-light", "text-dark");
        colormodeButton.classList.add("bg-dark", "text-liht");
        navbarEl.classList.remove("bg-dark", "text-light");
        navbarEl.classList.add("bg-light", "text-dark");
        historyEl.classList.remove("bg-dark", "text-light");
        historyEl.classList.add("bg-light", "text-dark");
        weatherDivEl.classList.remove("bg-dark", "text-light");
        weatherDivEl.classList.add("bg-light", "text-dark");
    }
}

function searchWeather(event) {
    event.preventDefault();
    const searchValue = searchInputEl.value;
    console.log(searchValue);
    searchInputEl.value = "";
}


setColorMode();

colormodeButton.addEventListener("click", switchColorMode);
searchButtonEl.addEventListener("click", searchWeather);

