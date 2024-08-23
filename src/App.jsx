// What to include in this file:
// - Import statements related to components and assets used in the App component.
// - State definitions and related logic.
// - useEffect hooks related to component lifecycle and initial data setup.
// - Event handler functions for interacting with the game state.
// - The return statement with JSX rendering the components.

import "./App.scss";
import runGame from "./game/GameLogic";
import deal from "./game/Deal";
import PlayerArea from "./components/PlayerArea/PlayerArea";
import Table from "./components/Table/Table";
import { Deck } from "./assets/data/Deck";
import {
  player as playerInState,
  opponent as opponentInState,
} from "./game/PlayerObjects";
import { useState, useEffect } from "react";

function App() {
  const [deck, setDeck] = useState(Deck);
  const [table, setTable] = useState([]);
  const [player, setPlayer] = useState(playerInState);
  const [opponent, setOpponent] = useState(opponentInState);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [activePlayer, setActivePlayer] = useState(null);
  const [inactivePlayer, setInactivePlayer] = useState(null);

  useEffect(() => {
    runGame({
      deck,
      setDeck,
      player,
      setPlayer,
      opponent,
      setOpponent,
      table,
      setTable,
      activePlayer,
      setActivePlayer,
      inactivePlayer,
      setInactivePlayer,
    });
  }, []);

  const handleHandCardSelection = (card) => {
    const updatedHand = player.hand.filter((c) => c !== card);
    const updatedTable = [...table, { ...card, hook: true }];
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      hand: updatedHand,
    }));
    setTable(updatedTable);
  };

  useEffect(() => {
    console.log("Cards in selection:", selectedTableCards);
  }, [selectedTableCards]);

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
    console.log("Last clicked:", card);
    console.log("Table:", table);
  };

  return (
    <>
      <Table
        cards={table}
        handleTableCardSelection={handleTableCardSelection}
      />
      <PlayerArea
        player={player}
        handleHandCardSelection={handleHandCardSelection}
      />
    </>
  );
}

export default App;
