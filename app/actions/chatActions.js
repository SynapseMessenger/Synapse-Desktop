/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

 import {
   generateIdentity,
   generatePreKeyBundle,
   arrayBufferToString,
   base64ToString
 } from '../utils/signal-helpers';

export const loadSession = (id) => {
  return {
    type: 'LOAD_SESSION',
    id
  }
}

export const changeSearchInput = (value) => {
  return {
    type: 'USER_SEARCH_INPUT',
    value
  }
};

export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username
  }
};

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

export const generateAndSendKey = (data, signal) => {
  return dispatch => {
    return generatePreKeyBundle(signal.store, signal.preKeyId, signal.signedKeyId).then(key => {
      dispatch({
        type: 'SEND_KEY',
        preKeyId: signal.preKeyId + 1,
        signedKeyId: signal.signedKeyId + 1,
        receiverId: data.userId,
        key
      });
    });
  }
}
export const parseKeyAndSendMessage = (data) => {
  return {
    type: 'SEND_MESSAGE',
    key: data.key,
    receiverId: data.generatorId
  }
};

export const storeMessageRequestKey = (message) => {
  return {
    type: 'STORE_MSG_REQUEST_KEY',
    message
  }
};

export const initChat = (user, signal) => {
  return dispatch => {
    return generateIdentity(signal.store).then(() => {
      dispatch({
        type: 'INIT_CHAT',
        user
      });
    });
  }
}

export const addMessageToChat = (message, userId, signal) => {
 return dispatch => {
   const stringCiphertext = base64ToString(message.text);
   const cipher = signal.sessions[userId].cipher;
   return cipher.decryptPreKeyWhisperMessage(stringCiphertext, 'binary').then((plaintext) => {
     const stringPlaintext = arrayBufferToString(plaintext);
     const plainMessage = {
       ...message,
       text: stringPlaintext
     };

     dispatch({
       type: 'ADD_MSG_TO_CHAT',
       message: plainMessage,
       userId
     });
   });
 }
};

export const addMessageToSelf = (message, userId) => {
 return {
   type: 'ADD_MSG_TO_SELF',
   message,
   userId
 }
};

export const addPendingMessages = (pendingMessages) => {
 return {
   type: 'ADD_PENDING_MESSAGES',
   pendingMessages
 }
};
