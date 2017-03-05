"use strict";

const repl = require('repl');
const io_client = require('socket.io-client');

const server_url = 'http://localhost:9090';

console.log("Server url: ", server_url);

const chat_client = require('./app/chat_client.js')(io_client, server_url);

chat_client.define_username();

chat_client.connect_to_server();
