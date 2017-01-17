import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';
import { setContactsListAsyncstorage } from '../../config/setContactsList';

const LoggedIn = ({
  connected,
  selectedTab,
  navBarActions,
  loggingIn,
  contactsActions,
  contacts,
  user,
}) => {
  const route = Routes.getNavBarRoute();
  const { changeContactsList } = contactsActions;
  const { filteredContactsList, filteredText } = contacts;
  setContactsListAsyncstorage(changeContactsList, filteredContactsList, filteredText, connected, user).done();
  return (
    <ExNavigator
      initialRoute={route}
      style={styles.container}
      showNavigationBar={route.showNavigationBar}
      navigationBarStyle={styles.navigationBar}
      titleStyle={styles.title}
      sceneStyle={styles.scene}
      connected={connected}
      selectedTab={selectedTab}
      changeTab={navBarActions.changeTab}
      loggingIn={loggingIn}
      changeContactsList={changeContactsList}
      contacts={contacts}
      filteredText={filteredText}
      user={user}
    />
  );
};

LoggedIn.propTypes = {
  connected: React.PropTypes.bool,
  selectedTab: React.PropTypes.string,
  navBarActions: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
  contactsActions: React.PropTypes.object,
  contacts: React.PropTypes.object,
  user: React.PropTypes.object,
};

export default LoggedIn;
