import React, { Component } from 'react';
import { Text, View, ActionSheetIOS } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { List, ListItem } from 'react-native-elements';
import SendSMS from 'react-native-sms';
import styles from './styles';

class ContactProfilePage extends Component {

  sms({digits}) {
    SendSMS.send({
      body: 'Try FeelChat!',
      recipients: [`${digits}`],
      successTypes: ['sent', 'queued'],
    }, (completed, cancelled, error) => {
      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    });
  }

  showSendSmsSheet() {
    const BUTTONS = [];
    const { phoneNumbers } = this.props.contactSelected;
    phoneNumbers.map(
      ({ label, stringValue }) =>
        BUTTONS.push(`${label} ${stringValue}`)
    );
    BUTTONS.push('Cancel');
    const CANCEL_INDEX = BUTTONS.length;
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      this.sms(phoneNumbers[buttonIndex]);
    });
  }

  render() {
    const { phoneNumbers, fullName, isFeelChatUser } = this.props.contactSelected;

    return (
      <View style={styles.ContactProfilePageContainer}>
        <View style={styles.ContactProfilePageAvatarFullNameContainer}>
          <UserAvatar size="52" name={fullName}/>
          <Text style={styles.ContactProfilePageFullNameStyle}>{fullName}</Text>
        </View>
        <List containerStyle={styles.ContactProfilePagePhoneNumbersListContainer}>
          {
            phoneNumbers.map(
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
              onPress={() => this.showSendSmsSheet()}
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
