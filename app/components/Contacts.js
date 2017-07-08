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

const Greetings = ({ username }) => (
  <div className="greetings-message">
    Hello, {username}!
    Connecting to server...
  </div>
)

const Users = ({ onlineUsers, offlineUsers }) => (

  <div>
    <h4 className="center-align contacts-title">Contacts</h4>

    <h6 className="left-align">Online: ({onlineUsers.length})</h6>
    <ul className="collection with-header user-list" hidden={onlineUsers.length === 0}>
      { onlineUsers.map((user) => {
        return (
          <Link
            to={`/synapse/chat/${user._id}`}
            className="collection-item user-item"
            key={user._id}
            >
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

    <h6 className="left-align">Offline: ({offlineUsers.length})</h6>
    <ul className="collection with-header user-list" hidden={offlineUsers.length === 0}>
      { offlineUsers.map((user) => {
        return (
          <Link
            to={`/synapse/chat/${user._id}`}
            className="collection-item user-item"
            key={user._id}
            >
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

const Contacts = ({ connected, onlineUsers, offlineUsers, username }) => (
  <div className="container">
    { (connected && onlineUsers) ?
      <Users {...{onlineUsers, offlineUsers}} />
      :
      <Greetings {...{username}} />
    }
  </div>
);

const mapStateToProps = (state) => {
  const {
    onlineUsers,
    offlineUsers,
    username,
    socket
  } = state.chat;
  return {
    onlineUsers,
    offlineUsers,
    username,
    socket,
    connected: socket && socket.connected
  };
};

export default connect(mapStateToProps, null)(Contacts);
