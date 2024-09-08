import deal from "./Deal";
import flipCoin from "./FlipCoin";
import shuffle from "./Shuffle";

export const initialShuffleDealFlip = ({
  deck,
  setDeck,
  player,
  setPlayer,
  opponent,
  setOpponent,
  setFirstToMove,
}) => {
  // shuffle and set deck
  const playingDeck = shuffle(deck);
  setDeck(playingDeck);

  // deal cards to both players first
  const { player: playerAfterDeal, shuffledDeck: deckAfterPlayerDeal } = deal(
    player,
    playingDeck
  );
  const { player: opponentAfterDeal, shuffledDeck: finalDeck } = deal(
    opponent,
    deckAfterPlayerDeal
  );

  // update the deck and player states after dealing
  setDeck(finalDeck);
  setPlayer(playerAfterDeal);
  setOpponent(opponentAfterDeal);

  // Randomly determine who goes first
  const firstToMove = Math.random() > 0.5 ? "Player" : "Opponent";
  setFirstToMove(firstToMove);
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    isActive: firstToMove === "Player",
  }));
  setOpponent((prevOpponent) => ({
    ...prevOpponent,
    isActive: firstToMove === "Opponent",
  }));

  console.log(
    `--------------------${firstToMove} starts the game.--------------------`
  );
};
