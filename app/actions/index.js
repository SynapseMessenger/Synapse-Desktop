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

export const addPendingMessages = (pendingMessages) => {
  return {
    type: 'ADD_PENDING_MESSAGES',
    pendingMessages
  }
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
};


export const updateNavbarTitle = (title) => {
  return {
    type: 'SET_NAVBAR_TITLE',
    title
  }
};

export const updateNavbarBacklink = (backlink) => {
  return {
    type: 'SET_NAVBAR_BACKLINK',
    backlink
  }
};

export const updateNavbar = (title, backlink) => {
  return {
    type: 'SET_NAVBAR',
    title,
    backlink
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

export const sendAcceptChat = (userId) => {
  return {
    type: 'SEND_ACCEPT_CHAT',
    userId
  }
};

export const receivedAcceptChat = (userId) => {
  return {
    type: 'RECEIVED_ACCEPT_CHAT',
    userId
  }
};

export const addMessageToChat = (message, userId) => {
  return {
    type: 'ADD_MSG_TO_CHAT',
    userId,
    message
  }
};