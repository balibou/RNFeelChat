import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';

const LoggedOut = () => {
  const route = Routes.getSignInRoute();
  return (
    <ExNavigator
      initialRoute={route}
      style={styles.container}
      showNavigationBar={route.showNavigationBar}
      navigationBarStyle={styles.navigationBar}
      titleStyle={styles.title}
      sceneStyle={styles.scene}
    />
  );
};

export default LoggedOut;
