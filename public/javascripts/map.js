 var map;

 function initMap() {
     var directionsService = new google.maps.DirectionsService;
     var directionsDisplay = new google.maps.DirectionsRenderer;



     var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 6,
         center: {
             lat: 41.85,
             lng: -87.65
         }
     });
     var myLatLng = {
         lat: 48.420741,
         lng: -89.245473
     };

     var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: 'Test!!'
     });
     var m = <%- email %>;
     alert(m);
 }

 function addmarker(lati, lngi) {
     alert('test');
     var myLatLng = {
         lat: lati,
         lng: lngi


     };
     var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         title: 'Hello World!'
     });


 }