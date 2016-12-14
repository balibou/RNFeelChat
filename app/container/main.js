import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Meteor, { createContainer, Accounts } from 'react-native-meteor';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class App extends Component {
  componentWillMount() {
    const url = 'http://localhost:3000/websocket';
    Meteor.connect(url);
    console.log(Accounts);
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const MeteorContainer = createContainer(() => {
  return {};
}, App);

export default connect(
)(MeteorContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
