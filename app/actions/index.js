export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username
  }
};

export const updateOnlineUsers = (onlineUsers) => {
  return {
    type: 'UPDATE_ONLINE_USERS',
    onlineUsers
  }
};
