/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

export const addMessageToChat = (message, userId) => {
  return {
    type: 'ADD_MSG_TO_CHAT',
    userId,
    message
  }
};

export const sendAcceptChat = (userId) => {
  return {
    type: 'SEND_ACCEPT_CHAT',
    userId
  }
};

export const receivedAcceptChat = (userId) => {
  return {
    type: 'RECEIVED_ACCEPT_CHAT',
    userId
  }
};

export const addPendingMessages = (pendingMessages) => {
  return {
    type: 'ADD_PENDING_MESSAGES',
    pendingMessages
  }
};
