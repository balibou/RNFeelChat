export function changeLastName(typeAction, lastNameTyped) {
  return {
    type: typeAction,
    lastNameTyped: lastNameTyped,
  };
}
