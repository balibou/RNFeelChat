const initialState = {
  contactsList: [],
  filteredContactsList: [],
};

export default function contacts(state = initialState, action = {}) {
  const { contactsList, filteredText } = action;
  switch (action.type) {
    case 'INITIALISINGCONTACTS':
      return {
        contactsList: contactsList,
        filteredContactsList: contactsList,
      };
    case 'FILTERINGCONTACTS': {
      return {
        contactsList: contactsList,
        filteredContactsList: contactsList.filter((contact) => {
          if (contact.fullName.includes(filteredText)) return contact;
        }),
        filteredText: filteredText,
      };
    }
    default:
      return state;
  }
}
