(function() {
  var geocodeLatLng;

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

  $(document).ready(function() {
    rate(gon.restaurant, false);
    return $('.attachinary-input').attachinary();
  });

  google.maps.event.addDomListener(window, 'load', function() {
    var er, map1, options, showmap, succ;
    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    succ = function(pos) {
      var crd;
      crd = pos.coords;
      return showmap(crd.latitude, crd.longitude);
    };
    er = function(ps) {
      return console.log("pos unavialeble");
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(succ, er, options);
      map1 = succ;
    } else {
      map1 = showmap(46.4711427, 30.7396057);
    }
    return showmap = function(latl, lngl) {
      var map, marker;
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: latl,
          lng: lngl
        },
        zoom: 15
      });
      marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        position: {
          lat: gon.restaurant.x || 30.7396057,
          lng: gon.restaurant.y || 30.7396057
        }
      });
      google.maps.event.addListener(map1, 'click', function(event) {
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
    };
  });

}).call(this);
