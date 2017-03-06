"use strict";

const readlineSync = require('readline-sync');
const readline = require('readline');

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
    });

    socket.on('welcome-msg', (response) => {
      console.log("<Server>: ", response.data);
      start_chat(socket);
    });

    socket.on('server-msg', (response) => {
      console.log("<Server>: ", response.data);
    });

    socket.on("client-msg", (response) => {
      console.log("<" + response.username + ">: " + response.message);
    });
  };

  return module;
};

function start_chat(socket){
  console.log("Starting chat, write \".exit\" to stop.");
  let continue_chat = true;
  const readlineInterface = getReadlineInterface();
  show_prompt(readlineInterface, socket);
}

function getReadlineInterface(){
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

function show_prompt(readlineInterface, socket){
  readlineInterface.question("$> ", (input) => {
    switch(input){
      case ".exit":
        process.exit();
      break;
      default:
        socket.emit("client-msg", {username: username, message: input});
        show_prompt(readlineInterface, socket);
    }
  });
}
