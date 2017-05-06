'use strict';

import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import conversationsReducer from './conversationsReducer';
import navbarReducer from './navbarReducer';
import userReducer from './userReducer';

const appReducers =  combineReducers({
  chat: chatReducer,
  conversations: conversationsReducer,
  navbar: navbarReducer,
  user: userReducer
});

export default appReducers;
