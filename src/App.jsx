import "./App.scss";
import { initialShuffleDealFlip } from "./game/InitialShuffleDealFlip";
import { switchActivePlayer } from "./game/SwitchActivePlayer";
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
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MainMenu from "./pages/MainMenu/MainMenu";
import InstructionsBoard from "./components/InstructionsBoard/InstructionsBoard";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import ProfileCard from "./components/ProfileCard/ProfileCard";

// To-Dos:
// - keepping track of table updates is not working find a better aproach maybe with sum of players hands counter
// - fix turn switch logic to flip alternation of turns when deck is reshuffled
// - figure out where the first table update is comming from and if it is a problem
// - build fishBots with the strategies described at the end of the players object file

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
  const [playerHandCounter, setPlayerHandCounter] = useState(0);
  const [opponentHandCounter, setOpponentHandCounter] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // const navigate = useNavigate();

  // debbuger logs
  useEffect(() => {
    setPlayerHandCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      return newCounter;
    });
  }, [player.hand]);

  // debbuger logs
  useEffect(() => {
    setOpponentHandCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      return newCounter;
    });
  }, [opponent.hand]);

  // debbuger logs
  useEffect(() => {
    if (player.isActive) {
      console.log("Player's turn activated");
    }
    if (opponent.isActive) {
      console.log("Opponent's turn activated");
    }
  }, [player.isActive, opponent.isActive]);

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

  // keep track of table updates to trigger new deck shuffle, card counting and awards after 40 table updates
  // the counter for table updates is not reliable and it pushes the problem to the next reshuffle where it resets the table too early
  useEffect(() => {
    if (gameInitialized) {
      setTableCount((prevTableUpdateCount) => {
        const tableUpdateCount = prevTableUpdateCount + 1;
        if (tableUpdateCount % 40 === 0) {
          setIsDeckFinished(true);
        }
        return tableUpdateCount;
      });
    }
  }, [gameInitialized, table]);

  // check if it's the opponent's turn and handle auto-play with a timeout
  useEffect(() => {
    if (opponent.isActive /*&& opponent.hand.length > 0*/) {
      setTimeout(() => {
        opponent.fishBot(setOpponent, table, setTable, setLastPlacedCard);
        switchActivePlayer({ setPlayer, setOpponent, player, opponent });
      }, 500);
    }
  }, [opponent.isActive]);

  // check for winner and end the game
  useEffect(() => {
    if (gameInitialized) {
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
    }
  }, [gameInitialized, player.coins, opponent.coins]);

  useEffect(() => {
    if (gameInitialized) {
      // check if a hand is empty to deal new cards to and allow for continuous turn switching
      if (player.hand.length === 0 || opponent.hand.length === 0) {
        const { player: newPlayerHand, shuffledDeck: deckAfterPlayerDeal } =
          deal(player, deck);
        const { player: newOpponentHand, shuffledDeck: finalDeck } = deal(
          opponent,
          deckAfterPlayerDeal
        );

        setDeck(finalDeck);
        setPlayer(newPlayerHand);
        setOpponent(newOpponentHand);
        console.log("Cards dealt.");
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
        setTableCount(0);
        setTable([]);
        setIsDeckFinished(false);
        switchActivePlayer({ setPlayer, setOpponent, player, opponent });
        console.log("Shuffled deck ready. Table set.");
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

    switchActivePlayer({ setPlayer, setOpponent, player, opponent });
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainMenu />
              <Leaderboard />
            </>
          }
        />
        <Route
          path="/instructions"
          element={
            <>
              <MainMenu />
              <InstructionsBoard />
            </>
          }
        />
        <Route
          path="/scores"
          element={
            <>
              <MainMenu />
              <Leaderboard />
            </>
          }
        />
        <Route
          path="/user-profile"
          element={
            <>
              <MainMenu />
              <ProfileCard></ProfileCard>
            </>
          }
        />
        <Route
          path="/game"
          element={
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
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
