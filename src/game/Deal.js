export default function deal(player, shuffledDeck) {
  if (player.hand.length > 0) {
    return { player, shuffledDeck };
  }

  let newHand;

  if (shuffledDeck.length > 5) {
    newHand = shuffledDeck.splice(0, 5);
    // console.log(`Cards dealt to ${player.id}`);
  } else {
    // console.log(`Not enough cards to deal to ${player.id}.`);
    newHand = shuffledDeck.splice(0);
  }

  return {
    player: { ...player, hand: newHand },
    shuffledDeck,
  };
}
