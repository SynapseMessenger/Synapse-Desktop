'use babel';

import React     from 'react';

import Login         from './Login.jsx';
import ChatLobby     from './ChatLobby.jsx';
import Conversation  from './Conversation.jsx';
import NavigationBar from './NavigationBar.jsx';

export default class SynapseApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: <Login setUsername={this.setUsername} />,
      username: null
    }
  }

  setUsername(input){
    this.setState({
      username: input
    });
  }

  changeView(view){
    let viewComponent;

    switch(view){
      case "Login":
        viewComponent = <Login setUsername={this.setUsername} />;
        break;
      case "ChatLobby":
        viewComponent = <ChatLobby />;
        break;
      case "Conversation":
        viewComponent = <Conversation />;
        break;
      default:
        viewComponent = <ChatLobby />;
    }

    this.setState({
      currentView: viewComponent
    });
  }

  render() {
    return (
      <div>
        <NavigationBar changeView={this.changeView} />
        { this.state.currentView }
      </div>
    );
  }
}
