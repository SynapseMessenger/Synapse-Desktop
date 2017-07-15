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

const Contacts = ({ ready, connected, generatingKeys }) => (
  <div className="container">
    { ready ? <UserList /> : <LoadingScreen {...{connected, generatingKeys}} /> }
  </div>
);

const LoadingScreen = ({ connected, generatingKeys }) => (
  // TODO: Make this work.
  <div className="greetings-message">
    <p>
      { connected ? 'Connected' : 'Not connected' }
    </p>
    <p>
      { generatingKeys ? 'Generating keys' : 'Not generating keys' }
    </p>
  </div>
)


const mapStateToProps = (state) => {
  const { socket, generatingKeys } = state.chat;
  const connected = socket && socket.connected;
  return {
    ready: connected && !generatingKeys,
    generatingKeys,
    connected
  };
};

export default connect(mapStateToProps, null)(Contacts);
