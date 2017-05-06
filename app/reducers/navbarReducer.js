/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

const defaultState = {
    title: '',
    backlink: ''
};

const navbarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_NAVBAR_TITLE':
      state = {
        ...state,
        title: action.title
      };
      break;

    case 'SET_NAVBAR_BACKLINK':
      state = {
        ...state,
        backlink: action.backlink
      };
      break;

    case 'SET_NAVBAR':
      const { title, backlink } = action;
      state = {
        ...state,
        backlink,
        title
      };
      break;
    default:
      break;
  }

  return state;
};

export default navbarReducer;
