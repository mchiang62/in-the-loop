$(document).ready(function(){
    $('.carousel').carousel();

      
//initialization for collasping container
//collapse bar features
    $('.collapsible').collapsible();
    $(".results").hide();
    $("#search-button").on("click", function(){
      $(".results").show();
    });

//carousel features
  $('.carousel').carousel();

  $(".datepicker").datepicker({
    // add date range?

  });

  $("#search-button").on("click", function (event) {
    event.preventDefault();
     $("#search-event").val().trim();
     
  });
//API call for weather 
 // This is the API key for Open Weather
 var APIKey = "b7b907c1b8d2d7c447d6c40de9d6cb86";
 var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=atlanta,us&mode=json&units=imperial&APPID=" + APIKey

 // AJAX call to the OpenWeatherMap API
 $.ajax({
   url: queryURL,
   method: "GET"
 })
   .then(function(response) {

// Log the resulting object
  console.log(response);

// Transfer content to HTML
   //  $("#time-one").html("<p>" + response.list[0].dt);
   //  $("#humidity-one").html("<p>" + "Humidity: " + response.list[0].main.humidity);
  //   $("#temp-one").html("<p>" + response.list[0].main.temp + " degrees F");
   //  $("#description-one").html("<p>" + response.list[0].weather[0].description);


for(var i=0; i<5; i++){

var row=$("<tr>")
var rowDisplay= $("<td>");
rowDisplay.addClass("resultsTime");
rowDisplay.attr("time", response.list[0].dt)

var rowtwoDisplay= $("<td>");
rowtwoDisplay.addClass("resultsTemp")
rowtwoDisplay.attr("temp", response.list[0].main.temp)

var rowthreeDisplay=$("<td>");
rowthreeDisplay.addClass("resultsDesc")
rowthreeDisplay.attr("desc", response.list[0].weather[0].description)

var rowfourDisplay=$("<td>");
rowfourDisplay.addClass("humid")
rowfourDisplay.attr("humid",response.list[0].main.humidity)

row.append(rowDisplay)
row.append(rowtwoDisplay)
row.append(rowthreeDisplay)
row.append(rowfourDisplay)
$("#dynamicTable").append(row)

var weatherone = $(".resultsTime").text(response.list[0].dt);
var weathertwo = $(".resultsTemp").text(response.list[0].main.temp);
var weatherthree = $(".resultsDesc").text(response.list[0].weather[0].description);
var weatherfour = $(".humid").text(response.list[0].main.humidity);
}
    });

});

