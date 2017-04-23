'use babel';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateNavbar,
         sendInitChat,
         sendAcceptChat,
         sendChatMessage
        } from '../actions';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    props.updateNavbar(props.receiver.username, '/lobby');
    this.updateConversation = this.updateConversation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    props.chatClient.updateView = this.updateConversation;

    if(!props.conversation || props.conversation.length === 0){
      props.chatClient.initChat(props.emitter._id);
    }

    this.state = {
      message: ''
    };
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

  sendMessage() {
    const { emitter, receiver } = this.props;
    this.props.chatClient.sendMessage(emitter._id, receiver._id, this.state.message);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <div className="container">
        <div className="conversation">
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
  console.log("State is: ", state);
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