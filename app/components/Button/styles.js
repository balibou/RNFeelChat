import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    margin: 5,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
