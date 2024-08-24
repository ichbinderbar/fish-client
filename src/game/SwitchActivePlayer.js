export const switchActivePlayer = ({ setPlayer, setOpponent }) => {
  setPlayer((prevPlayer) => ({
    ...prevPlayer,
    isActive: !prevPlayer.isActive,
  }));
  setOpponent((prevOpponent) => ({
    ...prevOpponent,
    isActive: !prevOpponent.isActive,
  }));
};
