"use strict";

const ChatServer = require('./app/chat_server.js');

const chatServer = new ChatServer();

chatServer.start();
