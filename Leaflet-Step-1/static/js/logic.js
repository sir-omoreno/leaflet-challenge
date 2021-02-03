//Setting URL variable. In this case pulling data for the last 7 days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// d3.json(url, function (data) {
//     createFeatures(data.features)
// })

//Creating a function to create the map:
function createMap(earthquake) {
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    })

    var overlapMaps = {
        Earthquakes: earthquakes
    }
    var myMap = L.map("mapid", {
        center: [37.09, -99.71],
        zoom: 5
        // layers: [streetmap, earthquakes]
    }).addTo(myMap);
}
createMap(earthquake)
// // Creating map object
// var myMap = L.map("mapid", {
//     center: [39.502754, -98.452221],
//     zoom: 5
//   });
  
//   // Adding a tile layer (the background map image) to our map
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);