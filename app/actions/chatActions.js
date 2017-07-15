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

const generateNewKeys = (signal, amount) => {
  const { store, preKeyId, signedKeyId } = signal;
  return generateKeys(store, amount, preKeyId, signedKeyId).then( result => {
    return {
      type: 'PUSH_KEYS',
      newKeys: result.newKeys,
      preKeyId: result.preKeyId,
      signedKeyId: result.signedKeyId
    };
  });
};

export const initChat = (user, socket, keysReqAmount, signal) => {
  return (dispatch) => {
    const signalAddress = new libsignal.SignalProtocolAddress(user._id, `desktop-${user._id}`);
    const sessionBuilder = new libsignal.SessionBuilder(store, signalAddress);
    dispatch({ type: 'INIT_CHAT', user, keysReqAmount, signalAddress, sessionBuilder });
    dispatch({ type: 'GENERATING_INIT_KEYS' });
    const { store, preKeyId, signedKeyId } = signal;
    return generateIdentity(store).then( () => {
      generateKeys(store, keysReqAmount * 2, preKeyId, signedKeyId).then( result => {
        dispatch({
          type: 'PUSH_KEYS',
          newKeys: result.newKeys,
          preKeyId: result.preKeyId,
          signedKeyId: result.signedKeyId
        });
        dispatch({ type: 'GENERATED_INIT_KEYS' });
        dispatch({ type: 'SEND_KEYS' });
      });
    })
  }
};

export const sendKeys = (signal, amount) => {
  return (dispatch) => {
    dispatch({ type: 'SEND_KEYS', amount });
    generateNewKeys(signal, amount).then(newKeysAction => dispatch(newKeysAction));
  }
}
