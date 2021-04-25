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

function formatDay (timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sun",
        "Mon",
        "Tues",
        "Wed",
        "Thurs",
        "Fri",
        "Sat"
    ];
    return days[day];
}
   
function displayForecast(response){
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class = "row">`;
forecast.forEach(function (forecastDay, index){
    if(index < 6){
    forecastHTML =
    forecastHTML +

    `
    <div class = "col-2 weather-forecast-info">
    <div class = "weather-forecast-date"> ${formatDay(forecastDay.dt)}</div>
    <img
    src = "https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
    }@2x.png"
    alt = ""
    width= "60px"
    />

    <div class = "weather-forecast-temperatures">
    <span class = "weather-forecast-temperatures-min">
    ${
        Math.round(forecastDay.temp.min)
    }</span> °|

    <span class = "weather-forecast-temperatures-max">
    ${
        Math.round(forecastDay.temp.max)
    }­</span>°
    </div>
    </div>
    `;
}
 forecastLowTemp = forecastDay.temp.min;
 forecastHighTemp = forecastDay.temp.max;

});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "9aaa9a2a183bbe9e6cb58bc031908f93";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

function showWeather(response){
    let temperatureLowElement = document.querySelector("#low-temp");
    let temperatureElement = document.querySelector("#current-temp");
    let temperatureHighElement = document.querySelector("#high-temp");
    let dateElement = document.querySelector("#day");
    let cityElement = document.querySelector("#current-city");
    let weatherDescriptionElement = document.querySelector("#weather-description");
    let feelsLikeElement = document.querySelector("#feels-like");
    let fahrenheitTemperatureHighElement = document.querySelector("#high-temp");
    let fahrenheitTemperatureLowElement = document.querySelector("#low-temp");   
    let sunriseElement = document.querySelector("#sunrise");
    let sunsetElement = document.querySelector("#sunset");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let weatherIconElement = document.querySelector("#icon");
      
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    temperatureHighElement.innerHTML = Math.round(response.data.main.temp_max);
    temperatureLowElement.innerHTML = Math.round(response.data.main.temp_min);
    dateElement.innerHTML = formatDate(response.data.dt*1000);
    cityElement.innerHTML = (response.data.name);
    weatherDescriptionElement.innerHTML = (response.data.weather[0].description);
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    fahrenheitTemperatureHighElement.innerHTML = Math.round(response.data.main.temp_max);
    fahrenheitTemperatureLowElement.innerHTML = Math.round(response.data.main.temp_min);
    sunriseElement.innerHTML = formatTime(response.data.sys.sunrise*1000);
    sunsetElement.innerHTML = formatTime(response.data.sys.sunset*1000);
    humidityElement.innerHTML = (response.data.main.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    weatherIconElement.setAttribute (
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        weatherIconElement.setAttribute("alt", response.data.weather[0].main);
        
    let time=document.querySelector("#time");
    time.innerHTML = formatTime(response.data.dt*1000);

    celsiusTemperature = response.data.main.temp;
    feelsLikeTemp = response.data.main.feels_like;
    lowTemp = response.data.main.temp_min;
    highTemp = response.data.main.temp_max;
    getForecast(response.data.coord);
}

function searchCity(city){
let apiKey = "9aaa9a2a183bbe9e6cb58bc031908f93";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    searchCity(cityInputElement.value);
}    

function searchUserLocation(position){
    let apiKey = "9aaa9a2a183bbe9e6cb58bc031908f93";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getUserLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchUserLocation);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5 + 32);
    let feelsLikeTempElement = document.querySelector("#feels-like");
    let fahrenheitHighTemperatureElement = document.querySelector("#high-temp");
    let fahrenheitLowTemperatureElement = document.querySelector("#low-temp");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    feelsLikeTempElement.innerHTML = Math.round((feelsLikeTemp * 9) / 5 + 32);
    fahrenheitHighTemperatureElement.innerHTML = Math.round((highTemp * 9) / 5 + 32);
    fahrenheitLowTemperatureElement.innerHTML = Math.round((lowTemp * 9) / 5 + 32);

    // forecast high & low temp convert to fahrenheit
    let forecastFahrenheitLowTemperatureElement = document.querySelectorAll(".weather-forecast-temperatures-min");
    forecastFahrenheitLowTemperatureElement.forEach(function (item){
        let temperatureElement  = item.innerHTML;
        item.innerHTML = Math.round((temperatureElement * 9) / 5 + 32);
    });

    let forecastFahrenheitHighTemperatureElement = document.querySelectorAll(".weather-forecast-temperatures-max");
    forecastFahrenheitHighTemperatureElement.forEach (function (item){
     item.innerHTML = Math.round((forecastHighTemp * 9) / 5 + 32);
    });
    
    celsiusLink.addEventListener("click", displayCelsiusTemperature);
    fahrenheitLink.removeEventListener("click", displayFahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    let feelsLikeTempElement = document.querySelector("#feels-like");
    let fahrenheitHighTemperatureElement = document.querySelector("#high-temp");
    let fahrenheitLowTemperatureElement = document.querySelector("#low-temp");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    feelsLikeTempElement.innerHTML = Math.round(feelsLikeTemp);
    fahrenheitHighTemperatureElement.innerHTML = Math.round(highTemp);
    fahrenheitLowTemperatureElement.innerHTML = Math.round(lowTemp);

    // forecast high & low temp convert to celsius
    let forecastCelsiusLowTemperatureElement = document.querySelectorAll(".weather-forecast-temperatures-min");
    forecastCelsiusLowTemperatureElement.forEach(function (item){
        let temperatureElement  = item.innerHTML;
        item.innerHTML = Math.round(((temperatureElement  - 32) *5) / 9);
    });
    
    let forecastCelsiusHighTemperatureElement = document.querySelectorAll(".weather-forecast-temperatures-max");
    forecastCelsiusHighTemperatureElement.forEach(function (item){
        item.innerHTML = Math.round(forecastHighTemp);
    });

    celsiusLink.removeEventListener("click", displayCelsiusTemperature);
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
}
    

let celsiusTemperature = null;
let feelsLikeTemp = null;
let highTemp = null;
let lowTemp = null;
let forecastHighTemp = null;
let forecastLowTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentLocationBtn = document.querySelector("#user-location-btn");
currentLocationBtn.addEventListener("click", getUserLocation);

searchCity("London");