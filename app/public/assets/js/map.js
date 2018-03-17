var map;
var infowindow;
var myMarker = [];
var newMarker2 = [];
var lat = [];
var long = [];
var parkName = [];
var address = [];

function initMap() {
    var chicago = {
        lat: 41.8781,
        lng: -87.6298
    };
    var icon = {
        url: "../image/dog.png",
        labelOrigin: new google.maps.Point(9, -8),
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0), // origin
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 11
    });
    var autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (
            document.getElementById('pac-input')));
    $("#pac-input").keyup(function(e) {
        if (e.KeyCode = 13) {
            if ($("#pac-input").val() == "") {
                addMarkers();
                removeMarker2();
            }
        }
    })
    var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
    google.maps.event.addListener(searchBox, "places_changed", function() {
        removeMarkers()
        var marker2 = new google.maps.Marker({
            map: map,
            icon: icon
                // label: {
                //     color: "red",
                //     text: place.number.toString()
                // },
        });
        var places = searchBox.getPlaces()
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(places[0].geometry.location);
        marker2.setPosition(places[0].geometry.location);
        google.maps.event.addListener(marker2, 'click', function() {
            infowindow.setContent(places[0].name);
            infowindow.open(map, this);
        });
        map.fitBounds(bounds);
        map.setZoom(10)
        newMarker2.push(marker2);
        for (var j = 0; j < newMarker2.length; j++) {
            if (j === 0) {
                newMarker2[0].setVisible(true)
            } else {
                newMarker2[j].setVisible(true)
                newMarker2[j - 1].setVisible(false)
            }
        }
    });
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: chicago,
        radius: 100000,
        keyword: "dog park"
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            results[i].number = i;
            createMarker(results[i]);
        }
        // $.ajax({
        // console.log(myMarker)
        // $.post("/api/park", { "address": address }, function(data) {
        //         console.log("nice")
        //     })
        // })
    }
}

function createMarker(place) {
    console.log(place)
    var placeLoc = place.geometry.location;
    var icon = {
        url: "./dog.png",
        labelOrigin: new google.maps.Point(9, -8),
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(11, 40)
    }
    var marker = new google.maps.Marker({
        map: map,
        position: placeLoc,
        label: {
            color: "red",
            text: place.number.toString()
        },
        icon: icon,
    });
    myMarker.push(marker);
    lat.push(marker.position.lat())
    long.push(marker.position.lng())
    parkName.push(place.name)
    address.push(place.vicinity)
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function removeMarkers() {
    for (var i = 0; i < myMarker.length; i++) {
        myMarker[i].setVisible(false);
    }
}

function addMarkers() {
    for (var k = 0; k < myMarker.length; k++) {
        myMarker[k].setVisible(true);
    }
}

function removeMarker2() {
    for (var l = 0; l < newMarker2.length; l++) {
        newMarker2[l].setVisible(false);
    }
}
$("#addClass").click(function() {
    $('#sidebar_secondary').addClass('popup-box-on');
});
$("#removeClass").click(function() {
    $('#sidebar_secondary').removeClass('popup-box-on');
});