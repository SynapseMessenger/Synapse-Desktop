/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

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
