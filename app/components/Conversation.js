'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { updateNavbar,
         sendInitChat,
         sendAcceptChat,
         sendChatMessage
        } from '../actions';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    props.updateNavbar(receiver.username, '/lobby');
    this.updateConversation = this.updateConversation.bind(this);
    props.chatClient.updateView = this.updateConversation;

    if(props.conversation.length === 0){
      props.initChat(emitter._id);
    }
  }

  updateConversation(update){
    switch(update.event){
      case 'init-chat':
        console.log("init chat update conversation!", update);
        break;
      case 'accept-chat':
        console.log("accept chat update conversation!", update);
        break;
      case 'chat-msg':
        console.log("chat message update!", update);
        break;
      default:
        break;
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const receiverId = ownProps.match.params.userId;
  const users = state.synapse.onlineUsers;
  return {
    receiver: users.find((user) => user._id === receiverId),
    emitter: state.synapse.user,
    chatClient: state.synapse.chatClient,
    conversation: state.synapse.conversations[receiverId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNavbar,
    sendInitChat,
    sendAcceptChat,
    sendChatMessage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);