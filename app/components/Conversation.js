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
    props.chatClient.updateView = this.updateConversation;

    if(!props.conversation || props.conversation.length === 0){
      props.chatClient.initChat(props.emitter._id);
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
        <div className="conversation">
        </div>
        <div className="row">
          <div className="col s10">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">textsms</i>
                <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
              </div>
            </div>
          </div>
          <div className="col s2">
            <i className="material-icons prefix">send</i>
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