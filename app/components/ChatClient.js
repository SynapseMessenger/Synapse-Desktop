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
  addMessageToChat,
  addPendingMessages,
  sendAcceptChat,
  receivedAcceptChat
} from '../actions/conversationsActions';
import {
  updateUserLists,
  setConnected,
  connectChat
} from '../actions/chatActions';
import { setUser } from '../actions/userActions';

import Contacts from './Contacts.js'
import Chat from './Chat.js'

class ChatClient extends React.Component {

  constructor(props){
    super(props);
    this.listenToEvents = this.listenToEvents.bind(this);
  }

  componentDidMount(){
    console.log(this.props);
    const { connected, socket } = this.props;

    if (!connected) {
      this.props.connectChat();
    } else if (socket) {
      this.listenToEvents();
    }
  }

  listenToEvents() {
    const { socket, user, receiver } = this.props;
    console.log('listening to events');
    socket.on('connect', () => {
      console.log('setting connected');
      this.props.setConnected(true);
    });

    socket.on('init-connection-msg', (data) => {
      const { allUsers, pendingMessages, user } = update.data;
      this.props.updateUserLists(allUsers);
      this.props.addPendingMessages(pendingMessages);
      this.props.setUser(user);
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
      const { message } = data.data;
      this.props.addMessageToChat(message, message.emitterId);
    });

    socket.on("user-connected", (response) => {
      // this.displayEvent({ event: "user-connected", data: response });
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
    addPendingMessages,
    setUser,
    setConnected,
    connectChat,
    sendAcceptChat,
    receivedAcceptChat
  }, dispatch);
};

const mapStateToProps = (state, ownProps) => {
  const receiverId = ownProps.match.params.userId;
  const receiver = receiverId ? allUsers.find((user) => user._id === receiverId) : null;
  const {
    onlineUsers,
    offlineUsers,
    user,
    connected,
    socket
  } = state.chat;
  return {
    onlineUsers,
    offlineUsers,
    user,
    receiver,
    connected,
    socket
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatClient);
