export const sortByFamilyName = (a, b) => {
  if (a.familyName < b.familyName) return -1;
  if (a.familyName > b.familyName) return 1;
  return 0;
};
