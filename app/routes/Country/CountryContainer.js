import React, { Component } from 'react';
import Country from './Country';

class CountryContainer extends Component {
  render() {
    const listCountries = [
      {
        title: 'France',
        phoneCode: '+33',
      },
      {
        title: 'United Kingdom',
        phoneCode: '+44',
      },
    ];
    return (
      <Country
        listCountries={listCountries}
        {...this.props}
      />
    );
  }
}

export default CountryContainer;
