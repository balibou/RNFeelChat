import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';

const SignIn = () =>
  (
    <View>
      <ListItem
        key={1}
        title='United Kingdom'
        onPress={() => console.log('Button Pressed')}
        containerStyle={styles.countryContainer}
        titleStyle={styles.countryAndCodePhoneTitle}
      />
      <View style={styles.phoneCodeAndPhoneContainer}>
        <ListItem
          key={2}
          title='+44'
          containerStyle={styles.phoneCodeContainer}
          titleStyle={styles.countryAndCodePhoneTitle}
        />
        <TextInput
          style={styles.phoneInput}
          placeholder='Your phone number'
          keyboardType='numeric'
          autoFocus={true}
        />
      </View>
      <View style={styles.textInfos}>
        <Text style={styles.instructions}>
          Please confirm your contry code{'\n'} and enter your phone number.
        </Text>
      </View>
      <View style={styles.textInfos}>
        <Text style={styles.terms}>
          By signing up,{'\n'} you agree to the Terms of Service.
        </Text>
      </View>
    </View>
  );

SignIn.propTypes = {
};

export default SignIn;
