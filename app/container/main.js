import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Meteor, { createContainer } from 'react-native-meteor';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Realm from 'realm';
import { realm } from './realmSchema';
// import { subscribeCached } from 'react-native-meteor-redux';

import settings from '../config/settings';
import LoggedOut from '../layouts/LoggedOut';
import LoggedIn from '../layouts/LoggedIn';
import SignedIn from '../layouts/SignedIn';
// import { MeteorStore } from './meteorRedux';
import * as countryActions from '../actions/countryActions';
import * as phoneActions from '../actions/phoneActions';
import * as codeActions from '../actions/codeActions';
import * as firstNameActions from '../actions/firstNameActions';
import * as lastNameActions from '../actions/lastNameActions';
import * as tokenActions from '../actions/tokenActions';
import * as navBarActions from '../actions/navBarActions';
import * as contactsActions from '../actions/contactsActions';
import { loadInitialTokenState } from '../config/loadInitialTokenState';
// import * as userActions from '../actions/userActions';

class App extends Component {
  componentWillMount() {
    Meteor.connect(settings.METEOR_URL);
  }

  componentWillUpdate() {
    const { changeTokenStates } = this.props.tokenActions;
    loadInitialTokenState(changeTokenStates).done();
  }

  render() {
    const { existingToken, loadingToken } = this.props;
    const { connected } = Meteor.status();
    const { user } = this.props;
    // console.log(user);
    const arr = realm.objects('User')[0].contacts;
    // console.log(arr.length);
    // for (var i=0; i<arr.length; i++){
    //   console.log(arr[i]);
    // }
    arr.map(x => console.log(x));
    // const toto = {}
    // realm.objects('User').map(x => Object.assign(toto, x));
    // console.log(toto);
    // realm.objects('User').map(x => console.log(x));
    // if (!realm.objects('User').length && user) {
    //   realm.write(() => {
    //     const userRealm = realm.create(
    //       'User', {
    //         _id: user._id,
    //         _version: user._version,
    //         contacts: user.contacts,
    //         createdAt: user.createdAt,
    //         signedIn: user.signedIn,
    //       }
    //     );
    //     /*user.contacts.map(contact => {
    //       console.log(contact);
    //       userRealm.contacts.push(contact);
    //     });*/
    //   });
    // }
    // realm.write(() => {
    //   const allUser = realm.objects('User');
    //   realm.delete(allUser);
    // });
    // realm.objects('User').map(x => console.log(x));

    if (existingToken && !loadingToken) {
      return <LoggedIn {...this.props} connected={connected} />;
    } else if (!existingToken && !loadingToken) {
      return <LoggedOut {...this.props} connected={connected} />;
    }
    return <SignedIn />; // pas SignedIn mais Loading ...
  }
}

const MeteorContainer = createContainer(() => {
  Meteor.subscribe('userData');
  return {
    user: Meteor.collection('users').findOne(),
    loggingIn: Meteor.loggingIn(),
  };
}, App);

export default connect(state => ({
  selectedCountry: state.Country.selectedCountry,
  phoneNumber: state.phone.phoneNumber,
  codeTyped: state.code.codeTyped,
  firstNameTyped: state.firstName.firstNameTyped,
  lastNameTyped: state.lastName.lastNameTyped,
  existingToken: state.token.existingToken,
  loadingToken: state.token.loadingToken,
  selectedTab: state.navBar.selectedTab,
  contacts: state.contacts,
  // userInfo: state.user.userInfo,
}),
  (dispatch) => ({
    countryActions: bindActionCreators(countryActions, dispatch),
    phoneActions: bindActionCreators(phoneActions, dispatch),
    codeActions: bindActionCreators(codeActions, dispatch),
    firstNameActions: bindActionCreators(firstNameActions, dispatch),
    lastNameActions: bindActionCreators(lastNameActions, dispatch),
    tokenActions: bindActionCreators(tokenActions, dispatch),
    navBarActions: bindActionCreators(navBarActions, dispatch),
    contactsActions: bindActionCreators(contactsActions, dispatch),
    // userActions: bindActionCreators(userActions, dispatch),
  })
)(MeteorContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

App.propTypes = {
  status: React.PropTypes.object,
  user: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
  existingToken: React.PropTypes.bool,
  loadingToken: React.PropTypes.bool,
  changeTokenStates: React.PropTypes.func,
};
