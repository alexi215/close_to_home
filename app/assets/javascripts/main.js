console.log("main.js firing");

var locationCollection = new LocationCollection();
var crimeCollection = new CrimeCollection();

$(function() {
  locationCollection.fetch();
  crimeCollection.fetch();
});
