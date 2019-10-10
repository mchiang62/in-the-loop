// Or with jQuery

// Or with jQuery
 $(document).ready(function(){
    $('.carousel').carousel();

      
  //initialization for collasping container
    $('.collapsible').collapsible();
    $(".results").hide();

    $("#search-button").on("click", function(){
      $(".results").show();
    });
//need to create click event with images as well to show div


  });
$(document).ready(function () {
  $('.carousel').carousel();



  $(".datepicker").datepicker({
    // add date range?

  });

  $("#search-button").on("click", function (event) {
    event.preventDefault();

     $("#search-event").val().trim();

     var query = $("#search-event").val().trim();
     var queryURl = "https://api.stubhub.com/sellers/search/events/v3?q=" + query +"&city=Atlanta&state=GA&country=US"
     $.ajax({
        
       url: queryURl,
       
       headers: {
        Authorization: "Bearer A0cvfZsGTDdB1nyqgQ68SpoGdOWC"
       },
       method: "GET"
       
     })
    
        .then(function(response) {
          var results = response.data;
          console.log(results);
          for (var i = 0; i < 5; i++) {

          }

        })

  });




});
