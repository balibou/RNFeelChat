import React from 'react';
import { Alert, View, Text, AsyncStorage } from 'react-native';
import Meteor from 'react-native-meteor';
import { Icon } from 'react-native-elements';
import SignIn from '../routes/SignIn';
import Button from '../components/Button';
import Country from '../routes/Country';
import { createUserWithPhone, verifyPhone } from '../lib/accounts-phone/phone_client';
import Code from '../routes/Code';
import { styles } from './styles';
import { settings } from './settings';
import Info from '../routes/Info';
import NavBar from '../routes/NavBar';
import Loading from '../components/Loading'
import ContactProfilePage from '../routes/ContactProfilePage';
import ChatPage from '../routes/ChatPage';


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
  getSignedInRoute() {
    return {
      renderScene() {
        return <View></View>;
      },

      showNavigationBar: true,
    };
  },
  getNavBarRoute() {
    return {
      renderScene(navigator) {
        return (
          <NavBar
            navigator={navigator}
          />
        );
      },

      showNavigationBar: true,

      renderNavTitle(selectedTab) {
        if (selectedTab === 'Chats') {
          return (
            <View style={styles.navBarRouteTitleNotConnected}>
              <Loading size='small'/>
              <Text style={styles.navBarRouteTitleText}>Waiting for network</Text>
            </View>
          );
        }
        return (
          <View style={styles.navBarOtherRouteTitleNotConnected}>
            <Text style={styles.navBarRouteTitleText}>{selectedTab}</Text>
          </View>
        );
      },

      getTitle(navigator) {
        const { connected, loggingIn, selectedTab } = navigator.props;
        if (!connected) {
          return (
            this.renderNavTitle(selectedTab)
          );
        }
        if (connected && loggingIn) {
          return (
            <View style={styles.navBarRouteTitleConnectedLoggingIn}>
              <Loading size='small'/>
              <Text style={styles.navBarRouteTitleText}>Connecting ...</Text>
            </View>
          );
        }
        return selectedTab;
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
  getContactProfilePageRoute(contactSelected) {
    return {
      renderScene(navigator) {
        return (
          <ContactProfilePage
            navigator={navigator}
            contactSelected={contactSelected}
          />
        );
      },

      showNavigationBar: true,

      getTitle() {
        return 'Infos';
      },

      renderLeftButton(navigator) {
        const { selectedTab } = navigator.props;
        return (
          <View style={styles.ContactProfilePageRouteLeftButtonView}>
            <Icon
              name='chevron-left'
              size={28}
              onPress={() => navigator.pop()}
            />
            <Text
              onPress={() => navigator.pop()}
              style={styles.ContactProfilePageRouteLeftButtonText}
            >
              {selectedTab}
            </Text>
          </View>
        );
      },
    };
  },
  getChatPageRoute(contact, fullName) {
    return {
      renderScene(navigator) {
        return (
          <ChatPage
            navigator={navigator}
            contact={contact}
            contactFullName={fullName}
          />
        );
      },

      showNavigationBar: true,

      getTitle() {
        return fullName;
      },

      renderLeftButton(navigator) {
        return (
          <View style={styles.ContactProfilePageRouteLeftButtonView}>
            <Icon
              name='chevron-left'
              size={28}
              onPress={() => navigator.pop()}
            />
            <Text
              onPress={() => navigator.pop()}
              style={styles.ContactProfilePageRouteLeftButtonText}
            >
              Infos
            </Text>
          </View>
        );
      },
    };
  },
};

export default routes;
