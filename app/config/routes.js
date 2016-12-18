import React from 'react';
import { Alert } from 'react-native';
import SignIn from '../routes/SignIn';
import Button from '../components/Button';
import Country from '../routes/Country';
import { createUserWithPhone } from '../lib/accounts-phone/phone_client';

export const routes = {
  getSignInRoute() {
    return {
      renderScene(navigator) {
        return (
          <SignIn
            navigator={navigator}
          />
        );
      },

      showNavigationBar: true,

      getTitle() {
        return 'Your Phone';
      },

      renderRightButton(navigator) {
        const { phoneCode } = navigator.props.selectedCountry;
        const { phoneNumber } = navigator.props;
        const callback = (err, res) => {
          if (err.error === 400) {
            Alert.alert('Invalid phone number. Please try again.');
          }
          // User already existing
          if (err.error === 403) {
            Alert.alert(err.reason);
          }
          if (res) { console.log(res); }
        };
        return (
          <Button
            text='Next'
            onPress={() => {
              createUserWithPhone({ phone: `${phoneCode}${phoneNumber}` }, callback);
            }}
          />
        );
      },

      renderLeftButton() {
        return null;
      },
    };
  },
  getCountryRoute() {
    return {
      renderScene(navigator) {
        return (
          <Country
            navigator={navigator}
          />
        );
      },

      showNavigationBar: true,

      getTitle() {
        return 'Country';
      },
    };
  },
};

export default routes;
