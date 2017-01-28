import React, { Component } from 'react';
import { Text, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { List, ListItem } from 'react-native-elements';
import styles from './styles';

class ContactProfilePage extends Component {

  render() {
    const { phoneNumbers, fullName, isFeelChatUser } = this.props.contactSelected;
    const contactSelectedPhoneNumbersList = phoneNumbers;

    return (
      <View style={styles.ContactProfilePageContainer}>
        <View style={styles.ContactProfilePageAvatarFullNameContainer}>
          <UserAvatar size="52" name={fullName}/>
          <Text style={styles.ContactProfilePageFullNameStyle}>{fullName}</Text>
        </View>
        <List containerStyle={styles.ContactProfilePagePhoneNumbersListContainer}>
          {
            contactSelectedPhoneNumbersList.map(
              ({ identifier, label, isFeelChatUser, stringValue, digits }) => (
                <ListItem
                  key={identifier}
                  title={label}
                  subtitle={isFeelChatUser ? stringValue : digits}
                  titleStyle={styles.ContactProfilePagePhoneNumbersItemTitle}
                  subtitleStyle={styles.ContactProfilePagePhoneNumbersItemSubtitle}
                  containerStyle={styles.ContactProfilePagePhoneNumbersItemContainer}
                />
              )
            )
          }
        </List>
        {
          isFeelChatUser ?
          null
          :
          <List containerStyle={styles.ContactProfilePageFeelChatOptionsContainer}>
            <ListItem
              key={1}
              title='Invite to FeelChat'
              titleStyle={styles.ContactProfilePageFeelChatOptionsItemTitle}
              containerStyle={styles.ContactProfilePageFeelChatOptionsItemContainer}
              onPress={() => console.log('Invite')}
              hideChevron
            />
          </List>
        }
      </View>
    );
  }
}

ContactProfilePage.propTypes = {
  contactSelected: React.PropTypes.object,
};

export default ContactProfilePage;
