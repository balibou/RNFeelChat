import { AsyncStorage } from 'react-native';
import Contacts from 'react-native-unified-contacts';
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

export const setContactsListAsyncstorage = async (changeContactsList, filteredContactsList, filteredText) => {
  try {
    Contacts.getContacts((error, contacts) => {
      if (error) {
        console.error(error);
      } else {
        AsyncStorage.getItem('contactsList', (err, result) => {
          const sortedAsyncstorageResult = JSON.parse(result).sort(sortByFamilyName);
          const sortedPhoneContacts = contacts.sort(sortByFamilyName);

          if (JSON.stringify(sortedAsyncstorageResult) !== JSON.stringify(sortedPhoneContacts)) {
            AsyncStorage.setItem('contactsList', JSON.stringify(sortedPhoneContacts));
            setContactsListProp(changeContactsList, filteredContactsList, filteredText);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
