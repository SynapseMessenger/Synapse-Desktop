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
  let username = socket.handshake.query.username;
  if(username){
    chat_server.handle_client_connection(socket, username);
  } else {
    socket.disconnect(0);
  }
});

http.listen(9090, () => {
	console.log('Server listening to 9090.')
});
