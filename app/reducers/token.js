const initialState = {
  existingToken: false,
  loadingToken: true,
};

export default function token(state = initialState, action = {}) {
  switch (action.type) {
    case 'TOKENEXISTS':
      return {
        existingToken: true,
        loadingToken: false,
      };
    case 'TOKENDOESNTEXIST':
      return {
        existingToken: false,
        loadingToken: false,
      };
    default:
      return state;
  }
}
