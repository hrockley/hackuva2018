
function initMap() {
  var uluru = {lat: 40.0, lng: -85.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4.5,
    center: uluru,
    disableDefaultUI: true
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
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
      }
  });
})

function getSearch(){
  var location = $("#search").val();
  console.log("location: " + location);
  $("#welcome").text("" + location);
  newImage();
}

function newImage(){
  let imageNew = "http://www.utdallas.edu/housing/img/floorplan/b3.png";
  $("#fp").css('display', 'inline')
  $("#fp").attr('src', imageNew);
}
