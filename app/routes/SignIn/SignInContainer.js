import React, { Component } from 'react';
import SignIn from './SignIn';

class SignInContainer extends Component {
  render() {
    return (
      <SignIn
        {...this.state}
      />
    );
  }
}

export default SignInContainer;
