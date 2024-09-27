import "./MultiplayerGamePage.scss";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { apiUrl } from "../../assets/data/Api";

export default function MultiplayerGamePage() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [hand, setHand] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    const newSocket = io(apiUrl);
    setSocket(newSocket);

    console.log("joinGame event emitted");
    newSocket.emit("joinGame");

    newSocket.on("connect", () => {
      console.log("Socket connected with ID:", newSocket.id);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("startGame", (data) => {
      console.log("startGame event received:", data);
      setRoomId(data.roomId);

      if (socket.id === data.player1.id) {
        setHand(Array.isArray(data.player1.hand) ? data.player1.hand : []);
      } else if (socket.id === data.player2.id) {
        setHand(Array.isArray(data.player2.hand) ? data.player2.hand : []);
      } else {
        console.warn("Player is not part of this game");
        setHand([]);
      }
    });

    socket.on("updateGameState", (newGameState) => {
      console.log("updateGameState event received:", newGameState);
      const { playerId, hand, table } = newGameState;

      if (socket.id === playerId) {
        console.log("Updating hand for current player");
        setHand(hand);
      } else {
        console.log("PlayerId mismatch: hand not updated");
      }

      setTable(table);
    });

    return () => {
      socket.off("startGame");
      socket.off("updateGameState");
    };
  }, [socket]);

  const playCard = (card) => {
    socket.emit("playCard", { roomId, card });
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
      <h2>Your Player ID: {socket?.id}</h2>
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
        <h2>Table</h2>
        {table.length > 0 ? (
          <ul>
            {table.map((card) => (
              <p key={card.id}>{`${card.number} ${card.color}`}</p>
            ))}
          </ul>
        ) : (
          <p>No cards on the table yet.</p>
        )}
      </div>
    </div>
  );
}
