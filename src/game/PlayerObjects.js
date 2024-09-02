import { Schools } from "../assets/data/Schools";

export const player = {
  id: "Player",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
};

export const opponent = {
  id: "Opponent",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
  fishBot: lisaBot,
};

// To-Do: Smart fishBot V2 preffers earning points from last card matches than fishing longer schools

// the dumbBot is just the one i plug in to debug the business logic
function dumbBot(
  gameOver,
  opponent,
  setOpponent,
  table,
  setTable,
  setLastPlacedCard
) {
  console.log("FishBot invoked");

  if (gameOver) {
    console.log("Game is over. No actions are allowed.");
    return;
  }

  let newHand = [...opponent.hand];

  if (newHand.length > 0) {
    const fishingCard = newHand.pop();
    console.log(`${opponent.id} played: ${JSON.stringify(fishingCard)}`);

    const updatedTable = [...table, fishingCard];
    console.log(`${opponent.id} added to table:`, fishingCard);

    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      hand: newHand,
    }));
    setTable(updatedTable);
    setLastPlacedCard(fishingCard);
  } else {
    console.log(`${opponent.id} has no cards to play with`);
  }
}

// smart fishBot V1 AKA Lisa preffers collecting cards than earning coins from last card match
function lisaBot(
  gameOver,
  opponent,
  setOpponent,
  table,
  setTable,
  setLastPlacedCard
) {
  console.log("FishBot invoked.");
  if (gameOver) {
    console.log("Game is over. No actions are allowed.");
    return;
  }
  let newHand = [...opponent.hand];
  console.log("newHand on initialization:", newHand);

  if (newHand.length > 0) {
    let fishingCard = null;
    let longestCombination = { cardsArray: [] };
    if (table.length > 0) {
      // prepare variables to perfom filtering in search of the best table selection and hook value
      const handNumbers = opponent.hand.map((card) => card.number);
      const tableNumbers = table.map((card) => card.number);

      // filters to find the possible combination(s):
      // filter the schools of less or equall lenght as table, with a matching hook value in both table and opponent's hand
      const subSchools = Schools.filter(
        (school) =>
          school.totalCards <= table.length &&
          handNumbers.includes(school.hook) &&
          tableNumbers.includes(school.hook)
      );
      // find all viable combinations with overlapping numbers in the table
      const viableCombinations = subSchools.filter((school) =>
        school.cardsArray.some((num) => tableNumbers.includes(num))
      );
      // find the longest cardsArray that can be collected
      longestCombination = viableCombinations.reduce(
        (maxSchool, currentSchool) =>
          currentSchool.cardsArray.length > maxSchool.cardsArray.length
            ? currentSchool
            : maxSchool,
        { cardsArray: [] }
      );
      console.log("Longest viable combo:", longestCombination);

      // find a card in hand with the same number value as the hook of the longest array
      const hookValue = longestCombination.hook;
      fishingCard = newHand.find((card) => card.number === hookValue);
      console.log("newHand after match found:", newHand);

      // if a match is found remove the matched card from the hand
      if (fishingCard) {
        newHand = newHand.filter((card) => card.id !== fishingCard.id);
      }

      // if no match is found discard the last card on hand
      if (!fishingCard) {
        fishingCard = newHand.pop();
        console.log("newHand after match not found:", newHand);
      }
    } else {
      fishingCard = newHand.pop();
      console.log("newHand after no cards in table:", newHand);
    }

    const updatedTable = [...table, fishingCard];
    console.log(`${this.id} played:`, fishingCard);
    setTable(updatedTable);
    setLastPlacedCard(fishingCard);
    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      hand: newHand,
    }));

    // remove cards matching the longestCombination from the table
    const updatedTableWithoutlongestCombination = updatedTable.filter(
      (card) => !longestCombination.cardsArray.includes(card.number)
    );
    console.log(
      "Updated table after removing longestCombination cards:",
      updatedTableWithoutlongestCombination
    );
    setTable(updatedTableWithoutlongestCombination);
  } else {
    console.log(`But ${this.id} has no cards to play`);
  }
}
