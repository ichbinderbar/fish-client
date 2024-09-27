import "./MultiplayerGamePage.scss";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { apiUrl } from "../../assets/data/Api";

export default function MultiplayerGamePage() {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState([]);
  const [playerId, setPlayerId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [hand, setHand] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    const newSocket = io(apiUrl);

    setSocket(newSocket);
    // used in conjuction with handleStartGame and handleJoinRandomRoom server controllers
    newSocket.emit("joinGame");
    console.log("joinGame event emitted");

    newSocket.on("connect", () => {
      console.log("Socket connected with ID:", newSocket.id);
    });

    newSocket.on("startGame", (data) => {
      console.log("startGame event received:", data);

      setPlayerId(newSocket.id);
      setRoomId(data.roomId);

      if (newSocket.id === data.player1.id) {
        setHand(Array.isArray(data.player1.hand) ? data.player1.hand : []);
      } else if (newSocket.id === data.player2.id) {
        setHand(Array.isArray(data.player2.hand) ? data.player2.hand : []);
      } else {
        console.warn("Player is not part of this game");
        setHand([]);
      }
    });

    newSocket.on("updateGameState", (newGameState) => {
      console.log("updateGameState event received:", newGameState);
      const { playerId: updatedPlayerId, hand, table } = newGameState;
      if (updatedPlayerId === playerId) {
        setHand(hand);
      }
      setTable(table);
      setGameState(newGameState);
    });

    return () => {
      console.log("Socket disconnecting:", newSocket.id);
      newSocket.disconnect();
    };
  }, []);

  const playCard = (card) => {
    if (socket && roomId) {
      if (hand.includes(card)) {
        console.log("Playing card and emitting playCard event:", card);

        socket.emit("playCard", { roomId, card });
      } else {
        console.log("Card not available in hand.");
      }
    } else {
      console.log("Socket not connected or roomId not available.");
    }
  };

  const handleRoomInput = (event) => {
    const roomIdFromInput = event.target.value;
    if (event.key === "Enter") {
      console.log(roomIdFromInput);
      socket.emit("joinRoom", { roomId: roomIdFromInput });
    }
  };

  return (
    <div className="game-page">
      <h1>Multiplayer Card Game</h1>
      <h2>Your Player ID: {playerId}</h2>
      <h2>Room ID: {roomId}</h2>
      <input placeholder="Enter room ID" onKeyDown={handleRoomInput} />
      <div>
        <h2>Your Hand</h2>
        {hand.length > 0 ? (
          <ul>
            {hand.map((card, index) => (
              <li key={index}>
                <button onClick={() => playCard(card)}>
                  Play {card.number || `Card ${index + 1}`}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No cards in hand yet.</p>
        )}
      </div>

      <div>
        <h2>Game State</h2>
        <pre>{JSON.stringify(table, null, 2)}</pre>
      </div>
    </div>
  );
}
