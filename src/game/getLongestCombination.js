import { SubSchools as Schools } from "../assets/data/SubSchools";

export const getLongestCombination = (currentHand, currentTable) => {
  const handNumbers = currentHand.map((card) => card.number);
  const tableNumbers = currentTable.map((card) => card.number);
  const tablePowerSet = powerSet(tableNumbers);
  const subSchools = Schools.filter(
    (school) =>
      school.totalCards <= currentTable.length + 1 &&
      handNumbers.includes(school.hook) &&
      tableNumbers.includes(school.hook)
  );
  const subSchoolsArrays = subSchools.map((school) => school.cardsArray);
  const matchesFromTableInSubSchools = findExactMatches(
    tablePowerSet,
    subSchoolsArrays
  );
  const bestCombination = findLongestCombination(matchesFromTableInSubSchools);
  const hook = findHookByCardsArray(subSchools, bestCombination);
  const totalCards = findTotalCardsByCardsArray(subSchools, bestCombination);

  // console.log("Hand numbers:", handNumbers);
  // console.log("Table numbers:", tableNumbers);
  // console.log("Power set of table numbers:", tablePowerSet);
  // console.log("Filtered subSchools:", subSchoolsArrays);
  // console.log("Possible table selections:", matchesFromTableInSubSchools);
  // console.log("Best matching combination:", bestCombination);
  // console.log("Total cards:", totalCards);

  return {
    totalCards: totalCards ?? 0,
    hook: hook,
    cardsArray: bestCombination,
  };
};

const findHookByCardsArray = (arrayOfObjects, targetArray) => {
  // convert the targetArray to a JSON string for comparison
  const targetArrayStr = JSON.stringify(targetArray);

  // find the object where cardsArray matches the targetArray
  const match = arrayOfObjects.find(
    (obj) => JSON.stringify(obj.cardsArray) === targetArrayStr
  );

  // return the hook property if a match is found, otherwise return undefined
  return match ? match.hook : undefined;
};

const findTotalCardsByCardsArray = (arrayOfObjects, targetArray) => {
  // convert the targetArray to a JSON string for comparison
  const targetArrayStr = JSON.stringify(targetArray);

  // find the object where cardsArray matches the targetArray
  const match = arrayOfObjects.find(
    (obj) => JSON.stringify(obj.cardsArray) === targetArrayStr
  );

  // return the totalCards property if a match is found, otherwise return 0
  return match ? match.totalCards : 0;
};

const findLongestCombination = (arrayOfArrays) => {
  return arrayOfArrays.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, []);
};

// power set function that sorts both elements within each subset and the subsets
const powerSet = (array) => {
  const subsets = array.reduce(
    (subsets, value) =>
      subsets.concat(
        subsets.map((set) => [...set, value].sort((a, b) => a - b))
      ),
    [[]]
  );

  return subsets.sort((a, b) => a.length - b.length);
};

const findExactMatches = (arrayOfArrays1, arrayOfArrays2) => {
  const set = new Set(arrayOfArrays2.map((arr) => JSON.stringify(arr)));

  return arrayOfArrays1.filter((arr) => set.has(JSON.stringify(arr)));
};
