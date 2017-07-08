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
import MessageInput from './MessageInput';
import { bindActionCreators } from 'redux';
import { updateNavbar } from '../actions/navbarActions';

class Chat extends React.Component {

  componentWillMount() {
    this.props.updateNavbar(this.props.receiver.username, '/synapse/contacts');
  }

  render() {
    const { user, receiver } = this.props;
    return (
      <div className="container">
        <Conversation receiverId={receiver._id} />
        <MessageInput emitterId={user._id} receiverId={receiver._id} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const receiverId = ownProps.match.params.userId;
  const { onlineUsers, offlineUsers, allUsers } = state.chat;
  return {
    receiver: allUsers.find((user) => user._id === receiverId),
    user: state.chat.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNavbar
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
