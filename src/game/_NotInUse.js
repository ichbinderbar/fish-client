// TODO: rewrite deal as one function to deal for all players

export default function dealToPlayers({
  deck,
  setDeck,
  setTable,
  player,
  opponent,
}) {
  if (player.hand.length === 0 || opponent.hand.length === 0) return true;
}
