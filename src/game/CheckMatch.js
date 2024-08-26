export default function checkMatch(schools, selectedNumbers) {
  for (let i = 0; i < schools.length; i++) {
    const cardsArray = schools[i].cardsArray;

    if (arraysEqual(cardsArray, selectedNumbers)) {
      return {
        match: true,
        length: selectedNumbers.length,
      };
    }
  }

  return {
    match: false,
  };
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
