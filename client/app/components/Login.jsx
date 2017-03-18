'use babel';

import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        <input type="button" value="Log in" onClick={() => this.props.setUsername(this.state.username)}/>
      </form>
    );
  }
}
