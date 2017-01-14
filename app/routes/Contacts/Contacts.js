import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import styles from './styles';
import { setContactsListProp } from '../../config/setContactsList';

class Contacts extends Component {
  componentWillMount() {
    const { changeContactsList } = this.props.navigator.props;
    setContactsListProp(changeContactsList).done();
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
  selectedTab: React.PropTypes.string,
  changeTab: React.PropTypes.func,
  changeContactsList: React.PropTypes.func,
  contacts: React.PropTypes.object,
};

export default Contacts;
