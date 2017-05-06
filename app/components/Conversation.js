'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateNavbar } from '../actions/navbarActions';
import { sendInitChat } from '../actions/chatActions';
import { addMessageToChat, receivedAcceptChat, sendAcceptChat } from '../actions/conversationsActions';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.updateConversation = this.updateConversation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.displayConversation = this.displayConversation.bind(this);
    props.updateNavbar(props.receiver.username, '/lobby');
    props.chatClient.updateView = this.updateConversation;

    if(!props.conversation || props.conversation.length === 0){
      props.chatClient.initChat(props.emitter._id);
    }

    this.state = {
      message: ''
    };
  }

  updateConversation(update){
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

  sendMessage() {
    const { emitter, receiver } = this.props;
    const message = {
      text: this.state.message,
      time: Date.now(),
      emitterId: emitter._id,
      receiverId: receiver._id
    };
    this.props.chatClient.sendMessage(message);
    this.props.addMessageToChat(message, message.receiverId);
    this.setState({
      message: ""
    });
  }

  displayConversation(){
    const hasAConversation = (this.props.conversation && this.props.conversation.length > 0);
    if(hasAConversation){
      return (
        <div className="conversation">
          {this.props.conversation.map((message) => {
            const messageOwnerClass = message.userId === this.props.emitter._id ? "own-user" : "other-user";
            return (
              <div className="col s12">
                <div className={"conversation-message " + messageOwnerClass}>
                  {message.text} : {message.time} : {message.userId}
                </div>
              </div>
            );
          })}
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    const conversation = this.displayConversation();
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            { conversation }
          </div>
        </div>
        <div className="row input-message-wrapper">
          <div className="col s10">
            <textarea
              className="materialize-textarea input-message"
              rows="5"
              cols="50"
              value={this.state.message}
              onChange={(ev) => { this.setState({message: ev.target.value})} }
            >
            </textarea>
          </div>
          <div className="col s2" onClick={this.sendMessage}>
            <a className="btn-floating waves-effect waves-light">
              <i className="material-icons">send</i>
            </a>
          </div>
        </div>
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
    conversation: state.conversations[receiverId]
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

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
