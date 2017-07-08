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
  username: 'anonymous',
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };

    case 'CONNECT':
      const { host, port } = state;
      const serverUrl = `${host}:${port}`;
      const socket = io.connect(serverUrl, { query: "username=" + state.username } );
      return {
        ...state,
        socket
      }

    case 'SEND_MESSAGE':
      state.socket.emit('chat-msg', { message: action.message });
      return state;

    case 'UPDATE_USER_LIST':
      const { allUsers } = action;
      let onlineUsers = [];
      let offlineUsers = [];

      allUsers.map((user) => {
        user.online ? onlineUsers.push(user) : offlineUsers.push(user);
      });

      return {
        ...state,
        onlineUsers,
        offlineUsers,
        allUsers
      };
    default:
      return state;
  }
}

export default chatReducer;
