"use strict";

const io = require('socket.io-client');

const readline = require('readline');
// const SignalCipher = require('./signal_cipher.js')

module.exports = class ChatClient {
  constructor(username, serverUrl, port, updateView){
    this.username = username || "anonymous";
    this.serverUrl = serverUrl || "http://localhost:9090";
    this.updateView = updateView;
    this.connected = false;
    if(!serverUrl && port) this.serverUrl = "http://localhost:" + port;
    // this.cipher = new SignalCipher(this.username);
  }

  connect(){
    console.log("Attempting connection as " + this.username + ", to " + this.serverUrl);
    this.socket = io.connect(this.serverUrl, { query: "username=" + this.username } );
    this.listenServerEvents();
  }

  displayEvent(event){
    if(this.updateView)
      this.updateView(event);
  }

  initChat(userId){
    this.socket.emit('init-chat', { receiverId: userId } )
  }

  sendMessage(emitterId, receiverId, text){
    this.socket.emit('chat-msg', { emitterId, receiverId, text })
  }

  listenServerEvents(){
    this.socket.on('connect', () => {
      this.connected = true;
      console.log("Connection established.");
      this.displayEvent({ event: "connected" })
    });

    this.socket.on('init-connection-msg', (response) => {
      this.displayEvent({ event: "init-connection-msg", data: response });
    });

    this.socket.on('server-msg', (response) => {
      console.log("<Server>: ", response.data);
      this.displayEvent({ event: "server-msg", data: response });
    });

    this.socket.on("client-msg", (response) => {
      console.log("<" + response.username + ">: " + response.message);
      this.displayEvent({ event: "client-msg", data: response });
    });

    this.socket.on("user-connected", (response) => {
      console.log("User connected: ", response);
      this.displayEvent({ event: "user-connected", data: response });
    });

    this.socket.on("establish-session", (sessionData) => {
      this.cipher.buildSession(sessionData).then(() => {
        // encrypt messages.
      }).catch(() => {
        // handle error.
      });
    });
  }

  disconnect(){
    process.exit();
  }
};
