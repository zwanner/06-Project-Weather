const colormodeButton = document.querySelector("#color-mode");
const colormodeButtonIcon = document.querySelector("#color-mode-icon");
const navbarEl = document.querySelector("#navbar");
const historyEl = document.querySelector("#history-div");
const weatherDivEl = document.querySelector("#weather-div");
const searchButtonEl = document.querySelector("#city-search-btn");
const searchInputEl = document.querySelector("#search-input");
const searchFormEl = document.querySelector("#search-form");
const footerEl = document.querySelector("#footer");

const apiKey = "139c23aa82a9dcd888cb7e4791ed5d1a";

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];


//switches color mode between light and dark
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

//sets color mode based on local storage
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
        //change footer color to dark
        footerEl.classList.remove("bg-light", "text-dark");
        footerEl.classList.add("bg-dark", "text-light");
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
        //change footer color to light
        footerEl.classList.remove("bg-dark", "text-light");
        footerEl.classList.add("bg-light", "text-dark");
    }
}

//sets search value to local storage and refreshes page
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

//renders search history
function renderSearchHistory() {
    for (let i = 0; i < searchHistory.length; i++) {
        const searchItem = document.createElement("button");
        searchItem.textContent = searchHistory[i];
        searchItem.classList.add("btn", "btn-primary", "m-2", "col");
        historyEl.appendChild(searchItem);
    }
}

//renders the current weather
function renderWeather() {
    const recentSearch = localStorage.getItem("recentSearch");
    //create card
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("card", "m-3", "shadow");
    //weatherCard.style.width = "20rem";
    //create card body
    const weatherCardBody = document.createElement("div");
    weatherCardBody.classList.add("card-body");
    //create card title
    const weatherCardTitle = document.createElement("h5");
    weatherCardTitle.classList.add("card-title");
    weatherCardTitle.textContent = recentSearch;
    weatherCardTitle.classList.add("fw-medium", "mb-3", "bg-primary", "text-white", "rounded-3", "p-2", "text-center");
    if (recentSearch === null) {
        weatherCardTitle.classList.remove("bg-primary");
        localStorage.setItem("recentSearch", "Philadelphia");
    }

    //append card elements to card body
    weatherCardBody.appendChild(weatherCardTitle);
    weatherCard.appendChild(weatherCardBody);
    weatherDivEl.appendChild(weatherCard);


    //get weather data
    getLongLat();
    getWeather();
    getForecast();
    
}

//fetch longitude and latitude
function getLongLat() {
    const recentSearch = localStorage.getItem("recentSearch");
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${recentSearch}&limit=1&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            const lon = JSON.parse(data[0].lon);
            const lat = JSON.parse(data[0].lat);
            localStorage.setItem("lon", lon);
            localStorage.setItem("lat", lat);
            console.log("Longitude: " + lon + " Latitude: " + lat);
        });

}

//fetch current weather data
function getWeather() {
    const lon = localStorage.getItem("lon");
    const lat = localStorage.getItem("lat");
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl)
        .then(function (response) {
            //console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayWeather(data);
        });
}

//fetch 5 day forecast
function getForecast() {
    const lon = localStorage.getItem("lon");
    const lat = localStorage.getItem("lat");
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayForecast(data);
        });

}

