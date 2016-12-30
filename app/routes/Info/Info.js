import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles';

class Info extends Component {

  render() {
    // const { navigator } = this.props;
    return (
      <View style={styles.infoContainer}>
        <View style={styles.infoBlock}>
          <View style={styles.profilePicBlock}>
            <View style={styles.circleBlock}>
              <Text style={styles.textCircleBlock}>Add{'\n'}photo</Text>
            </View>
          </View>
          <View style={styles.inputBlock}>
            <View style={styles.inputContainer}>
              <TextInput
                ref={(firstName) => { this.firstNameTextInput = firstName; }}
                // onChangeText={(codeTyped) => navigator.props.changeCode('CODETYPING', codeTyped)}
                style={styles.nameInput}
                placeholder='First name'
                keyboardType='default'
                autoFocus={true}
                returnKeyType='next'
                onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref={(lastName) => { this.lastNameTextInput = lastName; }}
                // onChangeText={(codeTyped) => navigator.props.changeCode('CODETYPING', codeTyped)}
                style={styles.nameInput}
                placeholder='Last name'
                keyboardType='default'
                onSubmitEditing={() => { this.firstNameTextInput.focus(); }}
              />
            </View>
          </View>
        </View>
        <View style={styles.textInfos}>
          <Text style={styles.instructions}>
            Enter your name and add {'\n'} a profile picture.
          </Text>
        </View>
      </View>
    );
  }
}

// Info.propTypes = {
//   navigator: React.PropTypes.object,
// };

export default Info;
