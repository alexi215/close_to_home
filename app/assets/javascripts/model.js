
console.log("model.js firing");
// Location Data Model:
var Location = Backbone.Model.extend({
  defaults: {
    label: '',
    address: '',
    radius: '',
    lat: '',
    lng: '',
    user_id: ''
  }
});

var LocationCollection = Backbone.Collection.extend({
  url: window.location.pathname + '/locations',
  model: Location
});

var Crime = Backbone.Model.extend({
  defaults: {
    date: '',
    address: '',
    offense: '',
    method: '',
    ward: ''
  }
});

var CrimeCollection = Backbone.Collection.extend({
  url: '/crimes',
  model: Crime
});
