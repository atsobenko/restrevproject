(function() {
  var geocodeLatLng;

  $(document).ready(function() {
    rate(gon.restaurant, false);
    return $('.attachinary-input').attachinary();
  });

  google.maps.event.addDomListener(window, 'load', function() {
    var marker;
    initmap();
    marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      draggable: true,
      position: {
        lat: gon.restaurant.x,
        lng: gon.restaurant.y
      }
    });
    google.maps.event.addListener(map, 'click', function(event) {
      marker.setPosition(event.latLng);
      $('#lat').val(event.latLng.lat());
      $('#lng').val(event.latLng.lng());
      return geocodeLatLng(event.latLng);
    });
    return google.maps.event.addListener(marker, 'dragend', function(event) {
      $('#lat').val(event.latLng.lat());
      $('#lng').val(event.latLng.lng());
      return geocodeLatLng(marker.getPosition);
    });
  });

  geocodeLatLng = function(pos) {
    return $.ajax('https://geocode-maps.yandex.ru/1.x/', {
      data: {
        sco: 'latlong',
        format: 'json',
        geocode: (pos.lat()) + ", " + (pos.lng())
      },
      dataType: 'json'
    }).done(function(result) {
      return $('input[name="review[address]"]').val(result.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AddressLine);
    });
  };

}).call(this);