console.log("main.js firing");

$(function() {
  var locationCollection = new LocationCollection();
  locationCollection.fetch();
});
