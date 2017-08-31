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
import Conversation from './Conversation';
import EmptyConversation from './EmptyConversation';
import MessageInput from './MessageInput';
import { bindActionCreators } from 'redux';
import { updateNavbar } from '../../actions/navbarActions';

class Chat extends React.Component {
  render() {
    const { user, receiver } = this.props;
    return (
      <div className="chat-wrapper">
        {user && receiver ? (
          <div>
            <Conversation receiverId={receiver._id} />
            <MessageInput emitterId={user._id} receiverId={receiver._id} />
          </div>
        ) : <EmptyConversation /> }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const receiverId = state.chat.currentReceiverId;
  const { onlineUsers, offlineUsers } = state.chat;
  return {
    receiver: onlineUsers[receiverId] || offlineUsers[receiverId] || null,
    user: state.chat.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNavbar
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
