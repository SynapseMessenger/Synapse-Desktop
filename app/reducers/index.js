import { combineReducers } from 'redux'

const setUsername = (state = 'anonymous', action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.username
    default:
      return state
  }
}

export default combineReducers({
  setUsername
})
