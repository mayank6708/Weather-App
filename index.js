const api = {
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  apiKey: "52f9e8c46a54bd63e43329404a7cad33",
};
const searchbox = document.querySelector("#search-box");
searchbox.addEventListener("keypress", getValue);

let date = document.querySelector(".date");
let x = new Date().toDateString();
date.innerHTML = x;

function getValue(event) {
  if (event.keyCode == 13) {
    // console.log(searchbox.value);
    getData(searchbox.value);
  }
}
function getData(query) {
  const url = api.baseURL + "?q=" + query + "&appid=" + api.apiKey;
  fetch(url)
    .then((weather) => {
      return weather.json();
    })
    .then((data) => {
      // console.log(data);
      displayWeather(data);
    })
    .catch(() => alert("Please enter a valid location"));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayWeather(weatherData) {
  let city = document.querySelector(".title");
  city.innerHTML = weatherData.name;

  let temp = document.querySelector(".temp");
  temp.innerHTML =
    "Temperature- " + parseInt(weatherData.main.temp - 273.15) + "<span>°C</span>";

  let weather = document.querySelector(".weather");
  weather.innerHTML =
    "Description- " + capitalizeFirstLetter(weatherData.weather[0].description);

  let hi_low = document.querySelector(".hi-low");
  hi_low.innerHTML =
    "Min/Max - " +
    parseInt(weatherData.main.temp_min - 273.15) +
    "<span>°C / </span>" +
    parseInt(weatherData.main.temp_max - 273.15) +
    "<span>°C</span>";

  let lat = document.querySelector(".lat");
  lat.innerHTML =
    "Lat / Lon-  " +
    parseInt(weatherData.coord.lat) +
    "<span>°/ </span>" +
    parseInt(weatherData.coord.lon) +
    "<span>°</span>";

  let hum = document.querySelector(".hum");
  hum.innerHTML =
    "Humidity- " + parseInt(weatherData.main.humidity) + "<span>%</span>";
}
