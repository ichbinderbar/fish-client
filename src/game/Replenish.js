// replenish means taking the unsold cards from player's fished cards
// and the cards left on the table back to the deck to be reshuffled
// and dealt back to the players for the continuation of the game
// after a replenish the first player to move must be the last that moved
// so switchActivePlayer needs to be called again to reactivate this player
// before next move
export default function replenish() {
  table.length = 0;
  player.fishedCards = 0;
  opponent.fishedCards = 0;
  if (reshuffleCount < 10) {
    console.log(`Deck length before reshuffle: ${OGdeck.length}`);
    shuffledDeck = shuffle(OGdeck);
    console.log("Deck has been reshuffled");

    reshuffleCount++;
    deal(shuffledDeck); // deal the new shuffled deck
    console.log("The new shuffled deck has been dealt");

    switchActivePlayer(); // causes the other player to start each round
  } else {
    console.log("Maximum reshuffle limit reached.");
    return true; // indicate that the game should end
  }

  return false; // indicate that the game should continue
}
