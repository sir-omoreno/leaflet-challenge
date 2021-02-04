//Setting URL variable. In this case pulling data for the last 7 days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//Hard code colors and limits for magnitude of depth size
//color codes from https://htmlcolorcodes.com/color-chart/
var colors = ['#66FF00', '#CCFF33', '#FFCC33', '#FF9933', '#FF9900', '#FF0000'];
var limits = [-10, 10, 30, 50, 70, 90];


// d3.json(url, function (data) {
//     createFeatures(data.features)
// })

// Creating map object
var myMap = L.map("mapid", {
    center: [39.502754, -98.452221],
    zoom: 5
});

// Adding a tile layer (the background map image) to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

//Create function to colorize eathquake depth
function getColor(d) {
    for (var i = 0; i < limits.length; i++) {
        if (d < limits[i]) {
            return colors[i - 1];
        }
        else if (d > limits[limits.length - 1]) {
            return colors[limits.length - 1];
        }
    }
}

//Grabbing data with D3 function
d3.json(url, function (data) {
    console.log(data);
    //
    var earthquakeData = data.features;
    // Looping through all the JSON data
    for (var i = 0; i < earthquakeData.length; i++) {
        var eathquake_location = earthquakeData[i].geometry;

        if (eathquake_location) {
            L.circleMarker([eathquake_location.coordinates[1], eathquake_location.coordinates[0]], {
                fillOpacity: 0.50,
                color: "white",
                weight: 0.5,
                // Here we are geting the color based on the depth of the earthquake 
                // referenced starting on line 28
                fillColor: getColor(eathquake_location.coordinates[2]),
                // Adjust radius based on magnitude
                radius: earthquakeData[i].properties.mag * 5
            }).bindPopup("<h>Magnitude: " + earthquakeData[i].properties.mag
                + "<br>Depth: " + eathquake_location.coordinates[2]
                + " kms</h2><hr><strong>Location: </strong>" + earthquakeData[i].properties.place)
                .addTo(myMap);
        }
    }
});

//Addind the legend

var legend = L.control({ position: 'topright' });

legend.onAdd = function (myMap) {
  // create div for legend
  var div = L.DomUtil.create('div', 'info legend');

  // add title for legend
  div.innerHTML = '<h5>Median Pet Age<br>per Organization</h5>';

  div.innerHTML += '<i style="background:' + adultPetColor + '"></i> Adult Pet<br>';
  div.innerHTML += '<i style="background:' + otherPetColor + '"></i> Other Pet<br>';
 
  return div;
}

// Adding legend to the map
legend.addTo(myMap);