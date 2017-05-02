'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserLists, setUser } from '../actions';
import { Link } from 'react-router-dom';

class ChatLobby extends React.Component {

  constructor(props){
    super(props);
    this.connectToServer = this.connectToServer.bind(this);
    this.updateLobby = this.updateLobby.bind(this);
    this.showGreetings = this.showGreetings.bind(this);
    this.showUsers = this.showUsers.bind(this);

    this.state = {
      connectedToServer: props.chatClient.connected
    };
  }

  componentDidMount(){
    if(this.props.chatClient)
      this.props.chatClient.updateView = this.updateLobby;
      if(!this.props.chatClient.connected){
        this.connectToServer();
      }
  }

  connectToServer(){
    this.props.chatClient.connect();
  }

  updateLobby(update){
    switch(update.event){
      case 'connected':
        this.setState({ connectedToServer: true });
        break;
      case 'init-connection-msg':
        this.props.updateUserLists(update.data.allUsers);
        this.props.setUser(update.data.user);
      break;
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
        <h4 className="center-align lobby-title">Lobby</h4>

        <h6 className="left-align">Online: </h6>
        <ul className="collection with-header user-list">
          {this.props.onlineUsers.map((user) => {
            return (
              <Link to={`/conversation/${user._id}`} className="collection-item user-item">
                  <div>
                    {user.username}
                    <span href="#!" className="secondary-content">
                      <i className="material-icons">send</i>
                    </span>
                  </div>
              </Link>
            )
          })}
        </ul>

        <h6 className="left-align">Offline: </h6>
        <ul className="collection with-header user-list">
          {this.props.offlineUsers.map((user) => {
            return (
              <Link to={`/conversation/${user._id}`} className="collection-item user-item">
                <div>
                  {user.username}
                  <span href="#!" className="secondary-content">
                      <i className="material-icons">send</i>
                    </span>
                </div>
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    const displayInfo = this.state.connectedToServer && this.props.onlineUsers ? this.showUsers() : this.showGreetings();
    return (
      <div className="container">
        {displayInfo}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUserLists,
    setUser
  }, dispatch);
};

const mapStateToProps = (state) => {
  const {
    chatClient,
    onlineUsers,
    offlineUsers
  } = state.synapse;
  return {
    chatClient,
    onlineUsers,
    offlineUsers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatLobby);