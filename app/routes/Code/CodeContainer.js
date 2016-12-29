import React, { Component } from 'react';
import Code from './Code';

class CodeContainer extends Component {
  render() {
    return (
      <Code
        {...this.props}
      />
    );
  }
}

export default CodeContainer;
