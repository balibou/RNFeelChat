import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  countryContainer: {
    marginLeft: 20,
    paddingVertical: 14,
  },
  countryAndCodePhoneTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  phoneCodeAndPhoneContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBottomColor,
  },
  phoneCodeContainer: {
    paddingVertical: 17,
    borderBottomWidth: 0,
    borderRightWidth: 1,
    borderRightColor: colors.borderBottomColor,
  },
  phoneInput: {
    flex: 1,
    margin: 6,
    paddingLeft: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: '500',
  },
  textInfos: {
    alignItems: 'center',
  },
  instructions: {
    padding: 28,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
    color: colors.colorInstructions,
  },
  terms: {
    padding: 28,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
