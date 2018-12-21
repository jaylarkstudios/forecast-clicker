
// Add your weather app id here
//var WEATHER_APPID = "";

var geocoder;
var map;
var marker;
var omadi;

function initMap() {
    omadi = new google.maps.LatLng(40.430471, -111.881574);
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: omadi
    });
    
    marker = new google.maps.Marker({
        position: omadi,
        map: map,
        draggable: true
    });
    
    map.addListener('click', function(e) {
        marker.setPosition(e.latLng);
        centerMap(e.latLng);
    });
    
    marker.addListener('dragend', function(e) {
        centerMap(e.latLng);
    });
}

function centerMap(location){
    map.panTo(location);
    codeCoordinates(location);
}

function codeCoordinates(location) {
    geocoder.geocode({'location': location}, function(results, status){
        if (status == 'OK') {
            //console.log('geocode success', results);
            updateWeatherStats(results[0].geometry.location, getCityName(results));
        } else {
            console.warn('Geocode unsuccessful', status);
        }
    })
}

function kelvinToFarenheit(tempK){
    return 1.8*(tempK - 273) + 32;
}

function getCityName(geocodeResults){
    var address = geocodeResults[0].address_components;
    //console.log('address', address);
    for (var i=0; i<address.length; i++) {
        var c = address[i];
        //console.log('address component', c);
        if (c.types.includes("locality")){
            return c.long_name;
        }
    }
    return null;
}

function getTimeString(seconds){
    var date = new Date(seconds * 1000);
    //console.log('date', date);
    var min = date.getMinutes();
    return date.getHours() + ":" + (min < 10 ? "0" : "") + min;
}

function updateWeatherStats(location, city){
    //console.log(location);
    $.ajax({
        type: 'GET',
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + location.lat() + "&lon=" + location.lng() + "&appid=" + WEATHER_APPID,
        //url: "http://api.openweathermap.org/data/2.5/weather?lat=-25.344&lon=131.036&appid=15473ff2f5108c77c45e3cd4e64cf6e6",
        success: function(data){
            //console.log("weather success", data);
            $('#weather-location').html(city);
            $('#weather-condition').html(data.weather[0].main);
            $('#weather-temperature').html(kelvinToFarenheit(data.main.temp).toFixed(0)+" ℉");
            $('#weather-humidity').html(data.main.humidity + "%");
            $('#weather-sunrise').html(getTimeString(data.sys.sunrise));
            $('#weather-sunset').html(getTimeString(data.sys.sunset));
            $('#weather-windspeed').html(data.wind.speed + " mph");
            $('#weather-winddirection').html(data.wind.deg + " degree" + (data.wind.deg > 1 ? "s" : ""));
        }
    });
}


$(document).ready(function() {
    $("#map").hide(0).fadeIn(1000);
    updateWeatherStats(omadi, "Lehi");
});
