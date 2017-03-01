var ioClient = require('socket.io-client');

var serverURL = 'http://localhost:9090';
var socket = ioClient.connect(serverURL);

socket.on('connect', function(){
	console.log("Connected to server.");
})

socket.on('server-msg', function(response){
	console.log("Received: ", response.data);
})

