export const checkGameOver = (
  player,
  setPlayer,
  opponent,
  setOpponent,
  setPaused,
  setTable
) => {
  if (player.coins >= 20 || opponent.coins >= 20) {
    const winner = player.coins >= 20 ? "Player" : "Opponent";
    const winnerCoins = player.coins >= 20 ? player.coins : opponent.coins;

    console.log(`Game Over: ${winner} wins with ${winnerCoins} coins!`);

    setPaused(true);
    setPlayer((prevPlayer) => ({ ...prevPlayer, hand: [] }));
    setOpponent((prevOpponent) => ({ ...prevOpponent, hand: [] }));
    setTable([]);

    return true;
  }
  console.log("No winner yet.");
  return false;
};
