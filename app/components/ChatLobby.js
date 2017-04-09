'use babel';

import React from 'react';
import { connect } from 'react-redux';

class ChatLobby extends React.Component {

  constructor(props){
    super(props);
    this.connectToServer = this.connectToServer.bind(this);
    this.updateView = this.updateLobby.bind(this);
    this.showGreetings = this.showGreetings.bind(this);
    this.showUsers = this.showUsers.bind(this);
    this.updateLobby = this.updateLobby.bind(this);

    this.state = {
      connectedToServer: props.chatClient.connected
    }
  }

  componentDidMount(){
    if(this.props.chatClient && !this.props.chatClient.connected)
      this.connectToServer();
  }

  connectToServer(){
    this.props.chatClient.updateView = this.updateView;
    this.props.chatClient.connect();
  }

  updateLobby(update){
    if(update.event === "connected"){
      this.setState({
        connectedToServer: true
      });
    }
  }

  showGreetings(){
    return(
      <div className="greetings-message">
        Hello, {this.props.chatClient.username}!
        Connecting to server...
      </div>
    )
  }

  showUsers(){
    return(
      <div>
        Showing users!
      </div>
    )
  }

  render() {
    console.log(this.props);
    const displayInfo = this.state.connectedToServer ? this.showUsers() : this.showGreetings();
    return (
      <div className="container">
        {displayInfo}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    connectedToServer
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    chatClient: state.synapse.chatClient
  };
};

export default connect(mapStateToProps, null)(ChatLobby);