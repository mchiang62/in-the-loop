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
function weather(){
  for (var i=0; i>5; i++){
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
     $("#time").html("<p>" + response.list[i].dt);
     $("#humidity").html("<p>" + "Humidity: " + response.list[i].main.humidity);
     $("#temp").html("<p>" + response.list[i].main.temp + " degrees F");
     $("#description").html("<p>" + response.list[i].weather[0].description);

   

});

}}
weather();

});