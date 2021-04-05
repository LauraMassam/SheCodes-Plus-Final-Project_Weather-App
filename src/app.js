
function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day}`
}

function formatTime(timestamp){
    let time = new Date(timestamp);

    let hours = time.getHours();
    if (hours < 10)
    {
        hours = `0${hours}`;
    }
    let minutes = time.getMinutes();
    if (minutes < 10)
    {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function showTemperature(response){
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let temperatureLowElement = document.querySelector("#low-temp");
    temperatureLowElement.innerHTML = Math.round(response.data.main.temp_min);
    let temperatureHighElement = document.querySelector("#high-temp");
    temperatureHighElement.innerHTML = Math.round(response.data.main.temp_max);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = (response.data.name);
    let weatherDescriptionElement = document.querySelector("#weather-description");
    weatherDescriptionElement.innerHTML = (response.data.weather[0].description);
    let weatherIconElement = document.querySelector("#icon");
    weatherIconElement.setAttribute (
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIconElement.setAttribute("alt", response.data.weather[0].main);

    let sunriseElement = document.querySelector("#sunrise");
    sunriseElement.innerHTML = formatTime(response.data.sys.sunrise*1000);
    let sunsetElement = document.querySelector("#sunset");
    sunsetElement.innerHTML = formatTime(response.data.sys.sunset*1000);

    let dateElement = document.querySelector("#day");
    dateElement.innerHTML = formatDate(response.data.dt*1000);

    let time=document.querySelector("#time");
    time.innerHTML = formatTime(response.data.dt*1000);
console.log(response.data);
}

function search(city){
let apiKey = "9aaa9a2a183bbe9e6cb58bc031908f93";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}    
search("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);