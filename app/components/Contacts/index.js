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
import UserList from './UserList';

const Contacts = ({ ready, connected }) => (
  <div className="container">
    { ready ? <UserList /> : <LoadingScreen {...{connected}} /> }
  </div>
);

const LoadingScreen = ({ connected }) => (
  // TODO: Make this work.
  <div className="greetings-message">
    <p>
      { connected ? 'Connected' : 'Not connected' }
    </p>
  </div>
)


const mapStateToProps = (state) => {
  const { socket } = state.chat;
  const connected = socket && socket.connected;
  return {
    ready: connected,
    connected
  };
};

export default connect(mapStateToProps, null)(Contacts);
