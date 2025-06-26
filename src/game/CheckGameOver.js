export const checkGameOver = (
  player,
  setPlayer,
  opponent,
  setOpponent,
  setTable,
  setGameOver,
  setWinner
) => {
  if (player.coins >= 40 || opponent.coins >= 40) {
    const winner = player.coins >= 40 ? player : opponent;
    setWinner(winner);
    console.log(`Game Over: ${winner.id} wins with ${winner.coins} coins!`);

    setPlayer((prevPlayer) => ({ ...prevPlayer, hand: [] }));
    setOpponent((prevOpponent) => ({ ...prevOpponent, hand: [] }));
    setTable([]);
    setGameOver(true);
    return true;
  }
  return false;
};
