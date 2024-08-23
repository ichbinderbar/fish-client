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
  console.log("Current table:", table);

  // Shuffle and set deck
  const playingDeck = shuffle(deck);
  setDeck(playingDeck);
  console.log("Current deck:", playingDeck);

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
  const { player: updatedPlayer, shuffledDeck: deckAfterPlayerDeal } = deal(
    newActivePlayer,
    playingDeck
  );
  const { player: updatedOpponent, shuffledDeck: deckAfterOpponentDeal } = deal(
    newInactivePlayer,
    deckAfterPlayerDeal
  );

  setPlayer(updatedPlayer);
  setOpponent(updatedOpponent);

  // Update deck with remaining cards
  setDeck(deckAfterOpponentDeal);

  console.log("Updated player:", updatedPlayer);
  console.log("Updated opponent:", updatedOpponent);
  console.log(
    `Deck length after dealing to both players: ${deckAfterOpponentDeal.length} cards`
  );

  // Example of simple operations
  if (deckAfterOpponentDeal.length > 0) {
    console.log(`Deck has ${deckAfterOpponentDeal.length} cards`);
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
