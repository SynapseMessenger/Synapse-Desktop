import { combineReducers } from 'redux'

const defaultState = {
  username: ''
};

const login = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      state = {
        username: action.username
      };
      break;
    default:
      break;
  }

  console.log("In reducer state is: ", state);
  return state;
};

const appReducers =  combineReducers({
  login
});


export default appReducers;