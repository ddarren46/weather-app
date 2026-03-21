//http://api.weatherapi.com/v1/current.json?key=d3dec5f895da44e9a09124320262103&q=jakarta&aqi=no

let targetLocation = 'Jakarta';
const tempDisplay = document.querySelector('.temp');
const locationDisplay = document.querySelector('.location');
const timeDisplay = document.querySelector('.time');
const iconDisplay = document.querySelector('.weather-image');
const conditionDisplay = document.querySelector('.weather');
const form = document.querySelector('form')
const searchField = document.querySelector('.search-bar')
const searchButton = document.querySelector('.search-button')

form.addEventListener('submit', searchForLocation)
const fetchResults = async (location) => {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=d3dec5f895da44e9a09124320262103&q=${location}&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            showError(data.error.message);
            return;
        }
        location = data.location.name;
        time = data.location.localtime;
        temp = data.current.temp_c;
        condition = data.current.condition.text;
        icon = data.current.condition.icon;
        console.log(location, time, temp, condition, icon);

        updateHTML(temp, location, time, icon, condition)
    } catch (error) {
        showError("Something went wrong. Please try again.");
    }
}

function updateHTML(temp, location, time, icon, condition) {
    tempDisplay.innerText = `${temp}℃`;
    locationDisplay.innerText = location;
    timeDisplay.innerText = time
    iconDisplay.innerHTML = `<img src="https:${icon}" alt="weather icon">`;
    conditionDisplay.innerText = condition
}

function searchForLocation(e) {
    e.preventDefault()

    target = searchField.value

    if (target === "") {
        showError("Please enter a city name.");
        return;
    }

    fetchResults(target)
}
fetchResults(targetLocation);

function showError(message) {
    tempDisplay.innerText = "";
    locationDisplay.innerText = "Error";
    timeDisplay.innerText = "";
    iconDisplay.innerHTML = "";
    conditionDisplay.innerText = message;
}