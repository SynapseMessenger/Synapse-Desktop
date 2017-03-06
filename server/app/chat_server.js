"use strict";

module.exports = (io) => {

  module.handle_client_connection = function(socket, username) {

    console.log( "<" + username + "> entered the chat.");

    socket.emit('welcome-msg', { data: "Welcome to Synapse, " + username + "."});

    socket.on('client-msg', (client_message) => {
      socket.broadcast.emit('client-msg', client_message);
    });
 
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

  };

  return module;

}
