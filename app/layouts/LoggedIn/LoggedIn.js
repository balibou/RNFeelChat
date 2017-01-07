import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';

const LoggedIn = ({
  connected,
  selectedTab,
  navBarActions,
  loggingIn,
}) => {
  const route = Routes.getNavBarRoute();
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
    />
  );
};

LoggedIn.propTypes = {
  connected: React.PropTypes.bool,
  selectedTab: React.PropTypes.string,
  navBarActions: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

export default LoggedIn;
