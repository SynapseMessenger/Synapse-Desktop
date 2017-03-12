'use babel';

import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Log in" />
      </form>
    );
  }
}
