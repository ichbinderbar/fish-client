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
        // console.log("Match with the last placed card! Awarded 1 coin.");
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
        // console.log("Emptied table! Awarded 1 coin.");
      }
    } else {
      //   console.log("Invalid combination selected:", selectedNumbers);
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
  console.log("--------------------Player played:", card.number);
  switchActivePlayer({ setPlayer, setOpponent, player, opponent });
};

export default handleHandCardSelection;
