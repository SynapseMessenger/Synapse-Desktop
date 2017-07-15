/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

 import { generateKeys, generateIdentity } from '../utils/signal-helpers';

export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username
  }
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
};


export const sendMessage = (message) => {
  return {
    type: 'SEND_MESSAGE',
    message
  }
}

export const connectChat = () => {
  return {
    type: 'CONNECT'
  }
}

export const updateUserLists = (allUsers) => {
  return {
    type: 'UPDATE_USER_LIST',
    allUsers
  }
};

export const updateUserStatus = (user, status) => {
  return {
    type: 'UPDATE_USER_STATUS',
    user,
    status
  }
};

const setSignalInitValues = (signalAddress, sessionBuilder, preKeyBundle) => {
  return {
    type: 'SET_SIGNAL_INIT_VALUES',
    signalAddress,
    sessionBuilder,
    preKeyBundle
  }
};

export const initSignal = (socket, userId, store, keyId, signedId) => {
  return (dispatch) => {
    return generateIdentity(store).then( () => {
      const signalAddress = new libsignal.SignalProtocolAddress(userId, `desktop-${userId}`);
      const sessionBuilder = new libsignal.SessionBuilder(store, signalAddress);
      generateKeys(store, 10, keyId, signedId).then( result => {
        const { ownKeys, preKeyId, signedKeyId } = result;
        dispatch({
          type: 'PUSH_KEYS',
          ownKeys,
          preKeyId,
          signedKeyId
        });
      });
    })
  }
};
