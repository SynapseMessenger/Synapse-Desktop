"use strict";

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const chat_server = require('./app/chat_server.js')(io);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('Welcome to synapse');
});

io.on('connection', (socket) => {
	chat_server.handle_client_connection(socket);
});

http.listen(9090, () => {
	console.log('Server listening to 9090.')
});
