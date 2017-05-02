'use strict';

import { combineReducers } from 'redux'
import ChatClient from '../utils/chat_client.js';
const defaultState = {
  onlineUsers: undefined,
  waitingInitChatAnswer: undefined,
  user: undefined,
  navbar: {
    title: '',
    backlink: ''
  },
  conversations: {}
};

const synapse = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      const chatClient = new ChatClient(action.username, state.serverUrl, state.serverPort);
      state = {
        ...state,
        chatClient
      };
      break;

    case 'SET_USER':
      state = {
        ...state,
        user: action.user
      };
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

    case 'SET_NAVBAR_TITLE':
      state = {
        ...state,
        navbar: {
          ...state.navbar,
          title: action.title
        }
      };
      break;

    case 'SET_NAVBAR_BACKLINK':
      state = {
        ...state,
        navbar: {
          ...state.navbar,
          backlink: action.backlink
        }
      };
      break;

    case 'SET_NAVBAR':
      const { title, backlink } = action;
      state = {
        ...state,
        navbar: {
          ...state.navbar,
          backlink,
          title
        }
      };
      break;

    case 'SEND_INIT_CHAT':
      state = {
        ...state,
        waitingInitChatAnswer: true
      };
      break;

    case 'RECEIVED_INIT_CHAT':
      break;

    case 'SEND_ACCEPT_CHAT':
      // Create conversation
      state = {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: []
        }
      };
      break;

    case 'RECEIVED_ACCEPT_CHAT':
      // Create conversation
      state = {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: []
        },
        waitingInitChatAnswer: false
      };
      break;

    /* userId is with whom the Client's user has a conversation with. */
    case 'ADD_MSG_TO_CHAT':
      state = {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: [
            ...state.conversations[action.userId],
            action.message
          ]
        }
      };
      break;

      // TODO: Improve ???
    case 'ADD_PENDING_MESSAGES':

      let updatedConversations = {};

      action.pendingMessages.forEach((message) => {
        if(updatedConversations[message.emitterId]){
          updatedConversations[message.emitterId].push(message);
        } else {
          if(state.conversations[message.emitterId]){
            updatedConversations[message.emitterId] = state.conversations[message.emitterId].concat([message]);
          } else {
            updatedConversations[message.emitterId] = [message];
          }
        }
      });

      state = {
        ...state,
        conversations: {
          ...state.conversations,
          ...updatedConversations
        }
      };

      break;

    default:
      break;
  }
  return state;
};

const appReducers =  combineReducers({
  synapse
});


export default appReducers;