import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';
import Routes from '../../config/routes';
import { colors } from '../../config/styles';

class SignIn extends Component {
  componentDidUpdate() {
    this.textInput.focus();
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
            By signing up,{'\n'} you agree to the
            <Text style={styles.termsLink}> Terms of Service</Text>.
          </Text>
        </View>
      </View>
    );
  }
}

SignIn.propTypes = {
  navigator: React.PropTypes.object,
};

export default SignIn;
