import germanCities from './lon-lat.js';
import numberToDate from './toFomatDate.js'


$(document).ready(function () {

  // this function replaces the shorthand form of weather to its meaning
  function shortToLong(weather) {
    // this library is written based on data given from "7timer" API
    switch (weather) {
      case "clear":
        return "Clear";
      case "pcloudy":
        return "Partly Cloudy";
      case "mcloudy":
        return "Mostly Cloudy";
      case "cloudy":
        return "Cloudy";
      case "fog":
        return "Foggy";
      case "lightrain":
        return "Light rain or showers"
      case "oshower":
        return "Occasional showers";
      case "ishower":
        return "Isolated showers";
      case "lightsnow":
        return "Light or occasional snow";
      case "rain":
        return "Rain";
      case "snow":
        return "Snow";
      case "rainsnow":
        return "Mixed";
      case "tstorm":
        return "Thunderstorm possible";
      case "tsrain":
        return "Thunderstorm";
      case "windy":
        return "Windy";
      default:
        throw new Error('some cases are wrong!')
    }
  }

  // To fetch weather data based on city's latitude and longitude when the user click on the the citys name list
  const dataRequst = async (object) => {
    try {
      const response = await fetch(`https://www.7timer.info/bin/api.pl?lon=${object.longitude}&lat=${object.latitude}&product=civillight&output=json`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const currentWeather = data.dataseries; // Assuming first data is current
      console.log(currentWeather)

      // Clear previous output
      $("#days").empty();

      // Display weather information alongside the city name
      currentWeather.forEach(day => {
        $("#days").append(`<article class="card mb-3" style="width: 8rem;">
                        <div class="text-center my-2">
                          <date>${numberToDate(day.date)}</date>
                        </div>
                        <img src='./images/${day.weather}.png' class="card-img-top p-2" alt="${day.weather}">
                        <div class="card-body text-center">
                            <strong class="card-text">${shortToLong(day.weather)}</strong>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Max: ${day.temp2m.max} ºC</li>
                            <li class="list-group-item">Min: ${day.temp2m.min} ºC</li>
                            <li class="list-group-item">Wind: ${day.wind10m_max} ºC</li>
                        </ul>
                    </article>`);
      })
    } catch (error) {
      console.error('Error:', error.message);
      listItem.append("<p>Weather data unavailable</p>");
    }
  }

  // Loop through the imorted cities and create list items inside the select button
  germanCities.forEach(city => {
    $("#cities").append(`<li><a class="dropdown-item" href="#">${city.name}<a></li>`);
  });

  // Handle city selection
  $("#cities li a").click(function () {

    // Make current list empty and show loading until data be gotten
    $("#days").empty();
    $("#days").append('<p>Loading...</p>')

    //To show data after 1 second
    const selectedCity = germanCities.find(city => city.name === $(this).text());
    $('#select-btn').text(selectedCity.name) //show the name on button
    setTimeout(() => {
      dataRequst(selectedCity);
    }, 1000)

  });
});






