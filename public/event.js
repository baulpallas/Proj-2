function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  // let yPlace = new google.maps.LatLng(40.742985, -73.986938);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let xPlace = new google.maps.LatLng(latitude, longitude);

    const midpoint = google.maps.geometry.spherical.interpolate(
      xPlace,
      yPlace,
      0.5
    );

    convertToAddress(midpoint);

    console.log(JSON.stringify(midpoint));
    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

let GeocoderRequest = {};
let convertedAddress;
var geocoder = new google.maps.Geocoder();
function convertToAddress(address) {
  GeocoderRequest.location = address;
  geocoder.geocode(GeocoderRequest, function(results, status) {
    convertedAddress = results[0].formatted_address;
    console.log(convertedAddress);
  });
}
document.querySelector("#find-me").addEventListener("click", geoFindMe);
