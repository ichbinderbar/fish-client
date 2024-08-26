import "./App.scss";
import { initialShuffleDealFlip } from "./game/InitialShuffleDealFlip";
import { switchActivePlayer } from "./game/SwitchActivePlayer";
import opponentFishBot from "./game/OpponentFishBot";
import deal from "./game/Deal";
import PlayerArea from "./components/PlayerArea/PlayerArea";
import Table from "./components/Table/Table";
import { Schools } from "./assets/data/Schools";
import { Deck } from "./assets/data/Deck";
import {
  player as playerInState,
  opponent as opponentInState,
} from "./game/PlayerObjects";
import { useState, useEffect } from "react";
import checkMatch from "./game/CheckMatch";
import shuffle from "./game/Shuffle";
import sell from "./game/Sell";
import { checkGameOver } from "./game/CheckGameOver";

function App() {
  // initialize state variables to manage game logic
  const [deck, setDeck] = useState(Deck);
  const [table, setTable] = useState([]);
  const [player, setPlayer] = useState(playerInState);
  const [opponent, setOpponent] = useState(opponentInState);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [gameInitialized, setGameInitialized] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lastPlacedCard, setLastPlacedCard] = useState(null);
  const [isDeckFinished, setIsDeckFinished] = useState(false);
  const [tableCount, setTableCount] = useState(0);

  // set up game on mount
  useEffect(() => {
    initialShuffleDealFlip({
      deck,
      setDeck,
      player,
      setPlayer,
      opponent,
      setOpponent,
    });
    setGameInitialized(true);
  }, []);

  // keep track of table updates to trigger game over condition checks after every 40 table updates
  useEffect(() => {
    if (gameInitialized) {
      setTableCount((prevTableUpdateCount) => {
        const tableUpdateCount = prevTableUpdateCount + 1;
        console.log("Table update number:", tableUpdateCount);
        if (tableUpdateCount % 40 === 0) {
          console.log("Table has been updated 40 times.");
          setIsDeckFinished(true);
        }
        return tableUpdateCount;
      });
    }
  }, [gameInitialized, table]);

  // check if it's the opponent's turn and handle auto-play with a timeout
  useEffect(() => {
    if (opponent.isActive) {
      setTimeout(() => {
        opponentFishBot(
          opponent,
          setOpponent,
          table,
          setTable,
          setLastPlacedCard
        );
        switchActivePlayer({ setPlayer, setOpponent });
      }, 500);
    }
  }, [opponent.isActive]);

  // check for winner and end the game
  useEffect(() => {
    if (
      checkGameOver(
        player,
        setPlayer,
        opponent,
        setOpponent,
        setPaused,
        setTable
      )
    ) {
      return;
    }
  }, [player.coins, opponent.coins]);

  useEffect(() => {
    if (gameInitialized) {
      // check if both hands are empty and deal new cards
      if (player.hand.length === 0 && opponent.hand.length === 0) {
        const { player: newPlayerHand, shuffledDeck: deckAfterPlayerDeal } =
          deal(player, deck);
        const { player: newOpponentHand, shuffledDeck: finalDeck } = deal(
          opponent,
          deckAfterPlayerDeal
        );

        setDeck(finalDeck);
        setPlayer(newPlayerHand);
        setOpponent(newOpponentHand);
      }

      // check if the deck is empty and all cards from deck had been played
      if (deck.length === 0 && isDeckFinished === true) {
        console.log("Deck is empty and all cards have been played.");

        // calculate coins earned and update state
        const playerCoins = (player.coins += sell(player.fishedCards));
        const opponentCoins = (opponent.coins += sell(opponent.fishedCards));
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          coins: prevPlayer.coins + playerCoins,
          fishedCards: 0,
        }));
        setOpponent((prevOpponent) => ({
          ...prevOpponent,
          coins: prevOpponent.coins + opponentCoins,
          fishedCards: 0,
        }));

        // Shuffle a new deck and update state
        const newDeck = shuffle(Deck);
        setDeck(newDeck);
        console.log("No winner. The game goes on.");
      }
    }
  }, [gameInitialized, player.hand.length, opponent.hand.length, deck]);

  // handle player's card selection from hand
  const handleHandCardSelection = (card) => {
    if (paused) {
      console.log("Game is paused. No actions can be taken.");
      return;
    }

    // only allow selection if the player is active
    if (!player.isActive) {
      console.log("Cannot select a card. It is not your turn.");
      return;
    }

    // check if there are any selected table cards
    if (selectedTableCards.length > 0) {
      // move the selected card to the selectedTableCards array
      const updatedSelectedCards = [...selectedTableCards, card];

      // extract the number values from the selected cards and sort them
      const selectedNumbers = updatedSelectedCards
        .map((c) => c.number)
        .sort((a, b) => a - b);

      // check for a valid combination
      const match = checkMatch(Schools, selectedNumbers);

      if (match.match) {
        console.log("Valid combination selected:", selectedNumbers);

        const fishedCardsCount = updatedSelectedCards.length;

        // Remove the selected cards from the table
        const updatedTable = table.filter(
          (tableCard) => !updatedSelectedCards.includes(tableCard)
        );

        // Remove the selected card from the player's hand
        const updatedHand = player.hand.filter((c) => c !== card);

        // Award a coin if the selected card matches the last placed card
        if (lastPlacedCard && lastPlacedCard.number === card.number) {
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            coins: prevPlayer.coins + 1,
          }));
          console.log("Match with the last placed card! Awarded 1 coin.");
        }

        // Update the state
        setTable(updatedTable); // Update the table state to remove the selected cards
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          hand: updatedHand, // Update the hand state to remove the selected card
          fishedCards: prevPlayer.fishedCards + fishedCardsCount,
        }));
        setSelectedTableCards([]); // Clear the selectedTableCards array

        // Check if the table is now empty after a successful match
        if (updatedTable.length === 0) {
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            coins: prevPlayer.coins + 1,
          }));
          console.log("Emptied table! Awarded 1 coin.");
        }
      } else {
        console.log("Invalid combination selected:", selectedNumbers);

        // Move the last selected card (current `card`) to the table
        const updatedHand = player.hand.filter((c) => c !== card);
        // Update table with the new card and set selected property to false for all cards
        const updatedTable = [...table, card].map((tableCard) => ({
          ...tableCard,
          selected: false,
        }));

        // Update the state with the card moved to the table
        setTable(updatedTable);
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          hand: updatedHand,
        }));

        // update last card played
        setLastPlacedCard(card);

        // Clear selectedTableCards array
        setSelectedTableCards([]);
      }
    } else {
      // update player's hand
      const updatedHand = player.hand.filter((c) => c !== card);
      // Update table with the new card and set selected property to false for all cards
      const updatedTable = [...table, card].map((tableCard) => ({
        ...tableCard,
        selected: false,
      }));
      // update state
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        hand: updatedHand,
      }));

      // update last card played
      setLastPlacedCard(card);

      setTable(updatedTable);
    }

    switchActivePlayer({ setPlayer, setOpponent });
  };

  const handleTableCardSelection = (card) => {
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

  return (
    <>
      <Table
        cards={table}
        handleTableCardSelection={handleTableCardSelection}
      />
      <PlayerArea
        coins={player.coins}
        fishedCards={player.fishedCards}
        player={player}
        handleHandCardSelection={handleHandCardSelection}
      />
    </>
  );
}

export default App;
