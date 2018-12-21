
// Add your weather app id here
//var WEATHER_APPID = "";

function initMap() {
    var uluru = {lat: -25.344, lng: 131.036};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function displayWeather(data){
    console.log("success", data);
}


$(document).ready(function() {
    $("#map").hide(0).fadeIn(1000);
    
    var lat = -25.344;
    var lon = 131.036;
    $.ajax({
        type: 'GET',
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + WEATHER_APPID,
        //url: "http://api.openweathermap.org/data/2.5/weather?lat=-25.344&lon=131.036&appid=15473ff2f5108c77c45e3cd4e64cf6e6",
        success: function(data){
            console.log("success", data);
            $('#weather-location').html("x-location");
            $('#weather-condition').html(data.weather[0].main);
            $('#weather-temperature').html(data.main.temp);
            $('#weather-humidity').html(data.main.humidity);
            $('#weather-sunrise').html(data.sys.sunrise);
            $('#weather-sunset').html(data.sys.sunset);
            $('#weather-windspeed').html(data.wind.speed);
            $('#weather-winddirection').html(data.wind.deg);
        }
    })
});
