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

const currentData = document.querySelector("#current-data");
currentData.innerHTML = `${dayOfWeek} ${day}.${month}.${year}, ${hours}:${minutes}`;

// searched city

function capitalizeCity(city) {
  return city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function showCity(event) {
  event.preventDefault();
  const cityInput = document.querySelector("#city-input");
  const city = cityInput.value.trim().toLocaleLowerCase();
  const capitalizedCity = capitalizeCity(city);
  const location = document.querySelector(".location");
  if (capitalizedCity) {
    location.innerHTML = `${capitalizedCity}`;
  }
}

const searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", showCity);

// temperature conversion

const localTemperatureNumber = document.querySelector(
  ".local-temperature-number"
);

const defaultTemp = localTemperatureNumber.textContent;

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function covertToFahrenheit() {
  localTemperatureNumber.innerHTML = `${celsiusToFahrenheit(defaultTemp)}`;
}

function covertToCelsius() {
  localTemperatureNumber.innerHTML = `${defaultTemp}`;
}

const localTempFahrenheit = document.querySelector("#local-temp-fahrenheit");
const localTempCelsius = document.querySelector("#local-temp-celsius");

localTempFahrenheit.addEventListener("click", covertToFahrenheit);
localTempCelsius.addEventListener("click", covertToCelsius);
