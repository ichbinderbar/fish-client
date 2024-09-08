import { Schools } from "../assets/data/Schools";

export const getLongestCombination = (currentHand, currentTable) => {
  const handNumbers = currentHand.map((card) => card.number);
  const tableNumbers = currentTable.map((card) => card.number);
  // const uniqueTableNumbers = [
  //   ...new Set(currentTable.map((card) => card.number)),
  // ];

  console.log("Hand numbers:", handNumbers);
  console.log("Table numbers:", tableNumbers);

  // filter schools into a subset comprised of the arrays with a hook value
  // that is both in the player's hand and the table
  // and which length is less or equall to the the length of the table plus one
  // to account for the card that has not yet been placed on the table
  const subSchools = Schools.filter(
    (school) =>
      school.totalCards <= currentTable.length + 1 &&
      handNumbers.includes(school.hook) &&
      tableNumbers.includes(school.hook)
  );

  console.log("---Filtered subSchools:", subSchools);

  // Filter subSchools to find viable combinations
  const viableCombinations = subSchools.filter((school) =>
    school.cardsArray.some((num) => tableNumbers.includes(num))
  );

  console.log("---Viable combinations:", viableCombinations);

  // Find the longest combination
  const longestCombination = viableCombinations.reduce(
    (maxSchool, currentSchool) =>
      currentSchool.cardsArray.length > maxSchool.cardsArray.length
        ? currentSchool
        : maxSchool,
    { cardsArray: [] }
  );

  console.log("---Longest combination:", longestCombination);

  return longestCombination;
};
