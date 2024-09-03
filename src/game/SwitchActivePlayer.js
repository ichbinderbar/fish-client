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
};
