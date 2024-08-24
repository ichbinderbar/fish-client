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
}) => {
  console.log("initialShuffleFlipDeal called on mount");

  // Shuffle and set deck
  const playingDeck = shuffle(deck);
  setDeck(playingDeck);

  // Deal cards to both players first
  const { player: playerAfterDeal, shuffledDeck: deckAfterPlayerDeal } = deal(
    player,
    playingDeck
  );
  const { player: opponentAfterDeal, shuffledDeck: finalDeck } = deal(
    opponent,
    deckAfterPlayerDeal
  );

  // Update the deck and player states after dealing
  setDeck(finalDeck);
  setPlayer(playerAfterDeal);
  setOpponent(opponentAfterDeal);

  // Now determine who goes first by flipping a coin
  const isPlayerFirst = flipCoin() === "player";

  // Update players' active status based on the coin flip
  setPlayer((prevPlayer) => ({ ...prevPlayer, isActive: isPlayerFirst }));
  setOpponent((prevOpponent) => ({
    ...prevOpponent,
    isActive: !isPlayerFirst,
  }));

  console.log("Game setup completed. Player goes first:", isPlayerFirst);
};
