export function changePhone(typeAction, phoneNumber) {
  return {
    type: typeAction,
    phoneNumber: phoneNumber,
  };
}
