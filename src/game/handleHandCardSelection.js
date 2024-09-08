import checkMatch from "./CheckMatch";
import { Schools } from "../assets/data/Schools";
import { switchActivePlayer } from "./SwitchActivePlayer";

// Function to handle player's card selection from hand
const handleHandCardSelection = ({
  card,
  player,
  setPlayer,
  table,
  setTable,
  setLastPlacedCard,
  selectedTableCards,
  setSelectedTableCards,
  lastPlacedCard,
  gameOver,
  setOpponent,
  opponent,
}) => {
  if (gameOver) {
    console.log("Game is over. No actions can be taken.");
    return;
  }

  if (!player.isActive) {
    console.log("You cannot select a card. Wait for your turn.");
    return;
  }

  if (selectedTableCards.length > 0) {
    const updatedSelectedCards = [...selectedTableCards, card];
    const selectedNumbers = updatedSelectedCards
      .map((c) => c.number)
      .sort((a, b) => a - b);

    const match = checkMatch(Schools, selectedNumbers);

    if (match.match) {
      const fishedCardsCount = updatedSelectedCards.length;
      const updatedTable = table.filter(
        (tableCard) => !updatedSelectedCards.includes(tableCard)
      );
      const updatedHand = player.hand.filter((c) => c !== card);

      if (lastPlacedCard && lastPlacedCard.number === card.number) {
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          coins: prevPlayer.coins + 1,
        }));
        console.log("Match with the last placed card! Awarded 1 coin.");
      }

      setTable(updatedTable);
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        hand: updatedHand,
        fishedCards: prevPlayer.fishedCards + fishedCardsCount,
      }));
      setLastPlacedCard(card);
      setSelectedTableCards([]);

      if (updatedTable.length === 0) {
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          coins: prevPlayer.coins + 1,
        }));
        console.log("Emptied table! Awarded 1 coin.");
      }
    } else {
      console.log("Invalid combination selected:", selectedNumbers);

      const updatedHand = player.hand.filter((c) => c !== card);
      const updatedTable = [...table, card].map((tableCard) => ({
        ...tableCard,
        selected: false,
      }));

      setTable(updatedTable);
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        hand: updatedHand,
      }));
      setLastPlacedCard(card);
      setSelectedTableCards([]);
    }
  } else {
    const updatedHand = player.hand.filter((c) => c !== card);
    const updatedTable = [...table, card].map((tableCard) => ({
      ...tableCard,
      selected: false,
    }));

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      hand: updatedHand,
    }));
    setLastPlacedCard(card);
    setTable(updatedTable);
  }

  switchActivePlayer({ setPlayer, setOpponent, player, opponent });
};

export default handleHandCardSelection;

//   // handle player's card selection from hand
//   const handleHandCardSelection = (card) => {
//     if (gameOver) {
//       console.log("Game is over. No actions can be taken.");
//       return;
//     }

//     // only allow selection if the player is active
//     if (!player.isActive) {
//       console.log("You cannot select a card. Wait for your turn.");
//       return;
//     }

//     // check if there are any selected table cards
//     if (selectedTableCards.length > 0) {
//       // move the selected card to the selectedTableCards array
//       const updatedSelectedCards = [...selectedTableCards, card];

//       // extract the number values from the selected cards and sort them
//       const selectedNumbers = updatedSelectedCards
//         .map((c) => c.number)
//         .sort((a, b) => a - b);

//       // check for a valid combination
//       const match = checkMatch(Schools, selectedNumbers);

//       if (match.match) {
//         const fishedCardsCount = updatedSelectedCards.length;

//         // Remove the selected cards from the table
//         const updatedTable = table.filter(
//           (tableCard) => !updatedSelectedCards.includes(tableCard)
//         );

//         // Remove the selected card from the player's hand
//         const updatedHand = player.hand.filter((c) => c !== card);

//         // Award a coin if the selected card matches the last placed card
//         if (lastPlacedCard && lastPlacedCard.number === card.number) {
//           setPlayer((prevPlayer) => ({
//             ...prevPlayer,
//             coins: prevPlayer.coins + 1,
//           }));
//           console.log("Match with the last placed card! Awarded 1 coin.");
//         }

//         // Update the state
//         setTable(updatedTable); // Update the table state to remove the selected cards
//         setPlayer((prevPlayer) => ({
//           ...prevPlayer,
//           hand: updatedHand, // Update the hand state to remove the selected card
//           fishedCards: prevPlayer.fishedCards + fishedCardsCount,
//         }));
//         setLastPlacedCard(card);
//         setSelectedTableCards([]); // Clear the selectedTableCards array

//         // Check if the table is now empty after a successful match
//         if (updatedTable.length === 0) {
//           setPlayer((prevPlayer) => ({
//             ...prevPlayer,
//             coins: prevPlayer.coins + 1,
//           }));
//           console.log("Emptied table! Awarded 1 coin.");
//         }
//       } else {
//         console.log("Invalid combination selected:", selectedNumbers);

//         // Move the last selected card (current `card`) to the table
//         const updatedHand = player.hand.filter((c) => c !== card);
//         // Update table with the new card and set selected property to false for all cards
//         const updatedTable = [...table, card].map((tableCard) => ({
//           ...tableCard,
//           selected: false,
//         }));

//         // Update the state with the card moved to the table
//         setTable(updatedTable);
//         setPlayer((prevPlayer) => ({
//           ...prevPlayer,
//           hand: updatedHand,
//         }));

//         // update last card played
//         setLastPlacedCard(card);
//         setSelectedTableCards([]);
//       }
//     } else {
//       // update player's hand
//       const updatedHand = player.hand.filter((c) => c !== card);
//       // Update table with the new card and set selected property to false for all cards
//       const updatedTable = [...table, card].map((tableCard) => ({
//         ...tableCard,
//         selected: false,
//       }));
//       // update state
//       setPlayer((prevPlayer) => ({
//         ...prevPlayer,
//         hand: updatedHand,
//       }));
//       setLastPlacedCard(card);
//       setTable(updatedTable);
//     }

//     setIsTurnOver(true);
//     switchActivePlayer({ setPlayer, setOpponent, player, opponent });
//   };
