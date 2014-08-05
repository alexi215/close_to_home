
(function( mapPage, $ ) {
  console.log("maps.js firing");
  var map, placeSearch, autocomplete, geocoder;

  
  function initialize() {
    var canvas = document.getElementById( "map-canvas" );
    map = renderMap( canvas );
    geocoder = new google.maps.Geocoder();
    
    getCrimeData();

    getLocationFromDb()
      .then( drawLocationsFromDb );

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
    var longitude = place.geometry.location.B;
    var latitude = place.geometry.location.k;
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);

    locationCollection.create({
      latitude: latitude,
      longitude: longitude
    });

    placeMarker( latLng );
  }

  function placeMarker( searchLatLng ) {
    var iconBase = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    new google.maps.Marker({
      position: searchLatLng,
      map: map,
      icon: iconBase
    });
  }

  function getLocationFromDb() {
    console.log('getLocationFromDb');
    return $.ajax({
      dataType: "json",
      type: "get",
      url: window.location.pathname + '/locations'
    });
  }
  
  function drawLocationsFromDb( locations ) {
    for ( var i = 0; i < locations.length; i++ ) {
      var location = locations[i];
      var pin = new google.maps.LatLng(location.latitude, location.longitude);
      placeMarker( pin );
    }
  }

// ============== CRIME FUNCTIONS ============== //
// ============================================= //

// Pull crime data from Rails
  function getCrimeData() {
    $.ajax({
      url: '/crimes',
      type: 'GET',
      dataType: 'json'
    }).then(drawCrimes);
  }

  function drawCrimes(pin) {
    for ( var i = 0; i < pin.length; i++ ){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pin[i].latitude, pin[i].longitude),
        map: map
      });
    }
  }

// ============== CRIME FUNCTIONS ============== //
// ============================================= //

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
