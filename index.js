let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here

let city = prompt("Enter a city").trim().toLocaleLowerCase();

function capitalizeCity(city) {
  return city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

if (weather.hasOwnProperty(city)) {
  const celsiusTemperature = weather[city].temp;
  const fahrenheitTemperature = celsiusToFahrenheit(celsiusTemperature);
  const capitalizedCity = capitalizeCity(city);
  const humidityOfCity = weather[city].humidity;
  const celsiusRoundedTemperature = Math.round(celsiusTemperature);
  const fahrenheitRoundedTemperature = Math.round(fahrenheitTemperature);

  alert(
    `It is currently ${celsiusRoundedTemperature}°C (${fahrenheitRoundedTemperature}°F) in ${capitalizedCity} with a humidity of ${humidityOfCity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
