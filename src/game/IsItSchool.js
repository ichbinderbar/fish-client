// Utility function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

// Function to compare all cardsArray in the Schools array
export default function compareCardsArrays(schools) {
  const results = [];

  for (let i = 0; i < schools.length - 1; i++) {
    for (let j = i + 1; j < schools.length; j++) {
      // Sort both arrays before comparing
      const sortedArray1 = [...schools[i].cardsArray].sort((a, b) => a - b);
      const sortedArray2 = [...schools[j].cardsArray].sort((a, b) => a - b);

      if (arraysEqual(sortedArray1, sortedArray2)) {
        results.push({
          school1: i,
          school2: j,
          cardsArray: sortedArray1,
        });
      }
    }
  }

  return results;
}

// Example usage
const matchingSchools = compareCardsArrays(Schools);
console.log(matchingSchools);
