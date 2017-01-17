import { AsyncStorage } from 'react-native';
import Contacts from 'react-native-unified-contacts';
import Meteor from 'react-native-meteor';
import { sortByFamilyName } from './methods';

export const setContactsListProp = async (changeContactsList, filteredContactsList, filteredText) => {
  try {
    AsyncStorage.getItem('contactsList', (err, result) => {
      const contactsList = JSON.parse(result);
      if (filteredText) {
        changeContactsList('FILTERINGCONTACTS', contactsList, filteredContactsList, filteredText);
      } else {
        changeContactsList('INITIALISINGCONTACTS', contactsList);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const setContactsListAsyncstorage = async (changeContactsList, filteredContactsList, filteredText, connected, user) => {
  try {
    Contacts.getContacts((error, contacts) => {
      if (error) {
        console.error(error);
      } else {
        AsyncStorage.getItem('contactsList', (err, result) => {
          const sortedPhoneContacts = contacts.sort(sortByFamilyName);
          if (!result) {
            return AsyncStorage.setItem('contactsList', JSON.stringify(sortedPhoneContacts));
          }
          const sortedAsyncstorageResult = JSON.parse(result).sort(sortByFamilyName);

          if (JSON.stringify(sortedAsyncstorageResult) !== JSON.stringify(sortedPhoneContacts)) {
            AsyncStorage.setItem('contactsList', JSON.stringify(sortedPhoneContacts));
            setContactsListProp(changeContactsList, filteredContactsList, filteredText);
          }

          if (connected && user && user.contacts) {
            if (JSON.stringify(user.contacts) !== JSON.stringify(sortedAsyncstorageResult)) {
              Meteor.call('contacts.update', { contacts: sortedAsyncstorageResult });
            };
          } else if (connected && user && !user.contacts) {
            Meteor.call('contacts.insert', { contacts: sortedAsyncstorageResult });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
