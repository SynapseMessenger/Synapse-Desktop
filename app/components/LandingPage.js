'use babel';

import React from 'react';
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Landing Page!
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}
