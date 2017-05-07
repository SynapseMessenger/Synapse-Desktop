/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import React from 'react';
import { connect } from 'react-redux';

const Conversation = (props) => {
  const { messages, emitter } = props;
  if (messages && messages.length > 0) {
    return (
      <div className="row">
        <div className="col s12">
          <div className="conversation">
            { messages.map((message) => {
              const messageOwnerClass = message.userId === emitter._id ? "own-user" : "other-user";
              return (
                <div className="col s12">
                  <div className={"conversation-message " + messageOwnerClass}>
                    {message.text} : {message.time} : {message.userId}
                  </div>
                </div>
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
    emitter: state.user,
    messages: state.conversations[ownProps.receiverId]
  };
};

export default connect(mapStateToProps, null)(Conversation);
