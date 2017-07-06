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

import { sendInitChat } from '../actions/chatActions';
import {
  addMessageToChat, receivedAcceptChat, sendAcceptChat
} from '../actions/conversationsActions';

class Chat extends React.Component {

  render() {
    const { user, receiver, conversation } = this.props;
    if (!conversation || conversation.length === 0) {
      this.props.sendInitChat(user._id);
    }
    return (
      <div className="container">
        <Conversation receiverId={receiver._id} />
        <MessageInput emitterId={user._id} receiverId={receiver._id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const receiverId = ownProps.match.params.userId;
  const { onlineUsers, offlineUsers, allUsers } = state.chat;
  return {
    receiver: allUsers.find((user) => user._id === receiverId),
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendInitChat
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
