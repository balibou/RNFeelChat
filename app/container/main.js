import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Meteor, { createContainer } from 'react-native-meteor';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Loading from '../components/Loading';
import settings from '../config/settings';
import LoggedOut from '../layouts/LoggedOut';
import * as countryActions from '../actions/countryActions';
import * as phoneActions from '../actions/phoneActions';
import * as codeActions from '../actions/codeActions';

class App extends Component {
  componentWillMount() {
    Meteor.connect(settings.METEOR_URL);
  }

  render() {
    const { user, loggingIn } = this.props;
    const { connected, status } = Meteor.status();

    // if (status.connected === false || loggingIn) {
    //   return <Loading />;
    // } else if (user !== null) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>LoggedIn</Text>
    //     </View>
    //   );
    // }
    return <LoggedOut {...this.props} connected={connected} />;
  }
}

const MeteorContainer = createContainer(() => {
  return {
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, App);

export default connect(state => ({
  selectedCountry: state.Country.selectedCountry,
  phoneNumber: state.phone.phoneNumber,
  codeTyped: state.code.codeTyped,
}),
  (dispatch) => ({
    countryActions: bindActionCreators(countryActions, dispatch),
    phoneActions: bindActionCreators(phoneActions, dispatch),
    codeActions: bindActionCreators(codeActions, dispatch),
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
};
