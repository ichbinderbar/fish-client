import PlayerArea from "../../components/PlayerArea/PlayerArea";
import Table from "../../components/Table/Table";
import "./GamePage.scss";
import { useState, useEffect } from "react";
import checkMatch from "../../game/CheckMatch";
import shuffle from "../../game/Shuffle";
import sell from "../../game/Sell";
import { checkGameOver } from "../../game/CheckGameOver";
import { initialShuffleDealFlip } from "../../game/InitialShuffleDealFlip";
import { switchActivePlayer } from "../../game/SwitchActivePlayer";
import deal from "../../game/Deal";
import { Schools } from "../../assets/data/Schools";
import { Deck } from "../../assets/data/Deck";
import {
  player as playerInState,
  opponent as opponentInState,
} from "../../game/PlayerObjects";
import { useNavigate } from "react-router-dom";
import dealToPlayers from "../../game/Deal";
import { saveResults } from "../../utils/SaveResults";
import OpponentArea from "../../components/OpponentArea/OpponentArea";

// TODO: fix turn switch logic to flip alternation of turns when deck is reshuffled

export default function GamePage({ theme, handleThemeChange }) {
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
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  const [gameResults, setGameResults] = useState({});
  const [winner, setWinner] = useState(null);

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

  // this counter tracks table updates because its the best way to check if the cards on each round, including those in the players hands, have actually been played
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

  // debuger logs

  useEffect(() => {
    console.log("Table:", table);
  }, [table]);

  useEffect(() => {
    console.log("Opponent coins:", opponent.coins);
  }, [opponent.coins]);

  useEffect(() => {
    console.log("Opponent fishedCards:", opponent.fishedCards);
  }, [opponent.fishedCards]);

  // useEffect(() => {
  //   if (player.isActive) {
  //     console.log("Player's turn activated");
  //   }
  //   if (opponent.isActive) {
  //     console.log("Opponent's turn activated");
  //   }
  // }, [player.isActive, opponent.isActive]);

  // check if it's the opponent's turn and handle auto-play with a timeout
  useEffect(() => {
    if (gameInitialized && opponent.isActive && gameOver === false) {
      setTimeout(() => {
        opponent.fishBot(
          gameOver,
          opponent,
          setOpponent,
          table,
          setTable,
          setLastPlacedCard,
          lastPlacedCard
        );
        switchActivePlayer({ setPlayer, setOpponent, player, opponent });
      }, 300);
    }
  }, [opponent.isActive]);

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
      }

      // check if the deck is empty and all cards from deck had been played
      if (deck.length === 0 && isDeckFinished === true) {
        console.log("Deck is empty and all cards have been played.");

        // calculate coins earned and update state
        const earnedPlayerCoins = sell(player.fishedCards);
        const earnedOpponentCoins = sell(opponent.fishedCards);
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          coins: prevPlayer.coins + earnedPlayerCoins,
          fishedCards: 0,
        }));
        setOpponent((prevOpponent) => ({
          ...prevOpponent,
          coins: prevOpponent.coins + earnedOpponentCoins,
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
    if (gameOver) {
      console.log("Game is over. No actions can be taken.");
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

  // check for winner and end the game
  useEffect(() => {
    if (gameInitialized) {
      if (
        checkGameOver(
          player,
          setPlayer,
          opponent,
          setOpponent,
          setTable,
          setGameOver,
          setWinner
        )
      ) {
        return;
      }
    }
  }, [gameInitialized, player.coins, opponent.coins]);

  useEffect(() => {
    if (gameOver) {
      const gameResults = {
        winner: winner.id,
        coins: winner.coins,
        date: new Date().toISOString(),
      };
      saveResults(gameResults);
      setTimeout(() => {
        navigate("/scores");
      }, 10000);
    }
  }, [gameOver]);

  return (
    <>
      <OpponentArea
        coins={opponent.coins}
        fishedCards={opponent.fishedCards}
        player={opponent}
        handleHandCardSelection={handleHandCardSelection}
        theme={theme}
      />
      <Table
        cards={table}
        handleTableCardSelection={handleTableCardSelection}
        handleThemeChange={handleThemeChange}
        gameOver={gameOver}
        player={player}
        theme={theme}
      />
      <PlayerArea
        coins={player.coins}
        fishedCards={player.fishedCards}
        player={player}
        handleHandCardSelection={handleHandCardSelection}
        theme={theme}
      />
    </>
  );
}
