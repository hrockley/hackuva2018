var imageUrl;
var latitude;
var longitude;
var placeX;
var placeY;
var floor;
var map;
var loca;

var changed = false;

function initMap() {
  var uluru = {lat: 40.0, lng: -85.044};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4.5,
    center: uluru,
    disableDefaultUI: true
  });
  google.maps.event.addListener(map, 'click', function(event) {
    //placeMarker(map, event.latLng);
  });
}

$(function(){
  changeHeight();

  function changeHeight(){
    let HEIGHT = $(window).height() + "px";

    console.log(HEIGHT);
    $("#map").css("height", HEIGHT);
  }

  $("#search").keyup(function(event) {
      if (event.keyCode === 13) {
          $(".button").click();
          var loc = $("#search").val();
          console.log(loc)
          database.ref("alarms/" + loc).on('value', (snap)=> {
            var snapshot = snap.val()
            imageUrl = snapshot.imageUrl;
            console.log(imageUrl);
            console.log(snapshot);
            latitude = snapshot.location.lat;
            longitude = snapshot.location.long;
            placeX = snapshot.place.xLoc;
            placeY = snapshot.place.yLoc;
            floor = snapshot.floor;
            console.log(loca);
            changed = true;
          })
      }
  });
})

function getSearch(){
  var location = $("#search").val();
  console.log("location: " + location);
  $("#welcome").text("" + location);
  newImage();
}

function newImage(image){
  let imageNew = image;
  $("#fp").css('display', 'inline');
  $("#fp").css('height', '310px');
  $("#fp").css('width', '240px');
  $("#fp").attr('src', imageNew);
  draw();
}

function placeMarker(map, location) {
  var marker = new google.maps.Marker({
    position: location, //{lat: -20.0, lng: 131.0}
    map: map
  });
}

function removeMarker(){
  marker.setMap(null);
}

setInterval(()=> {
  if(changed) {
    changed = false;
    console.log(imageUrl);
    newImage(imageUrl)
    loca = {lat: latitude, lng: longitude};
    placeMarker(map,loca);
    changeIntro();
  }
}, 500)

function draw(){
  var img = document.getElementById("fp");
  var cnvs = document.getElementById("canvas");

  cnvs.style.position = "absolute";
  cnvs.style.left = img.offsetLeft + "px";
  cnvs.style.top = img.offsetTop + "px";

  var ctx = cnvs.getContext("2d");
  //ctx.beginPath();
  // ctx.arc(placeX, placeY, 10, 0, 2 * Math.PI, false);
  // ctx.lineWidth = 3;
  ctx.fillStyle = '#ff0000';
  console.log("placeX: " + placeX + " placeY: " + placeY);
  ctx.fillRect(placeX+5,placeY-145,10,5);
  ctx.stroke();
}

function changeIntro(){
  $("#intro-paragraph").text("" + "Latitude: " + latitude + "\nLongitude: " + longitude + "\nFloor: " + floor);
}
