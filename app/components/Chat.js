/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Conversation from './Conversation';
import MessageInput from './MessageInput';

import { updateNavbar } from '../actions/navbarActions';
import { sendInitChat } from '../actions/chatActions';
import {
  addMessageToChat, receivedAcceptChat, sendAcceptChat
} from '../actions/conversationsActions';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.updateChat = this.updateChat.bind(this);
  }

  componentDidMount() {
    const {
      updateNavbar, receiver,
      chatClient, conversation,
      emitter
    } = this.props;

    updateNavbar(receiver.username, '/contacts');
    chatClient.updateView = this.updateChat;

    if (!conversation || conversation.length === 0) {
      chatClient.initChat(emitter._id);
    }
  }

  updateChat(update){
    const { emitter, receiver } = this.props;
    switch(update.event){
      case 'init-chat':
        this.props.chatClient.acceptChat(emitter._id, receiver._id);
        this.props.sendAcceptChat(receiver._id);
        break;
      case 'accept-chat':
        this.props.receivedAcceptChat(emitter._id);
        break;
      case 'chat-msg':
        const { message } = update.data;
        this.props.addMessageToChat(message, message.emitterId);
        break;
      default:
        break;
    }
  }

  render() {
    const { emitter, receiver } = this.props;
    return (
      <div className="container">
        <Conversation receiverId={receiver._id} />
        <MessageInput emitterId={emitter._id} receiverId={receiver._id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const receiverId = ownProps.match.params.userId;
  const { onlineUsers, offlineUsers } = state.chat;
  const allUsers = onlineUsers.concat(offlineUsers);
  return {
    receiver: allUsers.find((user) => user._id === receiverId),
    emitter: state.user,
    chatClient: state.chat.client,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNavbar,
    sendInitChat,
    sendAcceptChat,
    addMessageToChat,
    receivedAcceptChat
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
