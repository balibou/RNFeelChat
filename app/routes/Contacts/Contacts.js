import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import styles from './styles';
import Routes from '../../config/routes';

class Contacts extends Component {
  render() {
    const { navigator } = this.props;
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
                    onPress={() => {
                      const route = Routes.getContactProfilePageRoute(contact);
                      navigator.push(route);
                    }}
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
};

export default Contacts;
