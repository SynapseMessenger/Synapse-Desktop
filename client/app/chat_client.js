"use strict";

const readlineSync = require('readline-sync');

let username = "";

module.exports = (io_client, server_url) => {

  module.define_username = function() {
    do {
      username = readlineSync.question("Define username: ");
    } while (!username);
  };

  module.connect_to_server = function(){
    console.log("Attempting connection as ", username);

    const socket = io_client.connect(server_url, { query: "username=" + username } );

    socket.on('connect', () => {
      console.log("Connection established.");
      //socket.emit('msg', 'placeholder');
    });

    socket.on('server-msg', (response) => {
      console.log("Received: ", response.data);
    });
  };

  return module;
};
