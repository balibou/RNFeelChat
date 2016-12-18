const initialState = {
  selectedCountry: {
    title: 'United Kingdom',
    phoneCode: '+44',
  },
};

export default function Country(state = initialState, action = {}) {
  switch (action.type) {
    case 'United Kingdom':
      return {
        state,
        selectedCountry: {
          title: 'United Kingdom',
          phoneCode: '+44',
        },
      };
    case 'France':
      return {
        state,
        selectedCountry: {
          title: 'France',
          phoneCode: '+33',
        },
      };
    default:
      return state;
  }
}
