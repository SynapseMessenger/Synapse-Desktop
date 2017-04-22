'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOnlineUsers } from '../actions';
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
    if(this.props.chatClient && !this.props.chatClient.connected)
      this.connectToServer();
  }

  connectToServer(){
    this.props.chatClient.updateView = this.updateLobby;
    this.props.chatClient.connect();
  }

  updateLobby(update){
    switch(update.event){
      case 'connected':
        this.setState({ connectedToServer: true });
        break;
      case 'init-connection-msg': // Message from server with user list and initial information.
        this.props.updateOnlineUsers(update.data.onlineUsers);
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
        <ul className="collection with-header user-list">
          {this.props.onlineUsers.map((user) => {
            console.log(user);
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
    updateOnlineUsers
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    chatClient: state.synapse.chatClient,
    onlineUsers: state.synapse.onlineUsers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatLobby);