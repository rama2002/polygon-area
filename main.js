function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 31.033, lng: 36.54 },
    mapTypeId: "terrain",
  });

  let polygonCoords = [];
  let bounds = new google.maps.LatLngBounds();
  let areaInfoWindow = null;
  let anglesInfoWindow = [];
  let polygon = new google.maps.Polygon({
    paths: polygonCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  polygon.setMap(map);

  map.addListener("click", (mapsMouseEvent) => {
    polygon.setMap(null);
    polygonCoords.push(mapsMouseEvent.latLng);
    polygon = new google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
    polygon.setMap(map);
    let infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      `${mapsMouseEvent.latLng.lng()} ${mapsMouseEvent.latLng.lat()}`
    );
    infoWindow.open(map);
    anglesInfoWindow.push(infoWindow);
    bounds.extend(mapsMouseEvent.latLng);
    if (areaInfoWindow)
      areaInfoWindow.close();
    areaInfoWindow = new google.maps.InfoWindow({
      position: bounds.getCenter(),
    });
    areaInfoWindow.setContent(
      `area: ${google.maps.geometry.spherical.computeArea(polygon.getPath())}`
    );
    areaInfoWindow.open(map);
    console.log(bounds.getCenter());
  });

  document.body.addEventListener('keypress', function (e) {
    if (e.key == "q") {
      if (areaInfoWindow)
        areaInfoWindow.close();

      anglesInfoWindow.forEach(iw => {
        iw.close();
      });

      polygonCoords = [];
      bounds = new google.maps.LatLngBounds();
      areaInfoWindow = null;
      anglesInfoWindow = [];
      polygon.setMap(null);
      polygon = new google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });
    }
  });

}

window.initMap = initMap;