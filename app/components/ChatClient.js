/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

'use babel';

import React     from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateUserLists,
  connectChat,
  initChat,
  updateUserStatus,
  addMessageToChat
} from '../actions/chatActions';

import Contacts from './Contacts'
import Chat from './Chat'

class ChatClient extends React.Component {

  constructor(props){
    super(props);
    this.listenToEvents = this.listenToEvents.bind(this);
  }

  componentDidMount() {
    if(!this.props.socket) {
      this.props.connectChat();
    }
  }

  componentDidUpdate(prevProps){
    if (!prevProps.socket && this.props.socket) {
      this.listenToEvents();
    }
  }

  listenToEvents() {
    console.log('Listening to users events');
    const { socket, user, receiver } = this.props;

    socket.on('init-connection-msg', (data) => {
      console.log('init msg received');
      const { allUsers, user } = data;
      this.props.updateUserLists(allUsers);
      this.props.initChat(user);
    });

    socket.on('chat-msg', (data) => {
      const { message } = data;
      if (message.emitterId != this.props.user._id) {
        this.props.addMessageToChat(message, message.emitterId);
      }
    });

    socket.on('user-connected', (user) => {
      console.log('User connected', user);
      this.props.updateUserStatus(user, 'user-connected');
    });

    socket.on('user-disconnected', (user) => {
      console.log('User disconnected', user);
      this.props.updateUserStatus(user, 'user-disconnected');
    });
  }

  render(){
    const { match } = this.props;
    return (
      <div>
        <Route path={match.url + '/contacts'} component={Contacts} />
        <Route path={match.url + '/chat/:userId'} component={Chat} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUserLists,
    initChat,
    connectChat,
    addMessageToChat,
    updateUserStatus
  }, dispatch);
};

const mapStateToProps = (state, ownProps) => {
  const receiverId = ownProps.match.params.userId;
  const receiver = receiverId ? allUsers.find((user) => user._id === receiverId) : null;
  const {
    onlineUsers,
    offlineUsers,
    socket,
    user,
  } = state.chat;

  return {
    onlineUsers,
    offlineUsers,
    user,
    receiver,
    socket,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatClient);
