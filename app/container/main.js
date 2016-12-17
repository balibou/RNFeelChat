import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Meteor, { createContainer } from 'react-native-meteor';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import settings from '../config/settings';

class App extends Component {
  componentWillMount() {
    Meteor.connect(settings.METEOR_URL);
  }

  render() {
    const { user, loggingIn } = this.props;
    const status = Meteor.status();

    if (status.connected === false || loggingIn) {
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      );
    } else if (user !== null) {
      return (
        <View style={styles.container}>
          <Text>LoggedIn</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>LoggedOut</Text>
      </View>
    );
  }
}

const MeteorContainer = createContainer(() => {
  return {
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, App);

export default connect(
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
