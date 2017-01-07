import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Meteor, { createContainer } from 'react-native-meteor';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import settings from '../config/settings';
import LoggedOut from '../layouts/LoggedOut';
import LoggedIn from '../layouts/LoggedIn';
import SignedIn from '../layouts/SignedIn';
import * as countryActions from '../actions/countryActions';
import * as phoneActions from '../actions/phoneActions';
import * as codeActions from '../actions/codeActions';
import * as firstNameActions from '../actions/firstNameActions';
import * as lastNameActions from '../actions/lastNameActions';
import * as tokenActions from '../actions/tokenActions';
import * as navBarActions from '../actions/navBarActions';
import { loadInitialTokenState } from '../config/loadInitialTokenState';

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

    if (existingToken && !loadingToken) {
      return <LoggedIn {...this.props} connected={connected} />;
    } else if (!existingToken && !loadingToken) {
      return <LoggedOut {...this.props} connected={connected} />;
    }
    return <SignedIn />;
  }
}

const MeteorContainer = createContainer(() => {
  Meteor.subscribe('userData');
  return {
    user: Meteor.user(),
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
}),
  (dispatch) => ({
    countryActions: bindActionCreators(countryActions, dispatch),
    phoneActions: bindActionCreators(phoneActions, dispatch),
    codeActions: bindActionCreators(codeActions, dispatch),
    firstNameActions: bindActionCreators(firstNameActions, dispatch),
    lastNameActions: bindActionCreators(lastNameActions, dispatch),
    tokenActions: bindActionCreators(tokenActions, dispatch),
    navBarActions: bindActionCreators(navBarActions, dispatch),
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
