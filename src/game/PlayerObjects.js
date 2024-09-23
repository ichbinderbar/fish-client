import { getLongestCombination } from "./getLongestCombination";
import { getFishingCard } from "./getFishingCard";
import { switchActivePlayer } from "./SwitchActivePlayer";
import { removeCardsFromTable } from "./removeCombinationFromTable";

export const player = {
  id: "Player",
  name: "Player",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
};

export const opponent = {
  id: "Opponent",
  name: "El Loco Abdala",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
  fishBot: lisaBot,
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
  player,
  setPlayer,
  setCardsCollected,
}) {
  if (gameOver) {
    console.log("Game is over. No actions are allowed.");
    return;
  }
  const playerCurrentHand = [...player.hand];
  const currentHand = [...opponent.hand];
  const currentTable = [...table];
  const longestCombination = getLongestCombination(currentHand, currentTable);
  const hookValue = longestCombination.hook;
  const fishingCard = getFishingCard(
    currentHand,
    currentTable,
    hookValue,
    playerCurrentHand
  );

  // console.log("Current hand:", currentHand);
  // console.log("Current table:", currentTable);
  // console.log("Longest collectable combination:", longestCombination);
  // console.log("Hook value:", hookValue);
  // console.log("Fishing card:", fishingCard);
  // console.log("----------------------------------------");

  if (fishingCard) {
    const updatedHand = currentHand.filter((card) => card !== fishingCard);
    const updatedTable = [...currentTable, fishingCard];
    const updatedTableWithoutCombination = removeCardsFromTable(
      updatedTable,
      longestCombination.cardsArray,
      fishingCard
    );
    const isTableEmpty = updatedTableWithoutCombination.length === 0;
    const isMatchWithLastPlacedCard =
      lastPlacedCard && lastPlacedCard.number === longestCombination.hook;

    // console.log("Updated hand:", updatedHand);
    // console.log("Updated table:", updatedTable);
    // console.log(
    //   "Updated table without combination:",
    //   updatedTableWithoutCombination
    // );
    // console.log("Is table empty:", isTableEmpty);
    // console.log("Is match with last placed card:", isMatchWithLastPlacedCard);

    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      hand: updatedHand,
    }));
    setTable(updatedTable);

    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      fishedCards: prevOpponent.fishedCards + longestCombination.totalCards,
      coins:
        prevOpponent.coins +
        (isTableEmpty ? 1 : 0) +
        (isMatchWithLastPlacedCard ? 1 : 0),
    }));
    setTable(updatedTableWithoutCombination);

    setLastPlacedCard(fishingCard);
    setCardsCollected(longestCombination);
  } else {
    console.log(`${opponent.id} could not play any card.`);
  }

  switchActivePlayer({ setPlayer, setOpponent, player, opponent });
  // console.log("________________________________________");
}
