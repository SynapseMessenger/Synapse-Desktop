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
