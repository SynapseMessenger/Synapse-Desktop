const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      state = {
        ...state,
        user: action.user
      };
      break;
    default:
      break;
  }

  return state;
}

export default userReducer;
