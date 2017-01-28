import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  ContactProfilePageContainer: {
    paddingLeft: 30,
    paddingTop: 15,
  },
  ContactProfilePageAvatarFullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContactProfilePageFullNameStyle: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: '400',
  },
  ContactProfilePagePhoneNumbersListContainer: {
    marginBottom: 20,
    marginTop: 35,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: '#cbd2d9',
  },
  ContactProfilePagePhoneNumbersItemContainer: {
    paddingLeft: 0,
  },
  ContactProfilePagePhoneNumbersItemTitle: {
    paddingBottom: 5,
  },
  ContactProfilePagePhoneNumbersItemSubtitle: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
  },
  ContactProfilePageFeelChatOptionsContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  ContactProfilePageFeelChatOptionsItemTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.buttonText,
  },
  ContactProfilePageFeelChatOptionsItemContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ededed',
    paddingVertical: 13,
    paddingLeft: 0,
  },
});
