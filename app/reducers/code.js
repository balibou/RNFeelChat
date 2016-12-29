const initialState = {
  codeTyped: '',
};

export default function code(state = initialState, action = {}) {
  switch (action.type) {
    case 'CODETYPING':
      return {
        codeTyped: action.codeTyped,
      };
    default:
      return state;
  }
}
