import React, { Component } from 'react';
import Contacts from './Contacts';

class ContactsContainer extends Component {
  render() {
    return (
      <Contacts
        {...this.props}
      />
    );
  }
}

export default ContactsContainer;
