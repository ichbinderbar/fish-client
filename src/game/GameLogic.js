import deal from "./Deal";
import flipCoin from "./FlipCoin";
import shuffle from "./Shuffle";
// import replenish from "./Replenish";
// import sell from "./Sell";
// import sold from "./Sold";
// import { Deck } from "../assets/data/Deck";

const runGame = ({
  deck,
  setDeck,
  player,
  setPlayer,
  opponent,
  setOpponent,
  table,
  setTable,
  activePlayer,
  setActivePlayer,
  inactivePlayer,
  setInactivePlayer,
}) => {
  console.log("runGame function called");

  // Shuffle and set deck
  const playingDeck = shuffle(deck);
  setDeck(playingDeck);
  console.log("Current deck:", playingDeck);

  console.log("Current table:", table);

  // Determine active and inactive players
  const newActivePlayer = flipCoin() === "player" ? player : opponent;
  const newInactivePlayer = newActivePlayer === player ? opponent : player;
  setActivePlayer(newActivePlayer);
  setInactivePlayer(newInactivePlayer);
  console.log("Active player:", newActivePlayer);
  console.log("Inactive player:", newInactivePlayer);

  // Guard clauses to handle null values
  if (!newActivePlayer || !newInactivePlayer) {
    console.error("Active or inactive player is not set.");
    return;
  }

  // Deal cards to active and inactive players
  const updatedPlayer = deal(newActivePlayer, playingDeck);
  const updatedOpponent = deal(newInactivePlayer, playingDeck);
  setPlayer(updatedPlayer);
  setOpponent(updatedOpponent);
  console.log("Updated player:", updatedPlayer);
  console.log("Updated opponent:", updatedOpponent);

  // Example of simple operations
  if (playingDeck.length > 0) {
    console.log(`Deck has ${playingDeck.length} cards`);
  } else {
    console.log("Deck is empty");
  }

  // Update the table state (mock example)
  const newTable = [...table];
  setTable(newTable);
  console.log("Updated table:", newTable);

  // Log active and inactive players after switch
  console.log("Switched players. New active player ID:", newActivePlayer.id);
  console.log("New inactive player ID:", newInactivePlayer.id);
};

export default runGame;
