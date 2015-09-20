var map, heatmap;
var pickupPoints = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 46.87895748955729, lng: -96.79799879663642},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  generatePickupHeatMap();

          heatmap = new google.maps.visualization.HeatmapLayer({
            data: pickupPoints,
            map: map
        });
  
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function generatePickupHeatMap(){
    $.getJSON("taxi.json", function(data){
        for (var i = 0; i < data.length; i++) {
            pickupPoints.push(new google.maps.LatLng(data[i]["pickup"]["location"][0], data[i]["pickup"]["location"][1]));
        };

        toggleHeatmap();
        toggleHeatmap();
    });
}