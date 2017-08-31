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
import Loader from '../../utils/components/Loader';

const Contacts = ({ ready }) => (
  <div>
    { ready ? <UserList /> : <LoadingScreen /> }
  </div>
);

const LoadingScreen = () => (
  <div className='loading-screen'>
    <Loader />
    <div className='loading-text'>LOADING</div>
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
