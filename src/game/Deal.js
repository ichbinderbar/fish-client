// export default function dealToPlayers({
//   player,
//   setPlayer,
//   opponent,
//   setOpponent,
//   deck,
// }) {
//   if (player.hand.length === 0 || opponent.hand.length === 0) {
//     const { player: newPlayerHand, shuffledDeck: deckAfterPlayerDeal } = deal(
//       player,
//       deck
//     );
//     const { player: newOpponentHand, shuffledDeck: finalDeck } = deal(
//       opponent,
//       deckAfterPlayerDeal
//     );
//     setDeck(finalDeck);
//     setPlayer(newPlayerHand);
//     setOpponent(newOpponentHand);
//     console.log("Cards dealt.");
//   }
// }

export default function deal(player, shuffledDeck) {
  if (player.hand.length > 0) {
    console.log(
      `Cannot deal to ${player.id}. ${player.id} already has cards in hand.`
    );
    return { player, shuffledDeck }; // Return both player and deck unchanged
  }

  let newHand;

  if (shuffledDeck.length > 5) {
    newHand = shuffledDeck.splice(0, 5);
  } else {
    // console.log(`Not enough cards to deal to ${player.id}.`);
    newHand = shuffledDeck.splice(0);
  }

  return {
    player: { ...player, hand: newHand },
    shuffledDeck,
  };
}
