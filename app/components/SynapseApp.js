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

// export default class SynapseApp extends React.Component {
//   constructor(props) {
//     console.log("SynapseApp constructor");
//     super(props);
//     this.setUsername = this.setUsername.bind(this);

//     this.state = {
//       currentView: <Login setUsername={(input) => this.setUsername(input)} />,
//       username: null
//     }
//   }

//   setUsername(input){
//     console.log("Setting username: ", input);
//     this.setState({
//       username: input
//     }, this.changeView("ChatLobby"));
//   }

//   changeView(view){
//     console.log("Changing view, to: ", view, this.state);
//     let viewComponent;

//     switch(view){
//       case "Login":
//         viewComponent = <Login setUsername={(input) => this.setUsername(input)} />;
//         break;
//       case "ChatLobby":
//         viewComponent = <ChatLobby app={this.state} />;
//         break;
//       case "Conversation":
//         viewComponent = <Conversation app={this.state} />;
//         break;
//       default:
//         viewComponent = <ChatLobby app={this.state} />;
//     }

//     this.setState({
//       currentView: viewComponent
//     });
//   }

//   render() {
//     return (
//       <div>
//         <NavigationBar changeView={this.changeView} />
//         { this.state.currentView }
//       </div>
//     );
//   }
// }
