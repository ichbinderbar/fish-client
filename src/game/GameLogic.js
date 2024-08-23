// import { useState, useEffect } from "react";
import deal from "./Deal";
import flipCoin from "./FlipCoin";
import shuffle from "./Shuffle";
// import {
//   player as playerInState,
//   opponent as opponentInState,
// } from "./PlayerObjects";
// import replenish from "./Replenish";
// import sell from "./Sell";
// import sold from "./Sold";
// import { Deck } from "../assets/data/Deck";

const runGame = ({
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
}) => {
  console.log("runGame function called");

  const playingDeck = shuffle(deck);
  setDeck(playingDeck);

  console.log("Current deck:", playingDeck);
  console.log("Current table:", table);

  setActivePlayer((activePlayer = flipCoin() === "player" ? player : opponent));
  setInactivePlayer(
    (inactivePlayer = activePlayer === player ? opponent : player)
  );

  console.log("Active player:", activePlayer);
  console.log("Inactive player:", inactivePlayer);

  // Guard clauses to handle null values
  if (!activePlayer || !inactivePlayer) {
    console.error("Active or inactive player is not set.");
    return;
  }

  // deal(activePlayer, playingDeck);
  // deal(inactivePlayer, playingDeck);
  setPlayer((prevPlayer) => deal(prevPlayer, playingDeck));
  setOpponent((prevOpponent) => deal(prevOpponent, playingDeck));
  console.log(player);
  console.log(opponent);

  // Example of simple operations
  if (deck.length > 0) {
    console.log(`Deck has ${deck.length} cards`);
  } else {
    console.log("Deck is empty");
  }

  console.log("Active player ID:", activePlayer.id);
  console.log("Inactive player ID:", inactivePlayer.id);

  // Example of how state might be updated
  const newDeck = [...deck];
  setDeck(newDeck); // Just demonstrating updating deck
  console.log("Updated deck (mock):", newDeck);

  // Log updated player and opponent (mock changes)
  const newPlayer = { ...player, hand: [...player.hand] };
  setPlayer(newPlayer);
  console.log("Updated player (mock):", newPlayer);

  const newOpponent = { ...opponent, hand: [...opponent.hand] };
  setOpponent(newOpponent);
  console.log("Updated opponent (mock):", newOpponent);

  // Log table update (mock)
  const newTable = [...table];
  setTable(newTable);
  console.log("Updated table (mock):", newTable);

  // Log active and inactive players after switch (mock)
  const newActivePlayer = activePlayer === player ? opponent : player;
  setActivePlayer(newActivePlayer);
  setInactivePlayer(activePlayer);
  console.log("Switched players. New active player ID:", newActivePlayer.id);
  console.log("New inactive player ID:", activePlayer.id);
};

export default runGame;
