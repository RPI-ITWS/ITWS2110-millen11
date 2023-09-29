// //Geolocation Implementation
// var x = document.getElementById("demo");
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   //Shows user's current position
//   x.innerHTML =
//     "Latitude: " +
//     position.coords.latitude +
//     "<br>Longitude: " +
//     position.coords.longitude;
// }
function callOpenWeather() {
  //call request to openWeather
  openWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=42.7284&lon=-73.6918&units=imperial&lang=en&exclude=minutely&appid=b0bcf16f78f4e42826a910428b5a38cc";

  return fetch(openWeatherURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Could not call OpenWeather");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function callNews() {
  //call request to newsdata.io for the news
  newsURL = "https://newsdata.io/";

  return fetch(newsURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Could not call newsdata.io");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// callOpenWeather().then((OpenWeatherData) => {});
$(document).ready(() => {
  displayWeatherData();
});

async function displayWeatherData() {
  let data = await callOpenWeather();
  console.log(data);

  //temperature related-data

  //Displaying weather image based on current conditions
  let weatherID = data["weather"]["id"];
  if (weatherID >= 200 && weatherID <= 232) {
    $("weatherImage").attr("src", "../svg/static/thunder.svg");
  } else if (weatherID >= 300 && weatherID <= 321) {
    $("weatherImage").attr("src", "../svg/static/rainy-7.svg");
  } else if (weatherID >= 500 && weatherID <= 531) {
    $("weatherImage").attr("src", "../svg/static/rainy-1.svg");
  } else if (weatherID >= 600 && weatherID <= 622) {
    $("weatherImage").attr("src", "../svg/static/snowy-1.svg");
  } else if (weatherID === 800) {
    $("weatherImage").attr("src", "./svg/static/day.svg");
  } else if (weatherID >= 801 && weatherID <= 804) {
    $("weatherImage").attr("src", ".././svg/static/cloudy.svg");
  }

  $("#currentTemp").html(data["main"]["temp"] + " °F");
  $("#feels_like").html("Feels like: " + data["main"]["feels_like"] + " °F");
  $("#minTemp").html("Minimum: " + data["main"]["temp_min"] + " °F");
  $("#maxTemp").html("Maximum: " + data["main"]["temp_max"] + " °F");

  //City & "Current" time
  $("#city").html(data["name"] + ", NY");
  $("#timeDataFetched").html(Date(data["dt"]));

  //Other data
  $("#humidity").html("Humidity: " + data["main"]["humidity"] + "%");
  $("#windSpeed").html("Wind MPH: " + data["wind"]["speed"]);
  $("#cloudiness").html("Cloudiness: " + data["clouds"]["all"] + "%");
  $("#sunriseTime").html("Sunrises at " + Date(data["sys"]["sunrise"]));
  $("#sunsetTime").html("Sunsets at " + Date(data["sys"]["sunset"]));
}
//example of jquery html selection
//
// $("#image").attr("alt",new alt");
//html code for above: <!-- <img id="image" /> -->
