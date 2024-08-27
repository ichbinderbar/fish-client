export const switchActivePlayer = ({
  setPlayer,
  setOpponent,
  player,
  opponent,
}) => {
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    isActive: !prevPlayer.isActive,
  }));
  setOpponent((prevOpponent) => ({
    ...prevOpponent,
    isActive: !prevOpponent.isActive,
  }));
  if (player.hand.length === 0 || opponent.hand.length === 0) {
    console.log(
      `Player hand: ${JSON.stringify(player.hand)}
Opponent hand: ${JSON.stringify(opponent.hand)}`
    );
  }
};
