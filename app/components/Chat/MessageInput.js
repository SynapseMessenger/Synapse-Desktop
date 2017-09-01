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
import { addMessageToSelf } from '../../actions/chatActions';
import { storeMessageRequestKey } from '../../actions/chatActions';

// TODO: Refactor into stateless storing current message in store ?
class MessageInput extends React.Component {
  constructor(props){
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.state = {
      message: ''
    };
  }

  handleSend() {
    const message = {
      text: this.state.message,
      time: Date.now(),
      emitterId: this.props.emitterId,
      receiverId: this.props.receiverId
    };
    this.props.addMessageToSelf(message, this.props.receiverId);
    this.props.storeMessageRequestKey(message);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <div className="input-message-wrapper">
        <textarea
          className="materialize-textarea conversation-input"
          rows="5"
          cols="50"
          value={this.state.message}
          onChange={(ev) => { this.setState({ message: ev.target.value })} }
        >
        </textarea>
        <div className="conversation-send-button" onClick={this.handleSend}>
          <a className="btn-floating waves-effect waves-light">
            <i className="material-icons">send</i>
          </a>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    storeMessageRequestKey,
    addMessageToSelf
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(MessageInput);
