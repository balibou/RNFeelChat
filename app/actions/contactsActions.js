export function changeContactsList(typeAction, contactsList, filteredContactsList, filteredText) {
  return {
    type: typeAction,
    contactsList: contactsList,
    filteredContactsList: filteredContactsList,
    filteredText: filteredText,
  };
}
