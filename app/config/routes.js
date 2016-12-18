import React from 'react';
import SignIn from '../routes/SignIn';
import Button from '../components/Button';
import Country from '../routes/Country';

export const routes = {
  getSignInRoute() {
    return {
      renderScene(navigator) {
        return <SignIn navigator={navigator} />;
      },

      showNavigationBar: true,

      getTitle() {
        return 'Your Phone';
      },

      renderRightButton() {
        return (
          <Button text='Next' onPress={() => { console.log('Tapped right button'); }} />
        );
      },
    };
  },
  getCountryRoute() {
    return {
      renderScene(navigator) {
        return <Country navigator={navigator} />;
      },

      showNavigationBar: true,

      getTitle() {
        return 'Country';
      },
    };
  },
};

export default routes;
