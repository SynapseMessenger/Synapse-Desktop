'use babel';

import React from 'react';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: ["Login", "ChatLobby"]
    }
  }

  render() {
    return (
      <div>
        NavigationBar
      </div>
    );
  }
}
