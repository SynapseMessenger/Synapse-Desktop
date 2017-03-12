import React from 'react';
import ReactDOM from 'react-dom';
import SynapseApp from './components/SynapseApp.jsx';

window.onload = function(){
  ReactDOM.render(<SynapseApp />, document.getElementById('app'));
}
