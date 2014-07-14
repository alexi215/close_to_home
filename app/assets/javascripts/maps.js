
$(document).ready(function() {
  console.log("maps.js firing");
  var map;

  var canvas = document.getElementById( "map-canvas" );
  map = renderMap( canvas );

  function renderMap ( el ) {
    var mapOptions = {
      center: new google.maps.LatLng(38.904853, -77.034003),
      zoom: 12
    };

  var map = new google.maps.Map( el, mapOptions );
  // return map;
  }

  initialize();
});



