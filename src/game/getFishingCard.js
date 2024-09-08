export const getFishingCard = (currentHand, currentTable, hookValue) => {
  if (currentTable.length > 0 && hookValue) {
    return (
      currentHand.find((card) => card.number === hookValue) || currentHand.pop()
    );
  }
  console.log("Nothing to collect. Discarting random card.");
  return currentHand[Math.floor(Math.random() * currentHand.length)];
};
