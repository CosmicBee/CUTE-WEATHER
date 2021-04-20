let API_KEY = "2c7917fbc1a5e22bc28de56ceb9be5d2";
let cityNameHeader = document.querySelector("#cityName");
let form = document.querySelector("#form");

let humidityHeader = document.querySelector("#humidityTxt");
let windHeader = document.querySelector("#windTxt");
let temperatureHeader = document.querySelector("#temperatureTxt");
let rainHeader = document.querySelector("#rainTxt");
let timeHeader = document.querySelector("#timeTxt");

 let iconElement = document.querySelector("#icon");
let cityTElement =document.querySelector("cityTime");
form.addEventListener("submit", function (e) {
  
  const cityName = document.querySelector("#cityTxt").value;

  cityNameHeader.innerHTML = cityName;




  

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then(function (response) {
      
      let humidity =  response.data.main.humidity;
      let windSpeed =response.data.wind.speed;
      let temperatureDesc =response.data.weather[0].description;
      let weather = response.data.main.temp;

      let cityTime=response.data.dt;
 

      humidityHeader.innerHTML += ` ${humidity}`;
      windHeader.innerHTML += ` ${windSpeed}km`;
      temperatureHeader.innerHTML += ` ${weather}`;
      rainHeader.innerHTML += ` ${temperatureDesc}.`;
      
       iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);


   cityTime.innerHTML = formatD(response.data.dt * 1000);
        


      timeHeader.innerHTML = getCurrentTime();


    })
    .catch(function (error) {
    
      console.log(error);
    });

    

  e.preventDefault();
});






  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperatureTxt");
    let fahrenheitTemperature = (6 * 9/5) + 32 ;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);




window.onload = function () {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then(function (response) {
     
      let cityName = response.data.name;
      let humidity = Math.round(response.data.main.humidity);
      let windSpeed = Math.round (response.data.wind.speed);
      let weather =Math.round( response.data.main.temp);
      let temperatureDesc = response.data.weather[0].description;

    

     cityTime.innerHTML = formatD(response.data.dt * 1000);

      
     

      cityNameHeader.innerHTML = cityName;

      humidityHeader.innerHTML += ` ${humidity}`;
      windHeader.innerHTML += ` ${windSpeed}km`;
      temperatureHeader.innerHTML += ` ${weather}`;
      rainHeader.innerHTML += ` ${temperatureDesc}.`;

         iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);


  cityTime.innerHTML+=`${cityT}`;

   
    })
    .catch(function (error) {
      console.log(error);
    });
};








 
function formatD(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

    






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



