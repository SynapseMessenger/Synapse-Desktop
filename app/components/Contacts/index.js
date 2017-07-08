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
import Greetings from './Greetings';

const Contacts = ({ connected }) => (
  <div className="container">
    { connected ? <UserList /> : <Greetings /> }
  </div>
);

const mapStateToProps = (state) => {
  const { socket } = state.chat;
  return {
    connected: socket && socket.connected
  };
};

export default connect(mapStateToProps, null)(Contacts);
