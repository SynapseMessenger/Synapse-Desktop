'use babel';

import React from 'react';

export default class ChatLobby extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        ChatLobby
        Hello, {this.props.app.username}!
      </div>
    );
  }
}
