import { Schools } from "../assets/data/Schools";

export const player = {
  id: "Player",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
  fish: fish,
};

export const opponent = {
  id: "Opponent",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
  fishBot: stupidFishBot,
};

function fish() {
  if (this.hand.length > 0) {
    const fishingCard = this.hand.pop();
    console.log(`${this.id} played: ${JSON.stringify(fishingCard)}`);
    return fishingCard;
  } else {
    console.log(`${this.id} has no cards to play with`);
    return null;
  }
}

function stupidFishBot(
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

function fishBot(
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
  let finalHand = [];
  console.log("Hand before maniputalion:", newHand);
  if (newHand.length > 0) {
    let fishingCard = null;
    if (table.length > 0) {
      // prepare variables to perfom filtering in search of the best table selection and hook value
      const handNumbers = opponent.hand.map((card) => card.number);
      console.log("Hand:", handNumbers);
      const tableNumbers = table.map((card) => card.number);
      console.log("Table:", tableNumbers);

      // filters to find the possible combination(s):
      // filter the schools of less or equall lenght as table, with a matching hook value in both table and opponent's hand
      const subSchools = Schools.filter(
        (school) =>
          school.totalCards <= table.length &&
          handNumbers.includes(school.hook) &&
          tableNumbers.includes(school.hook)
      );
      console.log("Filtered options:", subSchools);
      // find all viable combinations with overlapping numbers in the table
      const viableCombinations = subSchools.filter((school) =>
        school.cardsArray.some((num) => tableNumbers.includes(num))
      );
      console.log("All viable combos:", viableCombinations);
      // find the longest cardsArray that can be collected
      const longestSchool = viableCombinations.reduce(
        (maxSchool, currentSchool) =>
          currentSchool.cardsArray.length > maxSchool.cardsArray.length
            ? currentSchool
            : maxSchool,
        { cardsArray: [] }
      );
      console.log("Longest viable combo:", longestSchool);

      // find a card in hand with the same number value as the hook of the longest array
      const hookValue = longestSchool.hook;
      fishingCard = newHand.find((card) => card.number === hookValue);

      // if no match is found discard the last card on hand
      if (!fishingCard) {
        fishingCard = newHand[newHand.length - 1];
        finalHand = newHand.slice(0, -1);
        console.log("Hand after no viable match was found:", newHand);
      }
      console.log("Selected fishing card:", fishingCard);
    } else {
      fishingCard = newHand[newHand.length - 1];
      finalHand = newHand.slice(0, -1);
      console.log("Hand after empty table pop:", newHand);
    }
    if (fishingCard) {
      const updatedTable = [...table, fishingCard];
      console.log(`${this.id} played:`, fishingCard);
      setTable(updatedTable);
      console.log("newHand as it will be updated after pop:", newHand);
      setLastPlacedCard(fishingCard);
      console.log("Hand before it is updated in state:", newHand);
      setOpponent((prevOpponent) => ({
        ...prevOpponent,
        hand: finalHand,
      }));
    }
  } else {
    console.log(`But ${this.id} has no cards to play`);
  }
}

// To-Do: Smart fishBot V1 preffers collecting cards than earning coins from last card match
// to determine best play the fishBot:
////// - compares its hand array to the table card array number values and finds the longest combination in table that is also in schools
////// - and returns first card that matches longest combination in schools

// To-Do: Smart fishBot V2 preffers earning points from last card matches than fishing longer schools
// to determine best play the fishBot:
////// - compares its hand array to the table card array number values and finds the longest combination in table that is also in schools that also matches the number value
////// - and returns first card that matches this criteria
