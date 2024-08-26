export default function deal(player, shuffledDeck) {
  if (player.hand.length > 0) {
    console.log(`Cannot deal. ${player.id} already has cards in hand.`);
    return { player, shuffledDeck }; // Return both player and deck unchanged
  }

  // console.log(
  //   `Dealing cards. Deck length before dealing: ${shuffledDeck.length}`
  // );

  let newHand;

  if (shuffledDeck.length > 5) {
    newHand = shuffledDeck.splice(0, 5);
  } else {
    // console.log(`Not enough cards to deal to ${player.id}.`);
    newHand = shuffledDeck.splice(0);
  }

  // console.log(`${player.id} has been dealt ${newHand.length} cards.`);
  // console.log(`Deck length after dealing: ${shuffledDeck.length} cards`);

  return {
    player: { ...player, hand: newHand },
    shuffledDeck,
  };
}
