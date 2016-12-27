import React, { Component } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';
import Routes from '../../config/routes';
import { colors } from '../../config/styles';

class SignIn extends Component {
  componentDidUpdate() {
    this.textInput.focus();
  }

  shouldComponentUpdate() {
    return false;
  }

  openTerms() {
    Alert.alert(
      'Terms of Service',
      `\nBy signing up for FeelChat, you agree not to: \n
      - use our service to send spam or scam users.`,
      [
        { text: 'OK', onPress: () => this.textInput.focus() },
      ]
    );
  }

  render() {
    const { navigator } = this.props;
    return (
      <View>
        <ListItem
          key={1}
          title={navigator.props.selectedCountry.title}
          underlayColor={colors.underlayColor}
          onPress={() => {
            const route = Routes.getCountryRoute();
            navigator.push(route);
          }}
          containerStyle={styles.countryContainer}
          titleStyle={styles.countryAndCodePhoneTitle}
        />
        <View style={styles.phoneCodeAndPhoneContainer}>
          <ListItem
            key={2}
            title={navigator.props.selectedCountry.phoneCode}
            containerStyle={styles.phoneCodeContainer}
            titleStyle={styles.countryAndCodePhoneTitle}
          />
          <TextInput
            ref={(input) => { this.textInput = input; }}
            onChangeText={(phoneNumber) => navigator.props.changePhone('PHONETYPING', phoneNumber)}
            style={styles.phoneInput}
            placeholder='Your phone number'
            keyboardType='numeric'
            autoFocus={true}
          />
        </View>
        <View style={styles.textInfos}>
          <Text style={styles.instructions}>
            Please confirm your contry code{'\n'} and enter your phone number.
          </Text>
        </View>
        <View style={styles.textInfos}>
          <Text style={styles.terms}>
            By signing up,
          </Text>
          <View style={styles.termsSecondLine}>
            <Text style={styles.terms2}>you agree to the</Text>
            <Text style={styles.termsLink} onPress={() => this.openTerms()}> Terms of Service</Text>
            <Text style={styles.terms2}>.</Text>
          </View>
        </View>
      </View>
    );
  }
}

SignIn.propTypes = {
  navigator: React.PropTypes.object,
};

export default SignIn;
