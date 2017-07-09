/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

 import { generatePreKeyBundle, generateIdentity } from '../utils/signal-helpers';

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

export const initSignal = (socket, userId, store, preKeyId, signedKeyId) => {
  return (dispatch) => {
    return generateKeys(socket, userId, store, preKeyId, signedKeyId).then((preKeyBundle) => {
      const signalAddress = new libsignal.SignalProtocolAddress(userId, `desktop-${userId}`);
      const sessionBuilder = new libsignal.SessionBuilder(store, signalAddress);
      dispatch(setSignalInitValues(signalAddress, sessionBuilder, preKeyBundle));
    })
  }
};

const generateKeys = (socket, userId, store, preKeyId, signedKeyId) => {
  return generateIdentity(store).then(() => {
      return generatePreKeyBundle(store, preKeyId, signedKeyId)
    }).then((preKeyBundle) => {
      socket.emit('init-user-keybundle', { preKeyBundle });
      return preKeyBundle;
    })
};
