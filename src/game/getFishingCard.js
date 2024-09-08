export const getFishingCard = (currentHand, currentTable, hookValue) => {
  if (currentTable.length > 0 && hookValue) {
    return (
      currentHand.find((card) => card.number === hookValue) ||
      currentHand[Math.floor(Math.random() * currentHand.length)]
    );
  }
  return currentHand[Math.floor(Math.random() * currentHand.length)];
};
