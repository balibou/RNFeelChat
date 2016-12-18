const initialState = {
  phoneNumber: '',
};

export default function Phone(state = initialState, action = {}) {
  switch (action.type) {
    case 'PHONETYPING':
      return {
        phoneNumber: action.phoneNumber,
      };
    default:
      return state;
  }
}
