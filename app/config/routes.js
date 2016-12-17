import React from 'react';
import SignIn from '../routes/SignIn';
import Button from '../components/Button';

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
};

export default routes;
