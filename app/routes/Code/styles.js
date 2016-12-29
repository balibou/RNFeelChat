import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  codeContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBottomColor,
  },
  codeInput: {
    flex: 1,
    margin: 6,
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 2,
    fontSize: 24,
    fontWeight: '400',
    height: 48,
    textAlign: 'center',
  },
  textInfos: {
    alignItems: 'center',
  },
  instructions: {
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 24,
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
});