//display current weather
function displayWeather(data) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const type = data.weather[0].main;
    weatherCardBody = document.querySelector(".card-body");
    //create card text
    const cardBodyTemp = document.createElement("p");
    cardBodyTemp.classList.add("card-text");
    cardBodyTemp.textContent = `Temperature: ${temp} °F`;

    const cardBodyHumidity = document.createElement("p");
    cardBodyHumidity.classList.add("card-text");
    cardBodyHumidity.textContent = `Humidity: ${humidity}%`;

    const cardBodyWindSpeed = document.createElement("p");
    cardBodyWindSpeed.classList.add("card-text");
    cardBodyWindSpeed.textContent = `Wind Speed: ${windSpeed} MPH`;

    const cardBodyWeatherType = document.createElement("p");
    cardBodyWeatherType.classList.add("card-text");
    cardBodyWeatherType.textContent = type + " ";
    console.log(type);

    const weatherIcon = document.createElement("i");
    if (type === "Snow") {
        weatherIcon.classList.add("bi", "bi-snow2");
    } else if (type === "Rain") {
        weatherIcon.classList.add("bi", "bi-cloud-rain");
    } else if (type === "Clear") {
        weatherIcon.classList.add("bi", "bi-sun");
    } else if (type === "Clouds") {
        weatherIcon.classList.add("bi", "bi-cloud");
    } else if (type === "Mist") {
        weatherIcon.classList.add("bi", "bi-cloud-fog");
    } else { weatherIcon.classList.add("bi", "bi-cloud-sun"); }

    cardBodyWeatherType.appendChild(weatherIcon);

    cardTitle = document.querySelector(".card-title");
    cardTitle.textContent += " " + dayjs().format("MM/DD/YYYY");

    //append card text to card body
    weatherCardBody.appendChild(cardBodyWeatherType);
    weatherCardBody.appendChild(cardBodyTemp);
    weatherCardBody.appendChild(cardBodyHumidity);
    weatherCardBody.appendChild(cardBodyWindSpeed);
}

//display 5 day forecast
function displayForecast(data) {
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("row", "justify-content-center", "m-3");
    weatherDivEl.appendChild(forecastDiv);

    for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            const forecastCard = document.createElement("div");
            forecastCard.classList.add("card", "m-2", "p2", "col-2", "shadow");
            forecastDiv.appendChild(forecastCard);

            const forecastCardBody = document.createElement("div");
            forecastCardBody.classList.add("card-body");
            forecastCard.appendChild(forecastCardBody);

            const forecastCardTitle = document.createElement("h5");
            forecastCardTitle.classList.add("card-title", "fs-6", "fw-bold", "bg-primary", "text-white", "rounded-3", "p-1", "text-center");
            forecastCardTitle.textContent = dayjs(data.list[i].dt_txt).format("MM/DD");
            forecastCardBody.appendChild(forecastCardTitle);

            const forecastCardBodyTemp = document.createElement("p");
            forecastCardBodyTemp.classList.add("card-text");
            forecastCardBodyTemp.textContent = `${data.list[i].main.temp} °F`;
            forecastCardBody.appendChild(forecastCardBodyTemp);

            const forecastCardBodyHumidity = document.createElement("p");
            forecastCardBodyHumidity.classList.add("card-text");
            forecastCardBodyHumidity.textContent = `${data.list[i].main.humidity}%`;
            forecastCardBody.appendChild(forecastCardBodyHumidity);

            const forecastCardBodyWeatherType = document.createElement("p");
            forecastCardBodyWeatherType.classList.add("card-text");
            forecastCardBodyWeatherType.textContent = data.list[i].weather[0].main + " ";
            const weatherIconForecast = document.createElement("i");
            const type = data.list[i].weather[0].main;
            if (type === "Snow") {
                weatherIconForecast.classList.add("bi", "bi-snow2");
            } else if (type === "Rain") {
                weatherIconForecast.classList.add("bi", "bi-cloud-rain");
            } else if (type === "Clear") {
                weatherIconForecast.classList.add("bi", "bi-sun");
            } else if (type === "Clouds") {
                weatherIconForecast.classList.add("bi", "bi-cloud");
            } else if (type === "Mist") {
                weatherIconForecast.classList.add("bi", "bi-cloud-fog");
            } else { weatherIconForecast.classList.add("bi", "bi-cloud-sun"); }
            forecastCardBodyWeatherType.appendChild(weatherIconForecast);

            forecastCardBody.appendChild(forecastCardBodyWeatherType);
        }
    }
}

//change target location when history button is clicked
function changeLocation(event) {
    if (event.target.matches("button")) {
        const searchValue = event.target.textContent;
        localStorage.setItem("recentSearch", searchValue);
        location.reload();
    }
}

//initialization
setColorMode();
renderSearchHistory();
renderWeather();



//event listeners
colormodeButton.addEventListener("click", switchColorMode);
searchButtonEl.addEventListener("click", searchWeather);
historyEl.addEventListener("click", changeLocation);



