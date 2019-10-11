// Or with jQuery
 $(document).ready(function(){
    $('.carousel').carousel();
  var firebaseConfig = {
    apiKey: "AIzaSyCbdMUvQGzxT7u2VSA-tP09Jo6WgzqeNDA",
    authDomain: "sunny-day-b106f.firebaseapp.com",
    databaseURL: "https://sunny-day-b106f.firebaseio.com",
    projectId: "sunny-day-b106f",
    storageBucket: "",
    messagingSenderId: "75744760770",
    appId: "1:75744760770:web:4fe6c84e964a411276bc5b",
    measurementId: "G-S16M0MNF0J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var search;

  //carousel features
  $('.carousel').carousel();

  
  $(".results").hide();
  $("#search-button").on("click", function (event) {
    event.preventDefault();

    $(".results").show();

    search = $("#search-event").val().trim();

    database.ref().push({

      search: search,

    });


   

    var currentDate = new Date();
    var endDate = moment(currentDate).add(5, 'days').format("YYYY-MM-DD");
    var startDate = moment(currentDate).format("YYYY-MM-DD");
    console.log(startDate)
    console.log(endDate)
    var queryURl = "https://api.stubhub.com/sellers/search/events/v3?q=" + search + "&dateLocal=" + startDate +"TO" + endDate + "&city=Atlanta";
    $.ajax({
        method: "GET",
        url: queryURl,
        headers: {
          Authorization: "Bearer A0cvfZsGTDdB1nyqgQ68SpoGdOWC"
        }
      })
      .then(function (response) {
        var results = response;
        console.log(results)
        console.log(results.events.length)
        for (var i = 0; i < results.events.length; i++) {
          var eventName = results.events[i].name;
          var eventVenue = results.events[i].venue.name;
          var minTicketPrice = results.events[i].ticketInfo.minListPrice;
          var maxTicketPrice = results.events[i].ticketInfo.maxListPrice;
          var eventDate = results.events[i].eventDateLocal;
          var prettyDate = moment(eventDate).format('MMMM Do YYYY, h:mm a');
            console.log(eventName)
            console.log(eventVenue)
            console.log(minTicketPrice)
            console.log(maxTicketPrice)
            console.log(prettyDate)
          
        var searchResults =`
            <div class="row">
              <div class="col m4">
                <div class="card">
                  <div class="card-image">
                  <img src="assets/images/Atlanta_Skyline_from_Buckhead.jpg">
                    <span class="card-title">${eventName}</span>
                  </div>
                  <div class="Information">
                      <p>${minTicketPrice}</p>
                      <p>${maxTicketPrice}</p>
                      <p>${eventVenue}</p>
                      <img>${"insert google map images"}</img>
                  </div>
                </div>
              </div>
            </div>
            `;
          
            $(".results-card").append(searchResults);
          
        }
      })




  });

  //API call for weather//----------------------------------------------------------------------------------------------------------

  // This is the API key for Open Weather
  var APIKey = "b7b907c1b8d2d7c447d6c40de9d6cb86";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=atlanta,us&mode=json&units=imperial&APPID=" + APIKey

  // AJAX call to the OpenWeatherMap API
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {

      // Log the resulting object
      console.log(response);

      //for loop to dynamically create and display table with data from API for the weather
      for (var i = 0; i < 40; i+=8) {

        var row = $("<tr>");
        row.addClass("row");
        row.attr("data-row", [i]);

        var rowDisplay = $("<td>");
        rowDisplay.addClass("resultsTime");
        rowDisplay.attr("time", response.list[i].dt_txt)

        var rowtwoDisplay = $("<td>");
        rowtwoDisplay.addClass("resultsTemp")
        rowtwoDisplay.attr("temp", response.list[i].main.temp)

        var rowthreeDisplay = $("<td>");
        rowthreeDisplay.addClass("resultsDesc")
        var formatWords = response.list[i].weather[0].description
        var formatWordsUpper = formatWords.toUpperCase();
        rowthreeDisplay.attr("desc", formatWordsUpper)

        var rowfourDisplay = $("<td>");
        rowfourDisplay.addClass("humid")
        rowfourDisplay.attr("humid", response.list[i].main.humidity)

        //var ashley = document.querySelectorAll('[data-row]')
        row.append(rowDisplay)
        row.append(rowtwoDisplay)
        row.append(rowthreeDisplay)
        row.append(rowfourDisplay)
        $("#dynamicTable").append(row)

        //conversion of time from data payload to readable string in HTML
        var timestamp = response.list[i].dt_txt;
        var formatted = moment(timestamp).format('LL')
        //console.log(formatted);

        //show data to table in HTML
        var weatherone = $(".resultsTime").text(formatted);
        var weathertwo = $(".resultsTemp").text("Temp: " + response.list[i].main.temp + " deg F ");
        var weatherthree = $(".resultsDesc").text(formatWordsUpper);
        var weatherfour = $(".humid").text("Humidity: " + response.list[i].main.humidity);
      }

    });
})