console.log("main.js firing");

var locationCollection = new LocationCollection();

$(function() {
  locationCollection.fetch();
});
