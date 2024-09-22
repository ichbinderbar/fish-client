// export const getFishingCard = (
//   currentOpponentHand,
//   currentTable,
//   hookValue
// ) => {
//   if (currentTable.length > 0 && hookValue) {
//     return (
//       currentOpponentHand.find((card) => card.number === hookValue) ||
//       currentOpponentHand[
//         Math.floor(Math.random() * currentOpponentHand.length)
//       ]
//     );
//   }
//   return currentOpponentHand[
//     Math.floor(Math.random() * currentOpponentHand.length)
//   ];
// };

export const getFishingCard = (
  currentOpponentHand,
  currentTable,
  hookValue,
  otherPlayerHand
) => {
  if (currentTable.length > 0 && hookValue) {
    const matchingCard = currentOpponentHand.find(
      (card) => card.number === hookValue
    );

    if (matchingCard) {
      return matchingCard;
    }

    const filteredHand = currentOpponentHand.filter(
      (card) =>
        !otherPlayerHand.some((otherCard) => otherCard.number === card.number)
    );

    return filteredHand.length > 0
      ? filteredHand[Math.floor(Math.random() * filteredHand.length)]
      : currentOpponentHand[
          Math.floor(Math.random() * currentOpponentHand.length)
        ];
  }

  const filteredHand = currentOpponentHand.filter(
    (card) =>
      !otherPlayerHand.some((otherCard) => otherCard.number === card.number)
  );

  return filteredHand.length > 0
    ? filteredHand[Math.floor(Math.random() * filteredHand.length)]
    : currentOpponentHand[
        Math.floor(Math.random() * currentOpponentHand.length)
      ];
};
