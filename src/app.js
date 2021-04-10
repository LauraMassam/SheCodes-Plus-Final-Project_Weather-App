
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
    let temperatureLowElement = document.querySelector("#low-temp");
    let temperatureHighElement = document.querySelector("#high-temp");
    let dateElement = document.querySelector("#day");
    let cityElement = document.querySelector("#current-city");
    let weatherDescriptionElement = document.querySelector("#weather-description");
    let feelsLikeElement = document.querySelector("#feels-like");
    let sunriseElement = document.querySelector("#sunrise");
    let sunsetElement = document.querySelector("#sunset");
    let weatherIconElement = document.querySelector("#icon");
    
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    temperatureLowElement.innerHTML = Math.round(response.data.main.temp_min);
    temperatureHighElement.innerHTML = Math.round(response.data.main.temp_max);
    dateElement.innerHTML = formatDate(response.data.dt*1000);
    cityElement.innerHTML = (response.data.name);
    weatherDescriptionElement.innerHTML = (response.data.weather[0].description);
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like)
    sunriseElement.innerHTML = formatTime(response.data.sys.sunrise*1000);
    sunsetElement.innerHTML = formatTime(response.data.sys.sunset*1000);

    weatherIconElement.setAttribute (
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        weatherIconElement.setAttribute("alt", response.data.weather[0].main);
        
    let time=document.querySelector("#time");
    time.innerHTML = formatTime(response.data.dt*1000);

    celsiusTemperature = response.data.main.temp;
    console.log(response.data)
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

function displayFahrenheitTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector("#current-temp");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9 / 5 + 32);
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp")
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }
    

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("London");
