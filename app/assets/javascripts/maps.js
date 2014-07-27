
(function( mapPage, $ ) {
  console.log("maps.js firing");
  var map, placeSearch, autocomplete;

  
  function initialize() {
    var canvas = document.getElementById( "map-canvas" );
    map = renderMap( canvas );

    getLocationFromDb()
      .then( drawLocationsFromDb );
    
    drawCrimes(latLng );

    // Google Search library:
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });
    // When the user selects an address from the dropdown,
    // grab the address for (1) persistance to DB, (2) placement on map, and (3) display on saved location list
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      grabAddress();
    
    });
  }

  function renderMap ( el ) {
    console.log('renderMap');
    var mapOptions = {
      center: new google.maps.LatLng(38.904853, -77.034003),
      zoom: 12
    };

    var map = new google.maps.Map( el, mapOptions );
    return map;
  }

  // Get the place details from the autocomplete object.
  function grabAddress() {
    var place = autocomplete.getPlace();
    var latLng = place.geometry.location;
    var longitude = place.geometry.location.k;
    var latitude = place.geometry.location.B;
    console.log("Lat/Long test: " + latLng);

    locationCollection.create({
      lat: latitude,
      lng: longitude
    });

    placeMarker( latLng );
  }
// ============= CRIMES =============//
  function drawCrimes( locations ) {
    console.log('drawCrimes');
    var crimes = getCrimeData.getPlace();
    var latLng = crimes.geometry.location;
    console.log("Crime Lat/long: " + latLng);

    for ( var i = 0; i < crimes.length; i++ ) {
      var crime = crimes[i];
      var pin = new google.maps.LatLng(location.lng, location.lat);
      placeMarker( pin );
    }
  }

  function getCrimeData() {
    console.log('getCrimeData');
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'crimes'
    });
  }
// ============= CRIMES =============//

  function placeMarker( searchLatLng ) {
    new google.maps.Marker({
      position: searchLatLng,
      map: map
    });
  }

  function getLocationFromDb() {
    return $.ajax({
      dataType: "json",
      type: "GET",
      url: window.location.pathname + '/locations'
    });
  }
  
  function drawLocationsFromDb( locations ) {
    for ( var i = 0; i < locations.length; i++ ) {
      var location = locations[i];
      var pin = new google.maps.LatLng(location.lng, location.lat);
      placeMarker( pin );
    }
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  mapPage.geolocate = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
            autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
            geolocation));
      });
    }
  };

  initialize();
}( window.mapPage = window.mapPage || {}, jQuery ));

