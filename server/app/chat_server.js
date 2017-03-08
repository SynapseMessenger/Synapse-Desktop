"use strict";

const socketIo = require('socket.io');

module.exports = class ChatServer {
  constructor(port) {
    this.io = socketIo();
    this.port = port || 9090;
  }

  start(){
    this.listenConnections();

    this.io.listen(this.port);
  }

  listenConnections(){
    this.io.on('connection', (socket) => {
      let username = socket.handshake.query.username;
      if(username){
        this.handleClientConnection(socket, username);
      } else {
        socket.disconnect(0);
      }
    });
  }

  handleClientConnection(socket, username){
    printUserEvent(username, "entered the chat");
    socket.emit('welcome-msg', { data: "Welcome to Synapse, " + username + "."});
    this.listenClientEvents(socket, username);
  }

  listenClientEvents(socket, username){
    socket.on('client-msg', (client_message) => {
      socket.broadcast.emit('client-msg', client_message);
    });
 
    socket.on('disconnect', () => {
      printUserEvent(username, "disconnected")
    });
  }
}

function printUserEvent(username, event){
    console.log( "<" + username + "> " + event + "." );
}
