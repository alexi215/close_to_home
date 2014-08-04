
console.log("model.js firing");
// Location Data Model:
var Location = Backbone.Model.extend({
  defaults: {
    label: '',
    address: '',
    radius: '',
    latitude: '',
    longitude: '',
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
    ward: '',
    latitude: '',
    longitude: ''
  }
});

var CrimeCollection = Backbone.Collection.extend({
  model: Crime,
  url: '/crimes'
});
