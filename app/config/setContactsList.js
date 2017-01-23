import { AsyncStorage } from 'react-native';
import Contacts from 'react-native-unified-contacts';
import Meteor from 'react-native-meteor';
import { diff, observableDiff, applyChange } from 'deep-diff';
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

export const updateMeteorContacts = (
  sortedAsyncstorageResult,
  changeContactsList,
  filteredContactsList,
  filteredText
) => {
  Meteor.call(
    'contacts.update',
    { contacts: sortedAsyncstorageResult },
    (err, res) => {
      if (res) {
        AsyncStorage.setItem('contactsList', JSON.stringify(res));
        setContactsListProp(changeContactsList, filteredContactsList, filteredText);
      }
    }
  );
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

          if (sortedPhoneContacts.length !== sortedAsyncstorageResult.length) {
            AsyncStorage.setItem('contactsList', JSON.stringify(sortedPhoneContacts));
            setContactsListProp(changeContactsList, filteredContactsList, filteredText);
          }

          sortedPhoneContacts.map((phoneContact) => {
            for (const sortedAsyncstorageItem of sortedAsyncstorageResult) {
              if (sortedAsyncstorageItem.identifier === phoneContact.identifier) {
                observableDiff(sortedAsyncstorageItem, phoneContact, (difference) => {
                  // Apply all changes except those to the 'isFeelChatUser' property
                  if (difference.path.join('.') !== `phoneNumbers.${difference.path[1]}.isFeelChatUser`) {
                    applyChange(sortedAsyncstorageItem, phoneContact, difference);
                    AsyncStorage.setItem('contactsList', JSON.stringify(sortedPhoneContacts));
                    setContactsListProp(changeContactsList, filteredContactsList, filteredText);
                  }
                });
                break;
              }
            }
          });

          if (connected && user && user.contacts) {
            if (JSON.stringify(user.contacts) !== JSON.stringify(sortedAsyncstorageResult)) {
              updateMeteorContacts(
                sortedAsyncstorageResult,
                changeContactsList,
                filteredContactsList,
                filteredText
              );
            }
          } else if (connected && user && !user.contacts) {
            updateMeteorContacts(
              sortedAsyncstorageResult,
              changeContactsList,
              filteredContactsList,
              filteredText
            );
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
