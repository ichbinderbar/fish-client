const handleTableCardSelection = ({
  card,
  gameOver,
  selectedTableCards,
  setSelectedTableCards,
}) => {
  if (gameOver) {
    console.log("Game is over. No actions can be taken.");
    return;
  }

  if (card.selected) {
    card.selected = false;
    setSelectedTableCards((prevSelected) =>
      prevSelected.filter((c) => c.id !== card.id)
    );
  } else {
    card.selected = true;
    setSelectedTableCards((prevSelected) => [...prevSelected, card]);
  }
};

export default handleTableCardSelection;

// const handleTableCardSelection = (card) => {
//   if (gameOver) {
//     console.log("Game is over. No actions can be taken.");
//     return;
//   }
//   if (card.selected) {
//     card.selected = false;
//     setSelectedTableCards((prevSelected) =>
//       prevSelected.filter((c) => c.id !== card.id)
//     );
//   } else {
//     card.selected = true;
//     setSelectedTableCards((prevSelected) => [...prevSelected, card]);
//   }
// };
