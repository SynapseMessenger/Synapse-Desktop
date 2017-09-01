/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

'use babel';

import React     from 'react';

class SynapseApp extends React.Component {
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default SynapseApp;
