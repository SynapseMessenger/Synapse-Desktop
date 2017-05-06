/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import SynapseApp from './components/SynapseApp'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/Login.js'
import ChatLobby from './components/ChatLobby.js'
import Conversation from './components/Conversation.js'
import LandingPage from './components/LandingPage.js';

import store from './store';

window.onload = function(){
  render(
      <Provider store={store}>
        <Router>
          <SynapseApp>
            <Route path="/" render={() => <Redirect to="/landing_page" />} />
            <Route path="/landing_page" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/lobby" component={ChatLobby} />
            <Route path="/conversation/:userId" component={Conversation} />
          </SynapseApp>
        </Router>
      </Provider>,
      document.getElementById('app')
    );
}
