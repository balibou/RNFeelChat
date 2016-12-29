import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';

const LoggedOut = ({
  countryActions,
  selectedCountry,
  phoneActions,
  phoneNumber,
  connected,
  codeActions,
  codeTyped,
}) => {
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
      changePhone={phoneActions.changePhone}
      phoneNumber={phoneNumber}
      connected={connected}
      changeCode={codeActions.changeCode}
      codeTyped={codeTyped}
    />
  );
};

LoggedOut.propTypes = {
  countryActions: React.PropTypes.object,
  selectedCountry: React.PropTypes.object,
  phoneActions: React.PropTypes.object,
  phoneNumber: React.PropTypes.string,
  connected: React.PropTypes.bool,
  codeActions: React.PropTypes.object,
  codeTyped: React.PropTypes.string,
};

export default LoggedOut;
