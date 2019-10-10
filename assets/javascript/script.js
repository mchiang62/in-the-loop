// Or with jQuery

// Or with jQuery
$(document).ready(function () {
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


  $('.carousel').carousel();

  $(".datepicker").datepicker({
    // add date range?
  });


  //initialization for collasping container
  $('.collapsible').collapsible();
  $(".results").hide();

  $("#search-button").on("click", function () {
    event.preventDefault();

    search = $("#search-event").val().trim();

    database.ref().push ({

      search: search, 


    });




    $(".results").show();
  
  
  
  
  });
  //need to create click event with images as well to show div





});

    

    

 