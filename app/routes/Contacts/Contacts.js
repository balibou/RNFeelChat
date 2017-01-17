import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import styles from './styles';
import { setContactsListProp, setContactsListAsyncstorage } from '../../config/setContactsList';

class Contacts extends Component {
  componentWillMount() {
    const { changeContactsList } = this.props.navigator.props;
    setContactsListProp(changeContactsList).done();
  }

  componentDidMount() {
    const {
      changeContactsList,
      filteredContactsList,
      filteredText,
      connected,
      user,
    } = this.props.navigator.props;

    this.timer = setInterval(() => {
      setContactsListAsyncstorage(
        changeContactsList,
        filteredContactsList,
        filteredText,
        connected,
        user
      ).done();
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { changeContactsList } = this.props.navigator.props;
    const { contactsList, filteredContactsList } = this.props.navigator.props.contacts;

    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={(text) =>
            changeContactsList('FILTERINGCONTACTS', contactsList, filteredContactsList, text)
          }
          placeholder='Search for contacts'
          containerStyle={styles.searchBarContainerStyle}
          inputStyle={styles.searchBarContainerStyle}
        />
        {
          contactsList.length
          ?
          <ScrollView style={styles.ScrollViewContainer}>
            <List containerStyle={styles.listContainerStyle}>
              {
                filteredContactsList.map((contact) => (
                  <ListItem
                    roundAvatar
                    avatar={{ uri: `data:image/png;base64,${contact.thumbnailImageData}` }}
                    key={contact.identifier}
                    title={contact.fullName}
                  />
                ))
              }
            </List>
          </ScrollView>
          :
          null
        }
      </View>
    );
  }
}

Contacts.propTypes = {
  navigator: React.PropTypes.object,
  changeContactsList: React.PropTypes.func,
  contacts: React.PropTypes.object,
  filteredContactsList: React.PropTypes.array,
  filteredText: React.PropTypes.string,
  connected: React.PropTypes.bool,
  user: React.PropTypes.object,
};

export default Contacts;
