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
  let updatedConversation;
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

    case 'UPDATE_ONLINE_USERS':
      state = {
        ...state,
        onlineUsers: action.onlineUsers
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
      state = {
        ...state,
        navbar: {
          ...state.navbar,
          backlink: action.backlink,
          title: action.title
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

    case 'SEND_CHAT_MSG':
      // Do this properly.
      updatedConversation = state.conversations[action.userId];
      updatedConversation.push({text: action.messageText, time: action.messageTime});
      state = {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: updatedConversation
        }
      };
      break;

    case 'RECEIVED_CHAT_MSG':
      // Merge both received/send into one action-reducer ???
      updatedConversation = state.conversations[action.userId];
      updatedConversation.push({text: action.message.text, time: action.message.time});
      state = {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: updatedConversation
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