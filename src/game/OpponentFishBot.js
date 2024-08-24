const opponentFishBot = (opponent, setOpponent, table, setTable) => {
  if (opponent.hand.length === 0) {
    console.log("Opponent has no cards to play.");
    return;
  }

  const fishedCard = opponent.fish();

  if (fishedCard) {
    // Move the fished card to the table
    const updatedTable = [...table, fishedCard];
    setTable(updatedTable);

    // Update opponent's hand in the state
    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      hand: [...prevOpponent.hand],
    }));
  }
};

export default opponentFishBot;
