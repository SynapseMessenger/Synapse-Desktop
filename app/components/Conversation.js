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
  if (messages && messages.length > 0) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="conversation">
            { messages.map((message) => {
              return (
                <Message
                  text={message.text}
                  time={message.time}
                  isOwn={message.emitterId === user._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    )
  } else return null;
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    messages: state.conversations[ownProps.receiverId]
  };
};

export default connect(mapStateToProps, null)(Conversation);
