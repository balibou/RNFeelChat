import React, { Component } from 'react';
import ContactProfilePage from './ContactProfilePage';

class ContactProfilePageContainer extends Component {
  render() {
    return (
      <ContactProfilePage
        {...this.props}
      />
    );
  }
}

export default ContactProfilePageContainer;
