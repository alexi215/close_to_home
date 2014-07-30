
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
    var longitude = place.geometry.location.k;
    var latitude = place.geometry.location.B;
    console.log("Lat/Long test: " + latLng);

    locationCollection.create({
      lat: latitude,
      lng: longitude
    });

    placeMarker( latLng );
  }

  function placeMarker( searchLatLng ) {
    new google.maps.Marker({
      position: searchLatLng,
      map: map
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
      var pin = new google.maps.LatLng(location.lng, location.lat);
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
    }).then( drawCrimeData );
  }

// Draw Crime Data
  function drawCrimeData( addresses ) {
    for ( var i = 0; i < addresses.length; i++ ) {
      convertAddress(addresses[i]);
    }
  }

// Use google's geocoder to convert addresses to LAT/LONGs
  function convertAddress( location ) {

      debugger
    geocoder.geocode( { 'location': location.address }, function(results, status ) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode not successful: " + status);
      }
    });
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
