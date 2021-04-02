

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
    let weatherIconElement = document.querySelector("#weather-icon");
    weatherIconElement.setAttribute (
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "9aaa9a2a183bbe9e6cb58bc031908f93";
let city = "Coppull";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
