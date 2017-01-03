const initialState = {
  lastNameTyped: '',
};

export default function lastName(state = initialState, action = {}) {
  switch (action.type) {
    case 'LASTNAMETYPING':
      return {
        lastNameTyped: action.lastNameTyped,
      };
    default:
      return state;
  }
}
