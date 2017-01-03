import React, { Component } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Meteor from 'react-native-meteor';
import styles from './styles';

class Info extends Component {

  render() {
    const { user, changeFirstName, changeLastName } = this.props.navigator.props;
    return (
      <View style={styles.infoContainer}>
        <View style={styles.infoBlock}>
          <View style={styles.profilePicBlock}>
            {user.profilePic ?
              <Image
                style={styles.circleBlock}
                source={{ uri: user.profilePic }}
              />
            :
              <View style={styles.circleBlock}>
                <Text
                  style={styles.textCircleBlock}
                  onPress={ () => {
                    ImagePicker.openPicker({
                      width: 150,
                      height: 150,
                      cropping: true,
                      cropperCircleOverlay: true,
                    }).then(image => {
                      Meteor.call('pic.insert', {
                        localPicSelected: image.path,
                      });
                    });
                  }}>
                    Add{'\n'}photo
                </Text>
              </View>
            }
          </View>
          <View style={styles.inputBlock}>
            <View style={styles.inputContainer}>
              <TextInput
                ref={(firstName) => { this.firstNameTextInput = firstName; }}
                onChangeText={(firstNameTyped) =>
                  changeFirstName('FIRSTNAMETYPING', firstNameTyped)
                }
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
                onChangeText={(lastNameTyped) =>
                  changeLastName('LASTNAMETYPING', lastNameTyped)
                }
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

Info.propTypes = {
  navigator: React.PropTypes.object,
  props: React.PropTypes.object,
  user: React.PropTypes.object,
  changeFirstName: React.PropTypes.func,
  changeLastName: React.PropTypes.func,
};

export default Info;
