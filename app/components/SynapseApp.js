'use babel';

import React     from 'react';
import NavigationBar from './NavigationBar.js';

class SynapseApp extends React.Component {
  render(){
    return (
      <div>
        <NavigationBar />
        {this.props.children}
      </div>
    )
  }
}

export default SynapseApp;