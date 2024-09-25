export const getFishingCardBasic = (
  currentOpponentHand,
  currentTable,
  hookValue
) => {
  const getRandomCard = (hand) => hand[Math.floor(Math.random() * hand.length)];

  if (currentTable.length > 0 && hookValue) {
    return (
      currentOpponentHand.find((card) => card.number === hookValue) ||
      getRandomCard(currentOpponentHand)
    );
  }

  return getRandomCard(currentOpponentHand);
};

export const getFishingCard = (
  currentOpponentHand,
  currentTable,
  hookValue,
  currentPlayerHand
) => {
  const getRandomCard = (hand) => hand[Math.floor(Math.random() * hand.length)];

  const getFilteredHand = () =>
    currentOpponentHand.filter(
      (card) =>
        !currentPlayerHand.some((otherCard) => otherCard.number === card.number)
    );

  if (currentTable.length > 0 && hookValue) {
    const matchingCard = currentOpponentHand.find(
      (card) => card.number === hookValue
    );
    if (matchingCard) return matchingCard;
  }

  const filteredHand = getFilteredHand();

  return filteredHand.length > 0
    ? getRandomCard(filteredHand)
    : getRandomCard(currentOpponentHand);
};
