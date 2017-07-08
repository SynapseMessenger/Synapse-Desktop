/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

const conversationsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MSG_TO_CHAT':
      const { message, userId } = action;
      const conversation = state[userId] || [];
      return {
        ...state,
        [userId]: [
          ...conversation,
          message
        ]
      };
    default:
      return state;
  }
};

export default conversationsReducer;
