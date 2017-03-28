import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import SynapseApp from './components/SynapseApp'
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

import reducers from './reducers'
import Login from './components/Login.js'
import ChatLobby from './components/ChatLobby.js'
import Conversation from './components/Conversation.js'
import LandingPage from './components/LandingPage.js';

let store = createStore(reducers)

window.onload = function(){
  render(
      <Provider store={store}>
        <Router>
          <SynapseApp>
            <Route path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/lobby" component={ChatLobby} />
            <Route path="/conversation" component={Conversation} />
          </SynapseApp>
        </Router>
      </Provider>,
      document.getElementById('app')
    );
}
