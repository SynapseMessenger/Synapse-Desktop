import { combineReducers } from 'redux'

const defaultState = {
  username: ''
};

const synapse = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      state = {
        username: action.username
      };
      break;
    default:
      break;
  }
  return state;
};

const appReducers =  combineReducers({
  synapse
});


export default appReducers;