'use strict';

import { combineReducers } from 'redux'
import ChatClient from '../utils/chat_client.js';
const defaultState = {
  username: undefined,
  serverUrl: undefined,
  serverPort: undefined
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
    case 'UPDATE_ONLINE_USERS':
      state = {
        ...state,
        onlineUsers: action.onlineUsers
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