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

export const initChat = (user) => ({
  type: 'INIT_CHAT',
  user
});

export const addMessageToChat = (message, userId) => ({
  type: 'ADD_MSG_TO_CHAT',
  message,
  userId
});

export const addMessageToSelf = (message, userId) => {
 return {
   type: 'ADD_MSG_TO_SELF',
   message,
   userId
 }
};
