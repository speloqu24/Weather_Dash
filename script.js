$(document).ready(function () {
  // Function runs the entire back end
  var getWeather = function () {
    $("#current-display").empty();

    var cityInput = $("#search-input").val().trim();
    var requestWeather =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&appid=1a201dc845b8d910adc7977e4bac7b00&units=imperial";

    // AJAX call/fetch the CURRENT API data we're requesting
    $.ajax({
      url: requestWeather,
      method: "GET",
    }).then(function (data) {
       // console.log(data);
      // LOCATE / Create elements dynamically
      var currentCity = $("#current-display");
      var currentCityName = $("<h2>");
      var currentTemp = $("<p>");
      var feelsLike = $("<p>");
      var humidity = $("<p>");
      var description = $("<h5>");
      var wind = $("<p>");
      var currentIcon = $("<img>");
      var weatherIcon = data.weather[0].icon;
      var icons = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

      // SET the URL attribute in order to display the weather icons
      currentIcon.attr("src", icons);

      // CREATE text for created elements where data will display
      currentCityName.text(data.name + "  " + moment().format("L"));
      currentTemp.text("Actual: " + data.main.temp + "°F");
      feelsLike.text("Feels Like: " + data.main.feels_like + "°F");
      description.text(data.weather[0].description);
      humidity.text("Humidity: " + data.main.humidity + "%");
      wind.text("Wind Speed: " + data.wind.speed);

      // APPEND each text element to the the main div for display
      currentCity.append(currentCityName);
      currentCity.append(currentIcon);
      currentCity.append(description);
      currentCity.append(currentTemp);
      currentCity.append(feelsLike);
      currentCity.append(humidity);
      currentCity.append(wind);

      localStorage.setItem("cityInput", cityInput);
      var cityHistory = localStorage.getItem("cityInput");

//       console.log(cityHistory);

      $("#search-history").append(`
      <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">
    ${cityHistory}
  </a>
        `);


    });

    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityInput +
      "&appid=1a201dc845b8d910adc7977e4bac7b00&units=imperial";

    // AJAX call/fetch the FIVE DAY API data we're requesting to gather the data 
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (data) {
      // EMPTY out this div between searches
      $(".forecastDisplay").empty();

      // TEMPLATE LITERALS to create and append the H3 title

      $(".display").empty();
      $(".display").append(`
        <h3> Five Day Forecast: </h3>
        `);

      // FOR LOOP iterates over the data the API returns for the 5day forecast. Using Template Literals the data is then displayed ( like 76 )
      for (var i = 0; i < data.list.length; i += 8) {
        var date = moment(data.list[i].dt_txt).format("L");
        var temp = "Temp: " + data.list[i].main.temp + "°F";
        var humidity = "Humidity: " + data.list[i].main.humidity + "%";
        var forecastIcon = data.list[i].weather[0].icon;
        var fiveDayIcons =
          "http://openweathermap.org/img/w/" + forecastIcon + ".png";

        // TEMPLATE LITERALS to create and append
        $(".forecastDisplay").append(`
            <div class= "col mb-4">
                <div id= "forecastDate" class= "card">${date}
                    <img id= "fiveIcon" src = "${fiveDayIcons}" width="60";>
                    <p>${temp}</p>
                    <p>${humidity}</p>
                </div>
            </div>
            `);
      }
    });
  };

  // On click, updated the onclick 
  $("#search-btn").on("click", getWeather);
});
