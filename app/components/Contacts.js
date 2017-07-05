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
import { Link } from 'react-router-dom';

class Contacts extends React.Component {

  constructor(props){
    super(props);
    this.showGreetings = this.showGreetings.bind(this);
    this.showUsers = this.showUsers.bind(this);
  }

  showGreetings(){
    return(
      <div className="greetings-message">
        Hello, {this.props.username}!
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
              <Link to={`/synapse/chat/${user._id}`} className="collection-item user-item" key={user._id}>
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
              <Link to={`/synapse/chat/${user._id}`} className="collection-item user-item" key={user._id}>
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
    const displayInfo = this.props.connected && this.props.onlineUsers ? this.showUsers() : this.showGreetings();
    return (
      <div className="container">
        {displayInfo}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    onlineUsers,
    offlineUsers,
    connected,
    username
  } = state.chat;
  return {
    onlineUsers,
    offlineUsers,
    username
  };
};

export default connect(mapStateToProps, null)(Contacts);
