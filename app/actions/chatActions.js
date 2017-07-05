/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

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

export const setConnected = (value) => {
  return {
    type: 'SET_CONNECTED',
    value
  }
}

export const updateUserLists = (allUsers) => {
  return {
    type: 'UPDATE_USER_LIST',
    allUsers
  }
};

export const sendInitChat = () => {
  return {
    type: 'SEND_INIT_CHAT'
  }
};

export const receivedInitChat = () => {
  return {
    type: 'RECEIVED_INIT_CHAT'
  }
};
