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

function callNews() {
  //call request to newsdata.io for the news
  let newsURL =
    "https://newsdata.io/api/1/news?apikey=pub_299289adfa56688cba193d66f9a9f700e1588&language=en";

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
  displayNewsData();
});

async function displayWeatherData() {
  let data = await callOpenWeather();
  console.log(data);

  //temperature related-data

  //Displaying weather image based on current conditions
  let weatherID = data["weather"]["id"];
  if (weatherID >= 200 && weatherID <= 232) {
    $("weatherImage").attr("src", "../svg/static/thunder.svg");
    $("backgroundWeather").css("background-image", "url(../img/thunder.jpg)");
  } else if (weatherID >= 300 && weatherID <= 321) {
    $("weatherImage").attr("src", "../svg/static/rainy-7.svg");
    $("backgroundWeather").css("background-image", "url(../img/rain.jpg)");
  } else if (weatherID >= 500 && weatherID <= 531) {
    $("weatherImage").attr("src", "../svg/static/rainy-1.svg");
    $("backgroundWeather").css("background-image", "url(../img/rain.jpg)");
  } else if (weatherID >= 600 && weatherID <= 622) {
    $("weatherImage").attr("src", "../svg/static/snowy-1.svg");
    $("backgroundWeather").css("background-image", "url(../img/snow.jpg)");
  } else if (weatherID === 800) {
    $("weatherImage").attr("src", "./svg/static/day.svg");
    $("backgroundWeather").css("background-image", "url(../img/clear.jpg)");
  } else if (weatherID >= 801 && weatherID <= 804) {
    $("weatherImage").attr("src", ".././svg/static/cloudy.svg");
    $("backgroundWeather").css("background-image", "url(../img/cloud.jpg)");
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

async function displayNewsData() {
  let data = await callNews();
  console.log(data);
  let articleCount = 1;
  for (article_count in data["results"]) {
    let article = data["results"][articleCount];
    if (articleCount <= 3) {
      if (article["image_url"] != null) {
        $("#article" + articleCount + "title").html(article["title"]);
        console.log(article["title"]);
        $("#article" + articleCount + "img").attr("src", article["image_url"]);
        $("#article" + articleCount + "link").attr("href", article["link"]);
      } else {
        continue;
      }
      articleCount += 1;
    } else {
      break;
    }
  }
}
