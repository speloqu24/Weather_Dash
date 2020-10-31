$(document).ready(function() {


    var getCurrent = function () {
        $("#current-display").empty();

        var cityInput = $("#search-input").val().trim();
        var requestWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=1a201dc845b8d910adc7977e4bac7b00&units=imperial";
        
        $.ajax ({
            url: requestWeather,
            method: "GET",
        }).then (function (data){
            console.log(data)
            // div everything is located in 
            var currentCity = $("#current-display");
            var currentCityName = $("<h1>");
            var currentTemp = $("<p>");
            var feelsLike = $("<p>");
            var humidity = $ ("<p>");
            var description = $("<h5>");
            var wind = $("<p>");
            var currentIcon = $("<img>")
            var weatherIcon = data.weather[0].icon;
            var icons = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
            
        
        
        currentIcon.attr("src", icons);

        currentCityName.text(data.name)
        currentTemp.text("Actual: " + (data.main.temp) + "°F");
        feelsLike.text("Feels Like: " + (data.main.feels_like) + "°F");
        description.text(data.weather[0].description)
        humidity.text("Humidity: " + (data.main.humidity) + "%");
        wind.text("Wind Speed: " + (data.wind.speed));

        currentCity.append(currentCityName)
        currentCity.append(currentIcon)
        currentCity.append(description)
        currentCity.append(currentTemp)
        currentCity.append(feelsLike)
        currentCity.append(humidity)
        currentCity.append(wind)

        })

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=1a201dc845b8d910adc7977e4bac7b00&units=imperial";

        $.ajax ( {
            url: forecastURL,
            method: "GET",
        }).then (function (data){
            console.log(data)
        
        // var cardDiv = $("#card-display");  
        
        $(".forecastDisplay").empty();

        $(".display").append(`
        <h3> Five Day Forecast: </h3>
        `)

        
        
        for (var i = 0; i < data.list.length; i+=8) {
            
            var date = data.list[i].dt_txt;
            var temp = data.list[i].main.temp + "°F"
            var forecastIcon = data.list[i].weather[0].icon;
            var fiveDayIcons = "http://openweathermap.org/img/w/" + forecastIcon + ".png";
            console.log(fiveDayIcons)

            $(".forecastDisplay").append(`
            <div class= "col mb-4">
                <div class= "card">${date}
                <img src = "${fiveDayIcons}" width="50";>
                <p>${temp}</p>
                </div>
            </div>
            `)

            // var cardContext = 
            //         // var temp = document.createElement("p")
            

            // date.textContent = data.list[i].dt_txt;
            // console.log(data.list[i].dt_txt)
            //         // temp.textContent = data.list[i].main.temp;
            // fiveDayCard.append(date)
            //         // fiveDayCard.append(temp)


                }

        })



    }


// var getForecast = function (){ 

// var forecastURL = 

// $.ajax({
//     url: 

// })


// }







    // On click
    $("#search-btn").on("click", getCurrent);
    // $("#search-btn").on("click", getForecast);

});