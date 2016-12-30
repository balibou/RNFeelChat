import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  infoBlock: {
    flexDirection: 'row',
  },
  profilePicBlock: {
    width: 135,
    height: 135,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  circleBlock: {
    height: 100,
    borderRadius: 50,
    width: 100,
    borderWidth: 1,
    borderColor: colors.borderBottomColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCircleBlock: {
    textAlign: 'center',
    color: colors.textInCircle,
    fontWeight: '400',
  },
  inputBlock: {
    width: 240,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBottomColor,
  },
  nameInput: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 2,
    paddingTop: 6,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: '400',
    height: 48,
  },
  textInfos: {
    alignItems: 'center',
  },
  instructions: {
    padding: 20,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
    color: colors.colorInstructions,
  },
});
