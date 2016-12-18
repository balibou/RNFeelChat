import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';

const LoggedOut = ({ countryActions, selectedCountry }) => {
  const route = Routes.getSignInRoute();
  return (
    <ExNavigator
      initialRoute={route}
      style={styles.container}
      showNavigationBar={route.showNavigationBar}
      navigationBarStyle={styles.navigationBar}
      titleStyle={styles.title}
      sceneStyle={styles.scene}
      changeCountry={countryActions.changeCountry}
      selectedCountry={selectedCountry}
    />
  );
};

LoggedOut.propTypes = {
  countryActions: React.PropTypes.object,
  selectedCountry: React.PropTypes.object,
};

export default LoggedOut;
