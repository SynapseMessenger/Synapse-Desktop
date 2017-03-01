var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Welcome to synapse');
});

io.on('connection', function(socket) {
	console.log("User connected");

	socket.emit('server-msg', { data: "Welcome to Synapse." });

	socket.on('msg', function(content) {
		io.emit('receive', content);
	});

	socket.on('disconnect', function(){
		console.log('User disconnected');
	});
});

http.listen(9090, function(){
	console.log('Server listening to 9090.')
});