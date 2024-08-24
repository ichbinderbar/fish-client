import deal from "./Deal";
import flipCoin from "./FlipCoin";
import shuffle from "./Shuffle";
// import replenish from "./Replenish";
// import sell from "./Sell";
// import sold from "./Sold";
// import { Deck } from "../assets/data/Deck";

const initialShuffleFlipDeal = ({
  deck,
  setDeck,
  player,
  setPlayer,
  opponent,
  setOpponent,
  activePlayer,
  setActivePlayer,
  inactivePlayer,
  setInactivePlayer,
}) => {
  console.log("initialShuffleFlipDeal called on mount");

  // Shuffle and set deck
  const playingDeck = shuffle(deck);
  setDeck(playingDeck);
  // console.log("Current deck:", playingDeck);

  // Determine active and inactive players. Active player goes first.
  let currentActivePlayer = flipCoin() === "player" ? player : opponent;
  let currentInactivePlayer =
    currentActivePlayer === player ? opponent : player;
  setActivePlayer(currentActivePlayer);
  setInactivePlayer(currentInactivePlayer);
  // Guard clauses to handle null values
  if (!currentActivePlayer || !currentInactivePlayer) {
    console.error("Active or inactive player is not set.");
    return;
  }

  // Deal cards to players
  const { player: updatedActivePlayer, shuffledDeck: deckAfterOneDeal } = deal(
    currentActivePlayer,
    playingDeck
  );
  const { player: updatedInactivePlayer, shuffledDeck: deckAfterTwoDeals } =
    deal(currentInactivePlayer, deckAfterOneDeal);
  // Update deck with remaining cards
  setDeck(deckAfterTwoDeals);
  // console.log(
  //   "Updated active player's hand after dealing:",
  //   updatedActivePlayer.hand
  // );
  // console.log(
  //   "Updated inactive player's hand after dealig:",
  //   updatedInactivePlayer.hand
  // );
  // console.log(
  //   `Deck length after dealing to both players: ${deckAfterTwoDeals.length} cards`
  // );

  // Update the active and inactive players in the state
  if (updatedActivePlayer.id === player.id) {
    setPlayer(updatedActivePlayer);
  } else {
    setOpponent(updatedActivePlayer);
  }

  if (updatedInactivePlayer.id === opponent.id) {
    setOpponent(updatedInactivePlayer);
  } else {
    setPlayer(updatedInactivePlayer);
  }

  console.log("Game set up completed");
};

export default initialShuffleFlipDeal;
