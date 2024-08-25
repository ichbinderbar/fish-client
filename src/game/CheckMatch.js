export default function checkMatch(schools, selectedNumbers) {
  // Iterate through each school in the schools array
  for (let i = 0; i < schools.length; i++) {
    // Get the current cardsArray
    const cardsArray = schools[i].cardsArray;

    // Check if selectedNumbers matches the current cardsArray
    if (arraysEqual(cardsArray, selectedNumbers)) {
      return {
        match: true,
        length: selectedNumbers.length,
      };
    }
  }

  // If no match was found, return false
  return {
    match: false,
  };
}

// Utility function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
