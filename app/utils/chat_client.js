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

  acceptChat(emitterId, receiverId){
    this.socket.emit('accept-chat', {
      receiverId,
      emitterId
    })
  }

  sendMessage(emitterId, receiverId, message){
    this.socket.emit('chat-msg', { emitterId, receiverId, message })
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

    this.socket.on('init-chat', (data) => {
      this.displayEvent({
        event: 'init-chat',
        data
      });
    });

    this.socket.on('accept-chat', (data) => {
      this.displayEvent({
        event: 'accept-chat',
        data
      });
    });

    this.socket.on('chat-msg', (data) => {
      this.displayEvent({
        event: 'chat-msg',
        data
      });
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
