/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

'use strict';

import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import conversationsReducer from './conversationsReducer';
import navbarReducer from './navbarReducer';

const appReducers =  combineReducers({
  chat: chatReducer,
  conversations: conversationsReducer,
  navbar: navbarReducer
});

export default appReducers;
