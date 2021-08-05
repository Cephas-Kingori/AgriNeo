 // cephas public api key for maps
 mapboxgl.accessToken = 'pk.eyJ1IjoiY2VwaGFzLWtpbmciLCJhIjoiY2s3dGpnd2YxMHZ0YzNtb3VoenNmbmlrYyJ9.xojeHRyzsIqupEenk6nDGw';
    
 // set the original coordinates
 var original_lat = -1.28549;
 var original_long = 36.82142;
 // get the coordinates of the marker
 var coordinates = document.getElementById('coordinates');

 var map = new mapboxgl.Map({
     container: 'map', // container id
     style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location

     // camera options properties - https://docs.mapbox.com/help/glossary/camera/

     // camera is set at an angle and is focused on Nairobi

     center: [36.82142, -1.28549], // starting position [lng, lat]

        //disabled because users may find the bearing difficult to remove
        // it looks nice though for a navigation style map

     //pitch: 60, //degrees
     //bearing: 90, //degrees
     zoom: 12 // starting zoom
 });
// control on getting the location of the user
// Initialize the geolocate control.
var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);

// try locating the user on load
map.on('load', function() {

geolocate.trigger();

});



geolocate.on('geolocate', function(e) {
   var long = e.coords.longitude;
   var lat = e.coords.latitude;
    // change the marker to the user's location once the the geolocation is activated
    marker.on('geolocate').setLngLat([long, lat]);

    coordinates.style.display = 'block';
    coordinates.innerHTML =
    'Longitude: ' + long + '<br />Latitude: ' + lat;
    
    document.getElementById('long').value = long;
    document.getElementById('lat').value = lat;
});


     // creating the marker and setting it to the location of Nairobi cbd
 var marker = new mapboxgl.Marker({
     draggable: true,
     color: 'orange'
     })
     .setLngLat([original_long, original_lat])
     .addTo(map);
     
     function onDragEnd() {
     var lngLat = marker.getLngLat();
     coordinates.style.display = 'block';
     coordinates.innerHTML =
     'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;

     //obtaining the co-ordinates
     var longitude = lngLat.lng;
     var latitude = lngLat.lat;

     document.getElementById('long').value = longitude;
     document.getElementById('lat').value = latitude;
     }
     
 marker.on('dragend', onDragEnd);

  //Create  the search box
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: {
        color: 'orange'
    },
    placeholder: "Locations in Kenya",
    //limit search to kenya
    countries: 'ke'
    });
    // control the search box 
 map.addControl(geocoder, 'top-left');

 // On search, change the location of the orange marker to the location of the blue one (the one searched)
 geocoder.on('result', function(e) {
    geocoder.clear();
    var long = e.result.center[0];
    var lat = e.result.center[1];

    marker.setLngLat(e.result.center);

    coordinates.style.display = 'block';
    coordinates.innerHTML =
    'Longitude: ' + long + '<br />Latitude: ' + lat;
    
    document.getElementById('long').value = long;
    document.getElementById('lat').value = lat;
 });

 //add compass and navigation
 var nav = new mapboxgl.NavigationControl();
 map.addControl(nav, 'top-right');

 $('document').ready(function(){
    setTimeout(function(){
        map.resize();
    }, 8000);
 
});

 //////////////////////////// End of Mapbox Functions ///////////////////////////////////////////


/*  ****************************  Open Weather Map  API ********************************* */
const form = document.getElementById('weatherForm');

const apiKey = "4d6df78011ac548d43caecc4657d434b";

