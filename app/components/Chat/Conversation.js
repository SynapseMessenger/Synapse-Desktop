/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const Conversation = (props) => {
  const { messages, user } = props;
  return (
    <div className="conversation">
      { messages && messages.length > 0 && messages.map((message) => {
        return (
          <Message
            text={message.text}
            time={message.time}
            isOwn={message.emitterId === user._id}
            key={message.time + message.emitterId}
          />
        );
      })}
    </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.chat.user,
    messages: state.chat.conversations[ownProps.receiverId]
  };
};

export default connect(mapStateToProps, null)(Conversation);
