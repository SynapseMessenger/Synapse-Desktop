/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addMessageToChat } from '../actions/conversationsActions';

class MessageInput extends React.Component {
  constructor(props){
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      message: ''
    };
  }

  sendMessage() {
    const {
      emitterId, receiverId,
      chatClient, addMessageToChat
    } = this.props;
    const message = {
      text: this.state.message,
      time: Date.now(),
      emitterId,
      receiverId
    };
    chatClient.sendMessage(message);
    addMessageToChat(message, message.receiverId);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
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
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    chatClient: state.chat.client,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addMessageToChat
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
