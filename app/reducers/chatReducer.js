/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import ChatClient from '../utils/chat_client.js';
import io from 'socket.io-client';

const initialState = {
  host: 'http://localhost',
  port: 9090,
  username: 'anonymous'
}

const chatReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username
      }
    case 'CONNECT':
      console.log('connecting...');
      const { host, port } = state;
      const serverUrl = `${host}:${port}`;
      console.log("Server url: ", serverUrl);
      const socket = io.connect(serverUrl, { query: "username=" + state.username } );
      return {
        ...state,
        socket
      }
    case 'UPDATE_USER_LIST':
      // TODO: Add list for already started conversations.
      // TODO 2.0: Use objects {userId: user} and optimize this operation.
      let onlineUsers = [];
      let offlineUsers = [];

      action.allUsers.map((user) => {
        user.online ? onlineUsers.push(user) : offlineUsers.push(user);
      });

      return {
        ...state,
        onlineUsers,
        offlineUsers,
        allUsers: [...onlineUsers, ...offlineUsers]
      };
    case 'SEND_INIT_CHAT':
    case 'RECEIVED_INIT_CHAT':
    default:
      return state;
  }
}

export default chatReducer;
