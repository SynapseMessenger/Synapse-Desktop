"use strict";

module.exports = (io) => {

  module.handle_client_connection = function(socket) {

    let username = socket.handshake.query.username

    console.log( "<" + username + "> entered the chat.");

    socket.emit('server-msg', { data: "Welcome to Synapse, " + username + "."});

    socket.on('msg', (content) => {
      //console.log('content: ', content);
      socket.emit('server-msg', content);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

  };

  return module;

}
