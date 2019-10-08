
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