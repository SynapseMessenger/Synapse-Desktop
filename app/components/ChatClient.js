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
  generateAndSendKey,
  parseKeyAndSendMessage,
  initChat,
  updateUserStatus,
  addMessageToChat,
  sendAcceptChat,
  receivedAcceptChat
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
    const { socket, user, receiver } = this.props;

    socket.on('init-connection-msg', (data) => {
      const { allUsers, user } = data;
      this.props.updateUserLists(allUsers);
      this.props.initChat(user, this.props.signal);
    });

    socket.on('init-chat', (data) => {
      this.props.sendAcceptChat(receiver._id);
      socket.emit('accept-chat', {
        receiverId: receiver._id,
        emitterId: user._id
      })
    });

    socket.on('accept-chat', (data) => {
      this.props.receivedAcceptChat(user._id);
    });

    socket.on('chat-msg', (data) => {
      const { message } = data;
      if (message.emitterId != this.props.user._id) {
        this.props.addMessageToChat(message, message.emitterId, this.props.signal);
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

    socket.on('request-key', data => {
      this.props.generateAndSendKey(data, this.props.signal);
    });

    socket.on('receive-key', data => {
      this.props.parseKeyAndSendMessage(data);
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
    sendAcceptChat,
    receivedAcceptChat,
    addMessageToChat,
    updateUserStatus,
    generateAndSendKey,
    parseKeyAndSendMessage
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
    signal
  } = state.chat;

  return {
    onlineUsers,
    offlineUsers,
    user,
    receiver,
    socket,
    signal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatClient);
