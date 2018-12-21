
// Add your weather app id here
//var WEATHER_APPID = "";

var currentLoc;

function initMap() {
    var omadi = {lat: 40.430471, lng: -111.881574};
    currentLoc = omadi;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: omadi
    });
    
    var marker = new google.maps.Marker({
        position: omadi,
        map: map
    });
}

function displayWeather(data){
    console.log("success", data);
}

function kelvinToFarenheit(tempK){
    return 1.8*(tempK - 273) + 32;
}


$(document).ready(function() {
    $("#map").hide(0).fadeIn(1000);
    
    $.ajax({
        type: 'GET',
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + currentLoc.lat + "&lon=" + currentLoc.lng + "&appid=" + WEATHER_APPID,
        //url: "http://api.openweathermap.org/data/2.5/weather?lat=-25.344&lon=131.036&appid=15473ff2f5108c77c45e3cd4e64cf6e6",
        success: function(data){
            console.log("success", data);
            $('#weather-location').html("x-location");
            $('#weather-condition').html(data.weather[0].main);
            $('#weather-temperature').html(kelvinToFarenheit(data.main.temp).toFixed(0)+" ℉");
            $('#weather-humidity').html(data.main.humidity);
            $('#weather-sunrise').html(data.sys.sunrise);
            $('#weather-sunset').html(data.sys.sunset);
            $('#weather-windspeed').html(data.wind.speed);
            $('#weather-winddirection').html(data.wind.deg);
        }
    })
});
