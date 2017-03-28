$(document).ready(function() {
  $(':checkbox').iphoneStyle({
    onChange: function(elem,val) {
      $('span#status').html(val.toString());
      if (val) {
        socket.emit('publish', {topic:"led",payload:"on"});
      } else {
        socket.emit('publish', {topic:"led",payload:"off"});
      }
    }
  });

  var socket = io('https://192.168.1.61:8443');
  socket.on('connect', function () {
    socket.on('mqtt', function (msg) {
      console.log(msg.topic+' '+msg.payload);
      /*
      if (msg.payload == "off") {
       
        if ($('input[name=led]').is(':checked')) {
          $('input[name=led]').prop('checked',false).change();
        }
      }
      if (msg.payload == "on") {
        if (!$('input[name=led]').is(':checked')) {
          $('input[name=led]').prop('checked',true).change();
        }
      }
      */
 
    });
    socket.emit('subscribe',{topic:'led'});
  });
});
/*

These 7 measurements can be structured in a topic hierarchy:

Home/Outdoor/Temperature
Home/Outdoor/Humidity
Home/Garage/Temperature
Home/Garage/Humidity
Home/GroundFloor/Temperature
Home/GroundFloor/Humidity
Home/GroundFloor/PlantStatus
*/
