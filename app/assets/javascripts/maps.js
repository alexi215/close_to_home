
$(function() {
  var map;

  function initialize() {
    var canvas = document.getElementById( "map-cavas" );
    map = renderMap( canvas );
  }

  function renderMap ( el ) {
    var mapOptions = {
      center: new google.maps.LatLng(38.904853, -77.034003),
      zoom: 12
    };
  
  var map = new google.maps.Map( el, mapOptions );
  return map;
  }

  initialize();
});
// END of map.js

// Google Instructions
// function initialize() {
//   var map_canvas = document.getElementById("map_canvas");
//   var map_options = {
//     center: new google.maps.LatLng(44.5403, -78.5463),
//     zoom: 8,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   var map = new google.maps.Map(map_canvas, map_options);
// }
// google.maps.event.addDomListener(window, 'load', initialize);
