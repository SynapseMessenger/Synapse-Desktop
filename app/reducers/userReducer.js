/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      state = {
        ...state,
        ...action.user
      };
      break;
    default:
      break;
  }

  return state;
}

export default userReducer;