// once the form is submitted start processing it

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const form_longitude = document.getElementById('long').value;

    const form_latitude = document.getElementById('lat').value;
 

    const parent_div = document.getElementById("long_term_weather_cards");

    const short_term_cards = document.getElementsByClassName("owl-wrapper")[0];
    

    parent_div.replaceChildren();
    

    // AJAX call to open weather API for a 30 day forecast
    const url = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${form_latitude}&lon=${form_longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())

    .then(data => {
       
        const {city, population, list} = data;

        const name = city.name;
        const country = city.country;
        
        for(var i = 0; i < list.length; i++){
            const current_list = list[i];

            const weather = current_list.weather[0]["description"];
            var icon_id = current_list.weather[0]["icon"];
            const icon = `https://openweathermap.org/img/wn/${icon_id}@2x.png`;
        
            var rain = current_list.rain;
            if (rain){
                //good
            }else{
                rain = "n/a";
            }
            const humidity = current_list.humidity;
            const max = current_list.temp.max;
            const min = current_list.temp.min;
            var dt_forecast = current_list.dt;
            dt_forecast = timeConverter(dt_forecast);
            
            const weather_card = document.createElement("div");
            weather_card.classList.add("col-xl-3");
            weather_card.classList.add("col-sm-6");
            weather_card.classList.add("mb-3");
    
            const inner_weather_card = document.createElement("div");
            inner_weather_card.classList.add("video-card");

            const markup = `<br>
            <h6 class="video-title" data-name="${name},${country}" style="margin-left: 1em">
              <span>${name}</span>
              <sup style="background: orange; color: white; top: 0em">${country}</sup>
            </h6>
            <div class="city-temp" style="margin-left: 1em;"><h6>Max: ${Math.round(max)}<sup>°C</sup> Min: ${Math.round(min)}<sup>°C</sup></h6></div>
            <div class="city-temp" style="margin-left: 1em"><h6>Humidity: ${Math.round(humidity)} % <br> Expected Rain in (mm): ${rain}</h6></div>
            <figure>
              <img class="city-icon" src=${icon} alt=${weather}>
              <figcaption style="margin-left: 1em; color: blue; font-size: larger;">${weather}</figcaption>
            </figure>
            <span style="margin-left: 1em; color: blue;">Date of forecast: ${dt_forecast}</span> <br><br>
          `;

          
            inner_weather_card.innerHTML = markup;
            weather_card.appendChild(inner_weather_card);
            parent_div.appendChild(weather_card);
        }
      })
      .catch( e => {
        console.log("Error: =>>");
        console.log(e);
      });
 ////////////////////////  End of long term weather forecast          ///////////////////////////////////

 /* ********************    Short term weather    ********************* */
      const url2 = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${form_latitude}&lon=${form_longitude}&appid=${apiKey}&units=metric`;
      
      fetch(url2)
      .then(response => response.json())
      .then(data => {
        const {list} = data;
        for(var i = 0; i <list.length; i++){
            const current_list = list[i];
            var date = current_list.dt;
            date = timeConverter(date);
            var time_of_day = current_list.sys.pod;
            if (time_of_day == "n"){
                time_of_day = "PM";
            }else{
                time_of_day = "AM";
            }
            var lowest = current_list.main.temp_min;
            var highest = current_list.main.temp_max;
            var humid = current_list.main.humidity;
            var description = current_list.weather[0]["description"];
            var icon_id = current_list.weather[0]["icon"];
            const icon =  `https://openweathermap.org/img/wn/${icon_id}@2x.png`;
            var cloudiness = current_list.clouds.all;
            var probability = current_list.pop;
            //var rain_amount = current_list.rain.1h;

            const corousel_div = document.getElementById("item"+i);
            corousel_div.replaceChildren();

            const one_corousel = document.createElement("div");
            
            one_corousel.classList.add("category-item");
          
            const markup2 = `<div class="video-card" >
            <br>
            <div class="city-temp" style="margin-left: 1em;">
                <h6>Max: ${Math.round(highest)}<sup>°C</sup> Min: ${Math.round(lowest)}<sup>°C</sup></h6>
            </div>

            <div class="city-temp" style="margin-left: 1em">
                <h6>Humidity: ${Math.round(humid)} % <br> Cloudiness: ${cloudiness}</h6>
            </div>

            <figure>
                <img class="city-icon" src=${icon} alt=${description}>
                <figcaption style="margin-left: 1em; color: blue; font-size: larger;">${description}</figcaption>
            </figure>
 
            <span style="margin-left: 1em; font-size: larger" class="video-page text-success">Expected rain (mm): ${probability}</span> <br>
            <span style="margin-left: 1em; color: blue;">Date of forecast: ${date}</span> <br><br>
            </div>
            `;

          
            one_corousel.innerHTML = markup2;
            corousel_div.appendChild(one_corousel);
            //short_term_cards.appendChild(corousel_div);

            
        }
      })
      .catch( e => {
        console.log("Error2: =>>");
        console.log(e);
      });

});




function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }