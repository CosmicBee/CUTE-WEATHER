let API_KEY = "2c7917fbc1a5e22bc28de56ceb9be5d2";
let cityNameHeader = document.querySelector("#cityName");
let form = document.querySelector("#form");

let humidityHeader = document.querySelector("#humidityTxt");
let windHeader = document.querySelector("#windTxt");
let temperatureHeader = document.querySelector("#temperatureTxt");
let rainHeader = document.querySelector("#rainTxt");
let weatherHeader = document.querySelector("#weatherTxt");
let timeHeader = document.querySelector("#timeTxt");

form.addEventListener("submit", function (e) {
  
  const cityName = document.querySelector("#cityTxt").value;

  cityNameHeader.innerHTML = cityName;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then(function (response) {
      // handle success
      let humidity = response.data.main.humidity;
      let windSpeed = response.data.wind.speed;
      let temperatureDesc = response.data.weather[0].description;
      let weather = response.data.main.temp;

     

      humidityHeader.innerHTML += ` ${humidity}`;
      windHeader.innerHTML += ` ${windSpeed}km`;
      temperatureHeader.innerHTML += ` ${weather}`;
      rainHeader.innerHTML += ` ${temperatureDesc}.`;

      timeHeader.innerHTML = getCurrentTime();
    })
    .catch(function (error) {
    
      console.log(error);
    });

  e.preventDefault();
});




window.onload = function () {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then(function (response) {
      // handle success
      let cityName = response.data.name;
      let humidity = response.data.main.humidity;
      let windSpeed = response.data.wind.speed;
      let temperatureDesc = response.data.weather[0].description;
      let weather = response.data.main.temp;

     

      cityNameHeader.innerHTML = cityName;

      humidityHeader.innerHTML += ` ${humidity}`;
      windHeader.innerHTML += ` ${windSpeed}km`;
      temperatureHeader.innerHTML += ` ${weather}`;
      rainHeader.innerHTML += ` ${temperatureDesc}.`;

   
    })
    .catch(function (error) {
      console.log(error);
    });
};






function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
