export const getFishingCard = (currentHand, currentTable, hookValue) => {
  if (currentTable.length > 0 && hookValue) {
    return (
      currentHand.find((card) => card.number === hookValue) || currentHand.pop()
    );
  }
  console.log("Current table has no cards. Nothing to collect.");
  return currentHand[currentHand.length - 1];
};
