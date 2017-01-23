import React, { Component } from 'react';
import Contacts from './Contacts';
import { setContactsListProp } from '../../config/setContactsList';

class ContactsContainer extends Component {
  componentWillMount() {
    const { changeContactsList } = this.props.navigator.props;
    setContactsListProp(changeContactsList).done();
  }

  render() {
    return (
      <Contacts
        {...this.props}
      />
    );
  }
}

ContactsContainer.propTypes = {
  navigator: React.PropTypes.object,
  changeContactsList: React.PropTypes.func,
};

export default ContactsContainer;
