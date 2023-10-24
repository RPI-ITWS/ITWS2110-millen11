function callOpenWeather() {
  //call request to openWeather
  let openWeatherURL =
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

function callNBA() {
  //call request to newsdata.io for the news
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let nbaURL =
    "https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/2011/";

  return fetch(nbaURL, requestOptions)
    .then((response) => {
      if (response.ok) {
        // console.log(response.json());
        return response.json();
      } else {
        throw new Error("Could not call documentergetpostman.com.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function callFrankfurter() {
  //call request to Frankfurter
  let FrankfurterURL = "https://api.frankfurter.app/latest";

  return fetch(FrankfurterURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Could not call Frankfurter");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  /*
   */
}

async function displayWeatherData() {
  let data = await callOpenWeather();
  console.log(data);

  //temperature related-data

  //Displaying weather image based on current conditions
  let weatherID = data["weather"][0]["id"];
  if (weatherID >= 200 && weatherID <= 232) {
    $("#weatherImage").attr("src", "../svg/static/thunder.svg");
    $("#backgroundWeather").css(
      "background-image",
      "url('../img/thunder.jpeg')"
    );
  } else if (weatherID >= 300 && weatherID <= 321) {
    $("#weatherImage").attr("src", "./svg/static/rainy-7.svg");
    $("#backgroundWeather").css("background-image", "url('./img/rain.jpg')");
  } else if (weatherID >= 500 && weatherID <= 531) {
    $("#weatherImage").attr("src", "./svg/static/rainy-1.svg");
    $("#backgroundWeather").css("background-image", "url('./img/rain.jpg')");
  } else if (weatherID >= 600 && weatherID <= 622) {
    $("#weatherImage").attr("src", "./svg/static/snowy-1.svg");
    $("#backgroundWeather").css("background-image", "url('./img/snow.jpg')");
  } else if (weatherID === 800) {
    $("#weatherImage").attr("src", "./svg/static/day.svg");
    $("#backgroundWeather").css("background-image", "url('./img/clear.jpg')");
  } else if (weatherID >= 801 && weatherID <= 804) {
    $("#weatherImage").attr("src", "./svg/static/cloudy.svg");
    $("#backgroundWeather").css("background-image", "url('./img/cloud.jpg')");
  }

  $("#currentTemp").html(data["main"]["temp"] + "°F");
  $("#feels_like").html("Feels like: " + data["main"]["feels_like"] + "°F");
  $("#minTemp").html("Minimum: " + data["main"]["temp_min"] + "°F");
  $("#maxTemp").html("Maximum: " + data["main"]["temp_max"] + "°F");

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

async function displayNBAData() {
  let data = await callNBA();
  for (let i = 0; i < 40; i++) {
    let playerName = data["results"][i]["player_name"];
    let pointsSeason = data["results"][i]["PTS"];
    let gamesPlayed = data["results"][i]["games"];
    let averagePoints = pointsSeason / gamesPlayed;
    $("#playerHeader").append("<p class = 'unbold'>" + playerName + "</p>");
    $("#pointsScored").append(
      "<p class = 'unbold'>" + Math.round(10 * averagePoints) / 10 + "</p>"
    );
  }
}

async function convertFrankfurter() {
  let data = await callFrankfurter();
  console.log(data);

  let currencies = data["rates"]; //dictionary of currencies and value

  let count = 0;
  let currency;
  for (currency of Object.keys(currencies)) {
    if (count <= 5) {
      const host = "api.frankfurter.app";
      fetch(`https://${host}/latest?amount=10&from=` + currency + `&to=USD`)
        .then((resp) => resp.json())
        .then((data) => {
          $("#currencyDisplay").html(
            `10 ` + currency + ` = ${data.rates.USD} USD`
          );
          alert(`10 ` + currency + ` = ${data.rates.USD} USD`);
        });
      count += 1;
    }
  }
}

async function displayFrankfurter() {
  let data = await callFrankfurter();
  console.log(data);

  let currencies = data["rates"]; //dictionary of currencies and value

  let count = 0;
  let currency;
  for (currency of Object.keys(currencies)) {
    if (count >= 5 && count <= 7) {
      const host = "api.frankfurter.app";
      fetch(`https://${host}/latest?amount=10&from=` + currency + `&to=USD`)
        .then((resp) => resp.json())
        .then((data) => {
          $("#currencyDisplay").html(
            `10 ` + currency + ` = ${data.rates.USD} USD`
          );
          alert(`10 ` + currency + ` = ${data.rates.USD} USD`);
          console.log(currency);
        });
      count += 1;
    }
    count += 1;
  }
}

$(document).ready(() => {
  displayWeatherData();
  displayNBAData();
  displayFrankfurter();
});
