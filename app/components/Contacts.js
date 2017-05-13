/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPendingMessages } from '../actions/conversationsActions';
import { updateUserLists } from '../actions/chatActions';
import { setUser } from '../actions/userActions';
import { Link } from 'react-router-dom';

class Contacts extends React.Component {

  constructor(props){
    super(props);
    this.connectToServer = this.connectToServer.bind(this);
    this.updateContacts = this.updateContacts.bind(this);
    this.showGreetings = this.showGreetings.bind(this);
    this.showUsers = this.showUsers.bind(this);

    this.state = {
      connectedToServer: props.chatClient.connected
    };
  }

  componentDidMount(){
    if(this.props.chatClient)
      this.props.chatClient.updateView = this.updateContacts;
      if(!this.props.chatClient.connected){
        this.connectToServer();
      }
  }

  connectToServer(){
    this.props.chatClient.connect();
  }

  updateContacts(update){
    switch(update.event){
      case 'connected':
        this.setState({ connectedToServer: true });
        break;
      case 'init-connection-msg':
        const { allUsers, pendingMessages, user } = update.data;
        this.props.updateUserLists(allUsers);
        this.props.addPendingMessages(pendingMessages);
        this.props.setUser(user);
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
    const onlineCount = this.props.onlineUsers.length;
    const offlineCount = this.props.offlineUsers.length;
    return(
      <div>
        <h4 className="center-align contacts-title">Contacts</h4>

        <h6 className="left-align">Online: ({onlineCount})</h6>
        <ul className="collection with-header user-list" hidden={onlineCount === 0}>
          { this.props.onlineUsers.map((user) => {
            return (
              <Link to={`/chat/${user._id}`} className="collection-item user-item" key={user._id}>
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

        <h6 className="left-align">Offline: ({offlineCount})</h6>
        <ul className="collection with-header user-list" hidden={offlineCount === 0}>
          { this.props.offlineUsers.map((user) => {
            return (
              <Link to={`/chat/${user._id}`} className="collection-item user-item" key={user._id}>
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
    addPendingMessages,
    setUser
  }, dispatch);
};

const mapStateToProps = (state) => {
  const {
    client,
    onlineUsers,
    offlineUsers
  } = state.chat;
  return {
    chatClient: client,
    onlineUsers,
    offlineUsers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
