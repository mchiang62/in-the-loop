// Or with jQuery

$(document).ready(function () {
  $('.carousel').carousel();



  $(".datepicker").datepicker({
    // add date range?

  });

  $("#search-button").on("click", function (event) {
    event.preventDefault();

     $("#search-event").val().trim();
     
  });




});