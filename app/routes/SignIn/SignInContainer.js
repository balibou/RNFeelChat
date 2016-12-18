import React, { Component } from 'react';
import SignIn from './SignIn';

class SignInContainer extends Component {
  render() {
    return (
      <SignIn
        {...this.props}
      />
    );
  }
}

export default SignInContainer;
