const initialState = {
  selectedTab: 'Chats',
};

export default function navBar(state = initialState, action = {}) {
  switch (action.type) {
    case 'contacts':
      return {
        state,
        selectedTab: 'Contacts',
      };
    case 'chats':
      return {
        state,
        selectedTab: 'Chats',
      };
    case 'settings':
      return {
        state,
        selectedTab: 'Settings',
      };
    default:
      return state;
  }
}
