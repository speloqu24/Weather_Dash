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
            var currentTemp = $("<h4>");
            var feelsLike = $("<h4>");
            var description = $("<p>")
            var currentIcon = $("<img>")
            var weatherIcon = data.weather[0].icon;
            var icons = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
            // assign the text

        currentIcon.attr("src", icons);

        currentCityName.text(data.name)
        currentTemp.text("Actual: " + (data.main.temp));
        feelsLike.text("Feels Like: " + (data.main.feels_like));
        description.text(data.weather[0].description)

        currentCity.append(currentCityName)
        currentCity.append(currentIcon)
        currentCity.append(description)
        currentCity.append(currentTemp)
        currentCity.append(feelsLike)

        })

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=1a201dc845b8d910adc7977e4bac7b00&units=imperial";

        $.ajax ( {
            url: forecastURL,
            method: "GET",
        }).then (function (data){
            console.log(data)
        
        var cardDiv = $("#card-display");    
            
        for (var i = 0; i < data.list.length; i+=8) {
            var cardContext = 
                    // var temp = document.createElement("p")
            

            date.textContent = data.list[i].dt_txt;
            console.log(data.list[i].dt_txt)
                    // temp.textContent = data.list[i].main.temp;
            fiveDayCard.append(date)
                    // fiveDayCard.append(temp)


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