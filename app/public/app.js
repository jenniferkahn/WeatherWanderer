//Initial Load
window.onload = function initialLoad() {
    currentLocation = {
        city: "",
        country: ""
    };
    //Response that includes the location of the user's device
    $.get("https://ipinfo.io", function (response) {
        currentLocation.city = response.city;
        currentLocation.country = response.country;
        // console.log(currentLocation);

        //Initial api call to get the local weather.
        $.get(`/api/weather?loc=${currentLocation.city} ${currentLocation.country}`, function (data) {

            //Populate the page with local weater infoß
            var weatherInfo = data[0];
            // console.log(weatherInfo);

            $("#status").html(weatherInfo.current.skytext);
            $("#city").html(weatherInfo.location.name);

            $("#temperature").html(weatherInfo.current.temperature);
            $("<span>").html(`&deg;`).appendTo($("#temperature"))


            $(".feels-like").html(`Feels Like: `).append($("<span>").attr("id", 'feels-like'));
            $(".wind").html(`Wind: `).append($("<span>").attr("id", "wind"));
            $(".humidity").html(`Humidity: `).append($("<span>").attr("id", "humidity"));

            $("#feels-like").html(`${weatherInfo.current.feelslike}&deg;`);
            $("#wind").html(weatherInfo.current.windspeed);
            $("#humidity").html(`${weatherInfo.current.temperature}&percnt;`);

            for (var i = 2; i < 5; i++) {
                var li = $("<li>");
                var h3 = $("<h3>").html(weatherInfo.forecast[i].day);
                var avgTemp = Math.round((Number(weatherInfo.forecast[i].high) + Number(weatherInfo.forecast[i].low)) / 2);
                var p = $("<p>").html(`${avgTemp}&deg;`).attr("id", `forecast0${i}`)

                h3.appendTo(li);
                p.appendTo(li);
                li.appendTo($(".forecast"));
            }

            //Use the weather type to query an artsy image from unsplash
            var weatherType = data[0].current.skytext
            weatherType = weatherType.replace(/\s+/g, '-');
            console.log(weatherType);
            getWeatherPhoto(weatherType);
        });
    }, "jsonp");
}

function getWeatherPhoto(weatherType) {
    if (weatherType == "T-Storms") {
        weatherType = "thunderstorm"
    }
    client_id = "8bfc6dcba2eee8b7cc53b56bf1013b34d92fa8909f414eda9ea9c57dec0cba5f";
    $.get(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weatherType}&client_id=${client_id}`, function (data) {
        $()
        console.log(data.urls.regular)
        $("#weatherPhoto").attr('src', data.urls.regular);
    });
}

$("#search").focusout(function(e) {
    inputLocation = $("#search").val();
        $("#search").val("")
        if (inputLocation) {
            updateWeather();

        }
});
$("#search").on('keyup', function (e) {
    if (e.keyCode == 13) {
        inputLocation = $("#search").val();
        $("#search").val("")
        if (inputLocation) {
            updateWeather();

        }
    }
});

function updateWeather() {
    $.get(`/api/weather?loc=${inputLocation}`, function (data) {
        //Populate the page with local weater infoß
        var weatherInfo = data[0];
        console.log(weatherInfo);

        $("#status").html(weatherInfo.current.skytext);
        $("#city").html(weatherInfo.location.name);

        $("#temperature").html(weatherInfo.current.temperature);
        $("<span>").html(`&deg;`).appendTo($("#temperature"))


        $(".feels-like").html(`Feels Like: `).append($("<span>").attr("id", 'feels-like'));
        $(".wind").html(`Wind: `).append($("<span>").attr("id", "wind"));
        $(".humidity").html(`Humidity: `).append($("<span>").attr("id", "humidity"));

        $("#feels-like").html(`${weatherInfo.current.feelslike}&deg;`);
        $("#wind").html(weatherInfo.current.windspeed);
        $("#humidity").html(`${weatherInfo.current.temperature}&percnt;`);

        $(".forecast").html('')
        for (var i = 2; i < 5; i++) {
            var li = $("<li>");
            var h3 = $("<h3>").html(weatherInfo.forecast[i].day);
            var avgTemp = Math.round((Number(weatherInfo.forecast[i].high) + Number(weatherInfo.forecast[i].low)) / 2);
            var p = $("<p>").html(`${avgTemp}&deg;`).attr("id", `forecast0${i}`)

            h3.appendTo(li);
            p.appendTo(li);
            li.appendTo($(".forecast"));
        }

        //Use the weather type to query an artsy image from unsplash
        var weatherType = data[0].current.skytext
        weatherType = weatherType.replace(/\s+/g, '-');
        console.log(weatherType);
        getWeatherPhoto(weatherType);
    });
}

