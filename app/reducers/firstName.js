const initialState = {
  firstNameTyped: '',
};

export default function firstName(state = initialState, action = {}) {
  switch (action.type) {
    case 'FIRSTNAMETYPING':
      return {
        firstNameTyped: action.firstNameTyped,
      };
    default:
      return state;
  }
}
