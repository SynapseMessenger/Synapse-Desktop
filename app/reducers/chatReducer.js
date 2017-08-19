/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import io from 'socket.io-client';
import { deleteItem, addItem } from '../utils/chat-reducer-helper';
const serverHost = process.env.LOCAL_ENV ?
                    'http://localhost:9090' :
                    'https://synapse-mobile-server.herokuapp.com';

const initialState = {
  host: serverHost,
  username: 'anonymous',
  conversations: {}
}

const chatReducer = (state = initialState, action) => {
  const userId = action.user ? action.user._id : null;
  switch (action.type) {
    case 'SEND_MESSAGE':
      state.socket.emit('chat-msg', { message: action.message });
      return state;

    case 'ADD_MSG_TO_CHAT':
    const conversation = state.conversations[action.userId] || [];
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: [
            ...conversation,
            action.message
          ]
        }
      };

    case 'ADD_MSG_TO_SELF':
      const selfConversation = state.conversations[action.userId] || [];
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: [
            ...selfConversation,
            action.message
          ]
        }
      };

    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username
      }

    case 'INIT_CHAT':
      return {
        ...state,
        user: action.user
      };

    case 'CONNECT':
      const socket = io.connect(state.host, { query: "username=" + state.username });
      return {
        ...state,
        socket
      }

    case 'UPDATE_USER_STATUS':
      const online = (action.status === 'user-connected');

      return {
        ...state,
        offlineUsers: online ? deleteItem(userId, state.offlineUsers) : addItem(userId, action.user, state.offlineUsers),
        onlineUsers: online ? addItem(userId, action.user, state.onlineUsers) : deleteItem(userId, state.onlineUsers),
      }

    case 'UPDATE_USER_LIST':
      const { allUsers } = action;
      let updatedOnlineUsers = {};
      let updatedOfflineUsers = {};

      allUsers.map((user) => {
        if (user.online) {
          updatedOnlineUsers[user._id] = user;
        } else {
          updatedOfflineUsers[user._id] = user;
        }
      });

      return {
        ...state,
        onlineUsers: updatedOnlineUsers,
        offlineUsers: updatedOfflineUsers,
      };
    default:
      return state;
  }
}

export default chatReducer;
