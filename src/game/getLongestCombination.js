import { Schools } from "../assets/data/Schools";

export const getLongestCombination = (currentHand, currentTable) => {
  const handNumbers = currentHand.map((card) => card.number);
  const tableNumbers = currentTable.map((card) => card.number);

  const subSchools = Schools.filter(
    (school) =>
      school.totalCards <= currentTable.length + 1 &&
      handNumbers.includes(school.hook) &&
      tableNumbers.includes(school.hook)
  );

  const viableCombinations = subSchools.filter((school) =>
    school.cardsArray.some((num) => tableNumbers.includes(num))
  );

  return viableCombinations.reduce(
    (maxSchool, currentSchool) =>
      currentSchool.cardsArray.length > maxSchool.cardsArray.length
        ? currentSchool
        : maxSchool,
    { cardsArray: [] }
  );
};
