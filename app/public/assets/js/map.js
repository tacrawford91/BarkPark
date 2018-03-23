var map;
var infowindow;
var myMarker = [];
var my
var socket = io.connect("http://localhost:3000");

function initMap() {
    var chicago = {
        lat: 41.8781,
        lng: -87.6298
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 12
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos)
            var locationMarker = new google.maps.Marker({
                map: map,
                label: "You are here"

            })
            locationMarker.setPosition(pos)
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(locationMarker, 'click', function() {
                infowindow.setContent("Your Location");
                infowindow.open(map, locationMarker);
            });
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    createMarker(addMarker)

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function createMarker(callback) {
    $.get("/api/parkall").then(function(data) {
        callback(data)

    })
}

function addMarker(data) {
    var icon = {
        url: "assets/image/dog2.png",
        labelOrigin: new google.maps.Point(15, -8),
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        id: 1 // origin
    }
    for (var i = 0; i < data.length; i++) {
        var location = {
            lat: Number(data[i].address_lat),
            lng: Number(data[i].address_long)
        };
        var cnt = new google.maps.LatLng(location);
        var marker = new google.maps.Marker({
            map: map,
            label: {
                color: "red",
                text: data[i].dog_count.toString()
            },

            icon: icon

        })
        marker.set("id", 1);
        marker.setPosition(cnt);
        myMarker.push(marker);
        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                // $.post("/api/park"+data[i].id,{},function(res){            // })
                $("#updateTime").empty()
                marker.setAnimation(google.maps.Animation.BOUNCE)
                setTimeout(function() { marker.setAnimation(null); }, 2000);
                var id = Number(i) + 1
                $.get("/api/user/park/" + id, function(myData) {
                    $("#userInfor").empty()
                    var image = new Image();
                    console.log(myData)
                    myData.forEach(element => {
                        var userDiv = $("<div>").addClass("userDiv"); // $("#userInfor").append(JSON.stringify(element["dog_name"]).replace(/\"/g, "") + "<br>")("userDiv");
                        var userImg = $("<img>").attr("src", element.picture).addClass("userImg");
                        var userName = $("<h4>").addClass("userName").text(element.dog_name);
                        var userBreed = $("<h4>").addClass("userBreed").text(element.breed);
                        var userOwner = $("<h5>").addClass("userOwner").text(`Owner: ${element.owner_Name}`);
                        var userThumbsUp = $("<h4>").addClass("userThumbsUp").html(`<i class="fa fa-thumbs-up" aria-hidden="true"></i>: ${element.thumbsUp}`);
                        var userThumbsDown = $("<h4>").addClass("userThumbsDown").html(`<i class="fa fa-thumbs-down" aria-hidden="true"></i>: ${element.thumbsDown}`);
                        userDiv.append(userImg, userName, userBreed, userOwner, userThumbsUp, userThumbsDown);
                        $("#userInfor").append(userDiv);
                    });
                })
                var indexPlusOne = Number(i) + 1
                $.get("/api/park/" + indexPlusOne, function(dataBack) {
                    // parkHeaderDiv.append(data[i].park_name + "<br>");
                    var lastUpdatedTime = dataBack["updatedAt"];
                    lastUpdatedTime = lastUpdatedTime.slice(0, 10) + " " + lastUpdatedTime.slice(11, 19);
                    var timeDiff = Math.floor((Date.now() - new Date(lastUpdatedTime).getTime()) / (1000 * 60 * 60) + 5);
                    var parkHeaderDiv = $("<div>").addClass("parkHeaderDiv");
                    var parkNameDiv = $("<div>").addClass("parkNameDiv");
                    var parkName = $("<h2>").addClass("parkName").text(data[i].park_name);
                    parkNameDiv.append(parkName);
                    var updatedInfo = $("<h3>").addClass("lastUpdated").text()
                    if (timeDiff < 1) {
                        // parkHeaderDiv.append("Updated less than an hour ago");
                        // $("#updateTime").append(parkHeaderDiv)
                        var updatedInfo = $("<h3>").addClass("lastUpdated").text("Updated less than an hour ago")
                        parkHeaderDiv.append(parkNameDiv, updatedInfo)
                        $("#updateTime").append(parkHeaderDiv);
                    } else {
                        // parkHeaderDiv.append("Updated " + timeDiff + " hours ago");
                        // $("#updateTime").append(parkHeaderDiv);
                        var updatedInfo = $("<h3>").addClass("lastUpdated").text("Updated " + timeDiff + " hours ago")
                        parkHeaderDiv.append(parkNameDiv, updatedInfo)
                        $("#updateTime").append(parkHeaderDiv);
                    }
                })
            }
        })(marker, i));
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infowindow.setContent(data[i].park_name);
                infowindow.open(map, marker);
            }
        })(marker, i));
        google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
            return function() {
                infowindow.close()
            }
        })(marker, i));
        socket.on("dogCountUpdate", function(data) {
            console.log(data.data.dogCountUpdate.marker);
            var mymark = myMarker[data.data.dogCountUpdate.marker]
                // console.log(mymark)
            $.ajax({
                url: `/api/park/${data.data.dogCountUpdate.parkID}`,
                method: "GET"
            }).then((data) => {
                var newLabel = {
                    color: "red",
                    text: data.dog_count.toString()
                }
                mymark.setLabel(newLabel)

            })
        })
    }
}

function setNumber(marker) {
    marker.setLabel()
}
$("#addClass").click(function() {
    $('#sidebar_secondary').addClass('popup-box-on');
});
$("#removeClass").click(function() {
    $('#sidebar_secondary').removeClass('popup-box-on');
});
$(".chat_sidebar").draggable()