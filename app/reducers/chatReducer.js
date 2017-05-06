/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import ChatClient from '../utils/chat_client.js';

const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      const chatClient = new ChatClient(action.username, state.serverUrl, state.serverPort);
      state = {
        ...state,
        client: chatClient
      }
      break;
      // TODO: Add list for already started conversations.
      // TODO 2.0: Use objects {userId: user} and optimize this operation.
    case 'UPDATE_USER_LIST':
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
