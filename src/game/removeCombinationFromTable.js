export const removeCardsFromTable = (table, combination, fishingCard) => {
  const updatedTable = [...table];
  const cardsToRemove = [...combination];
  let combinationRemoved = false;

  cardsToRemove.forEach((cardToRemove) => {
    const index = updatedTable.findIndex(
      (card) => card.number === cardToRemove
    );
    if (index !== -1) {
      updatedTable.splice(index, 1);
      combinationRemoved = true;
    }
  });

  if (combinationRemoved) {
    const fishingCardIndex = updatedTable.findIndex(
      (card) => card.number === fishingCard.number
    );
    if (fishingCardIndex !== -1) {
      updatedTable.splice(fishingCardIndex, 1);
    }
  }

  return updatedTable;
};
