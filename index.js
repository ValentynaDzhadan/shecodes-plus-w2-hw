const currentData = document.querySelector("#current-data");
const cityInput = document.querySelector("#city-input");
const searchCityForm = document.querySelector("#search-city-form");
const currentLocationBtn = document.querySelector(".current-location-btn");
const localTemperatureNumber = document.querySelector(
  ".local-temperature-number"
);
const locationCity = document.querySelector(".location");
const mainIcon = document.querySelector(".main-icon");
const speedWind = document.querySelector(".local-speed-wind");
const humidityUnit = document.querySelector(".local-humidity");

const localTempFahrenheit = document.querySelector("#local-temp-fahrenheit");
const localTempCelsius = document.querySelector("#local-temp-celsius");

const apiKey = "b40b135798f82a05aed08769f9275f50";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

// the current date and time
const now = new Date();
const daysArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeek = daysArr[now.getDay()];
const day = now.getDate().toString().padStart(2, "0");
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const year = now.getFullYear();
const hours = now.getHours().toString().padStart(2, "0");
const minutes = now.getMinutes().toString().padStart(2, "0");

currentData.innerHTML = `${dayOfWeek} ${day}.${month}.${year}, ${hours}:${minutes}`;

// searched city
function capitalizeCity(city) {
  return city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function showLocalWeather(city, temp, wind, humidity, icon) {
  locationCity.innerHTML = city;
  localTemperatureNumber.innerHTML = temp;
  speedWind.innerHTML = wind;
  humidityUnit.innerHTML = humidity;
  mainIcon.innerHTML = `<img src=" https://openweathermap.org/img/wn/${icon}@2x.png" alt="" />`;
}

function showForecast(event) {
  event.preventDefault();
  const city = cityInput.value.trim().toLocaleLowerCase();
  const capitalizedCity = capitalizeCity(city);
  axios.get(baseUrl + `&q=${capitalizedCity}`).then(showWeatherUnits);
}

searchCityForm.addEventListener("submit", showForecast);

// Weather API
let defaultTemp;

function showWeatherUnits(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let icon = response.data.weather[0].icon;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  showLocalWeather(city, temp, wind, humidity, icon);
  defaultTemp = temp;
  console.log(response.data);
}

// temperature conversion
function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}
function covertToFahrenheit() {
  localTemperatureNumber.innerHTML = `${celsiusToFahrenheit(defaultTemp)}`;
}
function covertToCelsius() {
  localTemperatureNumber.innerHTML = `${defaultTemp}`;
}
localTempFahrenheit.addEventListener("click", covertToFahrenheit);
localTempCelsius.addEventListener("click", covertToCelsius);

//current location
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios.get(baseUrl + `&lat=${lat}&lon=${lon}`).then(showWeatherUnits);
}

function showCurrentLocationForecast() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
currentLocationBtn.addEventListener("click", showCurrentLocationForecast);
