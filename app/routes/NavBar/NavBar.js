import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Tabs, Tab, Icon } from 'react-native-elements';
import styles from './styles';
import Contacts from '../Contacts';
import Realm from 'realm';

class NavBar extends Component {
  render() {
    const { selectedTab, changeTab } = this.props.navigator.props;
    // let realm = new Realm({
    //   schema: [{
    //     name: 'User',
    //     primaryKey: '_id',
    //     properties: {
    //       _id: 'string',
    //     },
    //   }],
    // });
    return (
      <Tabs>
        <Tab
          selected={selectedTab === 'Contacts'}
          renderIcon={() => <Icon name='person-outline' size={28} />}
          renderSelectedIcon={() => <Icon name='person' size={28} />}
          title='Contacts'
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          onPress={() => changeTab('contacts')}
        >
        <Contacts {...this.props}/>
        </Tab>
        <Tab
          selected={selectedTab === 'Chats'}
          renderIcon={() => <Icon name='chat-bubble-outline' size={26} />}
          renderSelectedIcon={() => <Icon name='chat-bubble' size={26} />}
          title='Chats'
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          onPress={() => changeTab('chats')}
        >
        <View><Text>CHATS</Text></View>
        {/* <View>
          {realm.objects('User').map(x => <Text key={x._id}>{x._id}</Text>)}
        </View> */}

        </Tab>
        <Tab
          selected={selectedTab === 'Settings'}
          renderIcon={() => <Icon name='settings-applications' size={28} />}
          renderSelectedIcon={() => <Icon name='settings' size={28} />}
          title='Settings'
          titleStyle={styles.titleStyle}
          selectedTitleStyle={styles.selectedTitleStyle}
          onPress={() => changeTab('settings')}
        >
        <View><Text>SETTINGS</Text></View>
        </Tab>
      </Tabs>
    );
  }
}

NavBar.propTypes = {
  navigator: React.PropTypes.object,
  selectedTab: React.PropTypes.string,
  changeTab: React.PropTypes.func,
};

export default NavBar;
