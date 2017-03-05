"use strict";

const ioClient = require('socket.io-client');

const serverURL = 'http://localhost:9090';
const socket = ioClient.connect(serverURL, {query: 'username=marco'} );

socket.on('connect', () => {
	console.log("Connection established.");
});

socket.on('server-msg', (response) => {
	console.log("Received: ", response.data);
});

