import React from 'react';
import { Alert, View, Text, AsyncStorage } from 'react-native';
import Meteor from 'react-native-meteor';
import SignIn from '../routes/SignIn';
import Button from '../components/Button';
import Country from '../routes/Country';
import { createUserWithPhone, verifyPhone } from '../lib/accounts-phone/phone_client';
import Code from '../routes/Code';
import { styles } from './styles';
import { settings } from './settings';
import Info from '../routes/Info';


const Data = Meteor.getData();

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
        const { phoneNumber, connected } = navigator.props;
        const internationalPhoneNumber = phoneCode + phoneNumber;
        const callback = (err, res) => {
          if (err && err.error === 400) {
            Alert.alert('Invalid phone number. Please try again.');
          }
          // User already existing
          if (err && err.error === 403) {
            Alert.alert(err.reason);
          }
          if (res) {
            AsyncStorage.setItem(settings.USER_TOKEN_KEY, res.token);
            Data._tokenIdSaved = res.token;
            Meteor._userIdSaved = res.id;
            const codeRoute = routes.getCodeRoute(internationalPhoneNumber);
            navigator.push(codeRoute);
          }
        };
        return (
          <Button
            text='Next'
            onPress={() => {
              if (connected) {
                createUserWithPhone({ phone: `${internationalPhoneNumber}` }, callback);
              } else {
                Alert.alert('No connection to server. Please try again.');
              }
            }}
          />
        );
      },

      renderLeftButton() {
        return null;
      },
    };
  },
  getCodeRoute(internationalPhone) {
    return {
      renderScene(navigator) {
        return (
          <Code
            navigator={navigator}
          />
        );
      },

      showNavigationBar: true,

      renderTitle() {
        return (
        <View style={styles.codeRouteTitle}>
            <Text style={styles.codeRouteTitleText}>{internationalPhone}</Text>
          </View>
        );
      },

      getTitle() {
        return internationalPhone;
      },

      renderRightButton(navigator) {
        const { codeTyped, connected } = navigator.props;
        const callback = (err, res) => {
          if (err && err.error === 403 && err.reason === 'Code is must be provided to method') {
            Alert.alert('Code must be provided');
          } else if (err && err.error === 403) {
            Alert.alert(err.reason);
          }
          if (res) {
            AsyncStorage.setItem(settings.USER_TOKEN_KEY, res.token);
            Data._tokenIdSaved = res.token;
            Meteor._userIdSaved = res.id;
            const infoRoute = routes.getInfoRoute();
            navigator.push(infoRoute);
          }
        };
        return (
          <Button
            text='Next'
            onPress={() => {
              if (connected) {
                verifyPhone(internationalPhone, codeTyped, callback);
              } else {
                Alert.alert('No connection to server. Please try again.');
              }
            }}
          />
        );
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
  getInfoRoute() {
    return {
      renderScene(navigator) {
        return (
          <Info
            navigator={navigator}
          />
        );
      },

      showNavigationBar: true,

      getTitle() {
        return 'Your Info';
      },

      renderRightButton(navigator) {
        const { firstNameTyped, lastNameTyped } = navigator.props;
        return (
          <Button
            text='Next'
            onPress={() => {
              Meteor.call('names.insert', {
                firstName: firstNameTyped,
                lastName: lastNameTyped,
              }, (err, res) => {
                if (res) {
                  AsyncStorage.setItem(settings.USER_ALREADY_SIGNED_UP, 'true');
                }
              });
            }}
          />
        );
      },
    };
  },
};

export default routes;
