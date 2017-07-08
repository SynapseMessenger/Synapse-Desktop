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
      return {
        ...state,
        title: action.title
      };

    case 'SET_NAVBAR_BACKLINK':
      return {
        ...state,
        backlink: action.backlink
      };

    case 'SET_NAVBAR':
      const { title, backlink } = action;
      return {
        ...state,
        backlink,
        title
      };
    default:
      return state;
  }
};

export default navbarReducer;
