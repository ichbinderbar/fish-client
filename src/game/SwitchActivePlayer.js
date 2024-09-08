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
  console.log(
    `${!player.isActive ? "Player is now active" : "Opponent is now active"}`
  );
};
