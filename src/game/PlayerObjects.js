import { getLongestCombination } from "./getLongestCombination";
import { getFishingCard } from "./getFishingCard";
import { switchActivePlayer } from "./SwitchActivePlayer";

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
  fishBot: dumbBot,
};

// TODO: smart fishBot V2 AKA Juan preffers earning points from last card matches than fishing longer schools

// the dumbBot is just for debugging the business logic
function dumbBot({
  gameOver,
  opponent,
  setOpponent,
  table,
  setTable,
  setLastPlacedCard,
  player,
  setPlayer,
}) {
  console.log("FishBot invoked");

  if (gameOver) {
    console.log("Game is over. No actions are allowed.");
    return;
  }

  let currentHand = [...opponent.hand];

  if (currentHand.length > 0) {
    const fishingCard = currentHand.pop();
    const updatedTable = [...table, fishingCard];

    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      hand: currentHand,
    }));
    setTable(updatedTable);
    setLastPlacedCard(fishingCard);
  } else {
    console.log(`${opponent.id} has no cards to play with.`);
  }
  switchActivePlayer({ setPlayer, setOpponent, player, opponent });
}

// smart fishBot V1 AKA Lisa preffers collecting cards than earning coins from last card match
function lisaBot({
  gameOver,
  opponent,
  setOpponent,
  table,
  setTable,
  setLastPlacedCard,
  lastPlacedCard,
}) {
  if (gameOver) {
    console.log("Game is over. No actions are allowed.");
    return;
  }

  const currentHand = [...opponent.hand];
  const currentTable = [...table];
  const longestCombination = getLongestCombination(currentHand, currentTable);
  const hookValue = longestCombination.hook;
  const fishingCard = getFishingCard(currentHand, currentTable, hookValue);

  // console.log("Current Hand:", currentHand);
  // console.log("Current Table:", currentTable);
  // console.log("Longest Combination:", longestCombination);
  // console.log("Hook Value:", hookValue);
  // console.log("Fishing Card:", fishingCard);

  if (fishingCard) {
    const newHand = currentHand.filter((card) => card !== fishingCard);
    const updatedTable = [...currentTable, fishingCard];
    const updatedTableWithoutCombination = updatedTable.filter(
      (card) => !longestCombination.cardsArray.includes(card.number)
    );
    const isTableEmpty = updatedTableWithoutCombination.length === 0;
    const isMatchWithLastPlacedCard =
      lastPlacedCard && lastPlacedCard.number === longestCombination.hook;

    // console.log("New Hand:", newHand);
    // console.log("Updated Table:", updatedTable);
    // console.log(
    //   "Updated Table Without Combination:",
    //   updatedTableWithoutCombination
    // );
    // console.log("Is Table Empty:", isTableEmpty);
    // console.log("Is Match With Last Placed Card:", isMatchWithLastPlacedCard);

    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      hand: newHand,
    }));
    setTable(updatedTable);

    setTimeout(() => {
      setOpponent((prevOpponent) => ({
        ...prevOpponent,
        fishedCards:
          prevOpponent.fishedCards + longestCombination.cardsArray.length,
        coins:
          prevOpponent.coins +
          (isTableEmpty ? 1 : 0) +
          (isMatchWithLastPlacedCard ? 1 : 0),
      }));
      setTable(updatedTableWithoutCombination);
    }, 1000);
    setLastPlacedCard(fishingCard);
  } else {
    console.log(`${opponent.id} could not play any card.`);
  }

  switchActivePlayer({ setPlayer, setOpponent, player, opponent });
}
