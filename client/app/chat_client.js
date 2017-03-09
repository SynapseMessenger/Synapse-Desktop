"use strict";

const readline = require('readline');
const SignalCipher = require('./signal_cipher.js')

module.exports = class ChatClient {
  constructor(username, serverUrl, port){
    this.username = username || "anonymous";
    this.serverUrl = serverUrl || "http://localhost:9090";
    if(!serverUrl && port) this.serverUrl = "http://localhost:" + port;
    this.io = require('socket.io-client');
    this.cipher = new SignalCipher(this.username);
  }

  connect(){
    console.log("Attempting connection as " + this.username + ", to " + this.serverUrl);
    this.socket = this.io.connect(this.serverUrl, { query: "username=" + this.username } );
    this.listenServerEvents();
  }

  listenServerEvents(){
    this.socket.on('connect', () => {
      console.log("Connection established.");
    });

    this.socket.on('welcome-msg', (response) => {
      console.log("<Server>: ", response.data);
      this.startChat();
    });

    this.socket.on('server-msg', (response) => {
      console.log("<Server>: ", response.data);
    });

    this.socket.on("client-msg", (response) => {
      console.log("<" + response.username + ">: " + response.message);
    });

    this.socket.on("establish-session", (sessionData) => {
      this.cipher.buildSession(sessionData).then(() => {
        // encrypt messages.
      }).catch(() => {
        // handle error.
      });
    });
  }

  startChat(){
    console.log("Starting chat, write \".exit\" to stop.");
    this.readlineInterface = readline.createInterface({
                                                        input: process.stdin, output: process.stdout
                                                      });
    this.showPrompt();
  }

  showPrompt(){
    this.readlineInterface.question("$> ", (input) => {
      switch(input){
        case ".exit":
          this.disconnect();
        break;
        default:
          this.socket.emit("client-msg", {username: this.username, message: input});
          this.showPrompt();
      }
    });
  }

  disconnect(){
    process.exit();
  }
}
