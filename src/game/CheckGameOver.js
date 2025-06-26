const WINNING_SCORE = 40;

export const checkGameOver = (
  player,
  setPlayer,
  opponent,
  setOpponent,
  setTable,
  setGameOver,
  setWinner
) => {
  // Check if either player has met the winning condition
  const playerWins = player.coins >= WINNING_SCORE;
  const opponentWins = opponent.coins >= WINNING_SCORE;

  if (playerWins || opponentWins) {
    // Determine the winner based on our check above
    const winner = playerWins ? player : opponent;

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
