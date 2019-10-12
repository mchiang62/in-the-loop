// Or with jQuery
 $(document).ready(function(){
  
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
   // console.log(startDate)
    //console.log(endDate)
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
       // console.log(results)
       // console.log(results.events.length)
        $(".results-card").empty();
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

        var repSpace = eventVenue.split(" ").join("+");
          console.log(repSpace)
          
        var searchResults =`
            <div class="row">
              <div class="col s8 m4">
                <div class="card">
                  <div class="card-image">
                    <img src="assets/images/Atlanta_Skyline_from_Buckhead.jpg">
                      <span class="card-title">${eventName}</span>
                    </div>
                    <div class="event-info">
                      <p><strong>Lowest ticket price: </strong>$${minTicketPrice}</p>
                      <p><strong>Highest ticket price: </strong>$${maxTicketPrice}</p>
                      <p><strong>Event Venue: </strong>${eventVenue}</p>
                      <p><strong>Date/Time of Event: </strong>${prettyDate}</p>
                    </div>
                    <div class="map">
                      <iframe width="350" height="250" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=
                        &q=${repSpace}" allowfullscreen>
                      </iframe>
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
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=houston,us&mode=json&units=imperial&APPID=" + APIKey

  // AJAX call to the OpenWeatherMap API
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {

      //for loop to dynamically create and display table with data from API for the weather
      for (var i = 0; i < 40; i+=8) {

 var temp = response.list[i].main.temp
 var formatWords = response.list[i].weather[0].description
 var formatWordsUpper = formatWords.toUpperCase();
 var timestamp = response.list[i].dt_txt;
 var formatted = moment(timestamp).format('LL');
 var humid = response.list[i].main.humidity;

 var demoTable = ` 
      <tr>
          <td> ${formatted}</td>
          <td>${temp} deg. F</td>
          <td>${formatWordsUpper}</td>
          <td>${humid}%</td>
          <td>${picWeather()}</td>
      </tr>
    
   ` 
 
   function picWeather(){
    if (temp >= "70" && formatWordsUpper.includes("CLOUDS")===false && formatWordsUpper.includes("RAIN")===false){
      return (`<img src="assets/images/sun.jpg" alt="sun" width="40" height="40">`);
    } else if (formatWordsUpper.includes("RAIN")=== true){
      return (`<img src="assets/images/rain.jpg" alt="rain" width="40" height="40">`);
    } else if (temp <= "65"){
      return (`<img src="assets/images/frost.jpg" alt="frost" width="40" height="40">`);
    } else if (formatWordsUpper.includes("CLOUDS") === true){
      return (`<img src="assets/images/clouds.jpg" alt="clouds" width="40" height="40">`);
    } else if(temp >= "70" && formatWordsUpper.includes("CLOUDS") === true){
      return (`<img src="assets/images/brokencloudssun.jpg" alt="clouds" width="40" height="40">`)
    } else{
      return (`<img src="assets/images/goodday.jpg" alt="clouds" width="40" height="40">`);
    }
    
}

   
$("#dynamicTable").append(demoTable);
 picWeather();



      }

    });
})