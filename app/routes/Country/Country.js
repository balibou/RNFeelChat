import React from 'react';
import { List, ListItem } from 'react-native-elements';
import styles from './styles';
import { colors } from '../../config/styles';
import Routes from '../../config/routes';

function Country({ listCountries, navigator }) {
  return (
    <List containerStyle={styles.containerList}>
      {
        listCountries.map((country) => (
          <ListItem
            key={country.title}
            title={`${country.title} (${country.phoneCode})`}
            titleStyle={styles.titleListItem}
            onPress={() => {
              navigator.props.changeCountry(country.title);
              const route = Routes.getSignInRoute();
              navigator.push(route);
            }}
            underlayColor={colors.underlayColor}
          />
        ))
      }
    </List>
  );
}

Country.propTypes = {
  listCountries: React.PropTypes.array,
  navigator: React.PropTypes.object,
};

export default Country;
