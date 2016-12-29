import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles';

class Code extends Component {

  render() {
    const { navigator } = this.props;
    return (
      <View>
        <View style={styles.codeContainer}>
          <TextInput
            ref={(code) => { this.codeTextInput = code; }}
            onChangeText={(codeTyped) => navigator.props.changeCode('CODETYPING', codeTyped)}
            style={styles.codeInput}
            placeholder='Code'
            keyboardType='numeric'
            autoFocus={true}
          />
        </View>
        <View style={styles.textInfos}>
          <Text style={styles.instructions}>
            We have sent you a SMS with the code.
          </Text>
        </View>
      </View>
    );
  }
}

Code.propTypes = {
  navigator: React.PropTypes.object,
};

export default Code;
