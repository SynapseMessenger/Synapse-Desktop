"use strict";

const readlineSync = require('readline-sync');
const ChatClient = require('./app/chat_client.js');

let username = "";

do {
  username = readlineSync.question("Define username: ");
} while (!username);

const chatClient = new ChatClient(username);

chatClient.connect();
