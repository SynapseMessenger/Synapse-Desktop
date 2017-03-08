"use strict";

const io = require('socket.io')();

const chat_server = require('./app/chat_server.js')(io);

io.on('connection', (socket) => {
  let username = socket.handshake.query.username;
  if(username){
    chat_server.handle_client_connection(socket, username);
  } else {
    socket.disconnect(0);
  }
});

io.listen(9090);
