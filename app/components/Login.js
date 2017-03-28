'use babel';

import React from 'react'
import { connect } from 'react-redux'
import { setUsername } from '../actions'

let Login = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={ e => {
        e.preventDefault()
        if(!input.value.trim()){
          return
        }
        dispatch(setUsername(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Log in
        </button>
      </form>
    </div>
  )
}

Login = connect()(Login)

export default Login

// import React from 'react';

// export default class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {username: ''};

//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.setState({username: event.target.value});
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.username} onChange={this.handleChange} />
//         </label>
//         <input type="button" value="Log in" onClick={() => this.props.setUsername(this.state.username)}/>
//       </form>
//     );
//   }
// }
