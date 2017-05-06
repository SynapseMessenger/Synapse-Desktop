export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username
  }
};

export const updateUserLists = (allUsers) => {
  return {
    type: 'UPDATE_USER_LIST',
    allUsers
  }
};

export const sendInitChat = () => {
  return {
    type: 'SEND_INIT_CHAT'
  }
};

export const receivedInitChat = () => {
  return {
    type: 'RECEIVED_INIT_CHAT'
  }
};
