var fs = require('fs');
var https = require('https');
var path = require('path');
var socketio = require('socket.io');

var mqtt = require('mqtt');
var express = require('express'); 
//var jayson = require('jayson');
var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
  //ca: fs.readFileSync(path.join(__dirname, "keys", "ca.crt")),
  requestCert: true,
  rejectUnauthorized: false
};
var app = express();
var client  = mqtt.connect('mqtt://192.168.1.61') 
// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));
//app.route('/').get(function(req,res,next) {res.json({name:"salem"})});
var server = https.createServer(options,app);
var io = socketio.listen(server);
io.on('connection', function (socket) {
  // socket connection indicates what mqtt topic to subscribe to in data.topic
  socket.on('subscribe', function (data) {
    console.log('Subscribing to '+data.topic);
    client.subscribe(data.topic);
  });
  // when socket connection publishes a message, forward that message
  // the the mqtt broker
  socket.on('publish', function (data) {
    console.log('Publishing to '+data.topic);
    client.publish(data.topic,data.payload);
  });
});
//client.on('connect', function () {});
/*
var wpi = require('wiring-pi')
wpi.setup('wpi');
var pin = 0;
wpi.pinMode(0, wpi.OUTPUT);
*/
// listen to messages coming from the mqtt broker
client.on('message', function (topic, payload, packet) {
  //client.end()
  console.log(topic+'='+payload);
  if (payload=="off") {
    var value = 0;
    wpi.digitalWrite(pin, value);
    io.emit('mqtt',{'topic':String(topic),'payload':String(payload)});
  }else{
    var value = 1;
    wpi.digitalWrite(pin, value);
    io.emit('mqtt',{'topic':String(topic),'payload':String(payload)});
  }
});

server.listen(8443,function () {
  console.log('--');
})