import React, { Component } from 'react';
import Info from './Info';

class InfoContainer extends Component {
  render() {
    return (
      <Info
        {...this.props}
      />
    );
  }
}

export default InfoContainer;
