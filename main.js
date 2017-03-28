"use strict";

// const readlineSync = require('readline-sync');
// const ChatClient = require('./app/chat_client.js');

// let username = "";

// do {
//   username = readlineSync.question("Define username: ");
// } while (!username);

// const chatClient = new ChatClient(username);

// chatClient.connect();
import { app, BrowserWindow } from 'electron';

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', () => {
  mainWindow = null;
  });
});
