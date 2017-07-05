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
  connected: false
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONNECTED':
      state = {
        ...state,
        connected: action.value
      }
      break;
    case 'SET_USERNAME':
      state = {
        ...state,
        username: action.username
      }
      break;
    case 'CONNECT':
    console.log('connecting...');
      const { host, port } = state;
      console.log(state);
      const socket = io.connect(`${host}:${port}`, { query: "username=" + state.username } );
      state = {
        ...state,
        socket
      }
      break;
    case 'UPDATE_USER_LIST':
      // TODO: Add list for already started conversations.
      // TODO 2.0: Use objects {userId: user} and optimize this operation.
      let onlineUsers = [];
      let offlineUsers = [];

      action.allUsers.map((user) => {
        user.online ? onlineUsers.push(user) : offlineUsers.push(user);
      });

      state = {
        ...state,
        onlineUsers,
        offlineUsers
      };
      break;
    case 'SEND_INIT_CHAT':
      break;
    case 'RECEIVED_INIT_CHAT':
      break;
    default:
      break;
  }

  return state;
}

export default chatReducer;
