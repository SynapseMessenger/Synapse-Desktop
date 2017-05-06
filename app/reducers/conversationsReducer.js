const conversationsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SEND_ACCEPT_CHAT':
      // Create conversation
      state = {
        ...state,
        [action.userId]: []
      }
      break;
    case 'RECEIVED_ACCEPT_CHAT':
      // Create conversation
      state = {
        ...state,
        [action.userId]: []
      };
      break;
    /* userId is with whom the Client's user has a conversation with. */
    case 'ADD_MSG_TO_CHAT':
      state = {
        ...state,
        [action.userId]: [
          ...state[action.userId],
          action.message
        ]
      };
      break;
      // TODO: Improve ???
    case 'ADD_PENDING_MESSAGES':
      let updatedConversations = {};

      action.pendingMessages.forEach((message) => {
        if(updatedConversations[message.emitterId]){
          updatedConversations[message.emitterId].push(message);
        } else {
          if(state[message.emitterId]){
            updatedConversations[message.emitterId] = state[message.emitterId].concat([message]);
          } else {
            updatedConversations[message.emitterId] = [message];
          }
        }
      });

      state = {
        ...state,
        ...updatedConversations
      };
      break;
    default:
      break;
  }

  return state;
};

export default conversationsReducer;
