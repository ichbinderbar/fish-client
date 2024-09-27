import "./MultiplayerGamePage.scss";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { apiUrl } from "../../assets/data/Api";
import TableMultiplayer from "../../components/TableMultiplayer/TableMultiplayer";
import PlayerAreaMultiplayer from "../../components/PlayerAreaMultiplayer/PlayerAreaMultiplayer";
import handleTableCardSelection from "../../game/handleTableCardSelection";
import OpponentAreaMultiplayer from "../../components/OpponentAreaMultiplayer/OpponentAreaMultiplayer";
// import { opponent } from "../../game/PlayerObjects";

export default function MultiplayerGamePage({ handleThemeChange, theme }) {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [player, setPlayer] = useState({ id: null, hand: [] });
  const [opponent, setOpponent] = useState({ id: null, hand: [] });
  const [table, setTable] = useState([]);
  const [selectedTableCards, setSelectedTableCards] = useState([]);

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
        setPlayer({
          id: data.player1.id,
          hand: Array.isArray(data.player1.hand) ? data.player1.hand : [],
          fishedCards: data.player1.fishedCards,
          coins: data.player1.coins,
        });
        setOpponent({
          id: data.player2.id,
          hand: Array.isArray(data.player2.hand) ? data.player2.hand : [],
          fishedCards: data.player2.fishedCards,
          coins: data.player2.coins,
        });
      } else if (socket.id === data.player2.id) {
        setPlayer({
          id: data.player2.id,
          hand: Array.isArray(data.player2.hand) ? data.player2.hand : [],
          fishedCards: data.player2.fishedCards,
          coins: data.player2.coins,
        });
        setOpponent({
          id: data.player1.id,
          hand: Array.isArray(data.player1.hand) ? data.player1.hand : [],
          fishedCards: data.player1.fishedCards,
          coins: data.player1.coins,
        });
      } else {
        console.warn("Player is not part of this game");
        setPlayer({ id: null, hand: [] });
        setOpponent({ id: null, hand: [] });
      }
    });

    socket.on("updateGameState", (newGameState) => {
      console.log("updateGameState event received:", newGameState);
      const { playerId, hand, table } = newGameState;
      if (socket.id === playerId) {
        // Update hand for the current player
        console.log("Updating hand for current player");
        setPlayer((prevPlayer) => ({ ...prevPlayer, hand }));
      } else {
        // Update hand for the opponent
        console.log("Updating hand for opponent");
        setOpponent((prevOpponent) => ({ ...prevOpponent, hand }));
      }

      setTable(table);
    });

    return () => {
      socket.off("startGame");
      socket.off("updateGameState");
    };
  }, [socket]);

  const handleHandCardSelection = (card) => {
    socket.emit("playCard", { roomId, card });
  };

  const handleRoomInput = (event) => {
    if (event.key === "Enter") {
      socket.emit("joinRoom", { roomId: event.target.value });
    }
  };

  return (
    <>
      <div className="multiplayer-game-page__finder">
        <h2>Find table to play online</h2>
        <input
          className="multiplayer-game-page__input"
          placeholder="Enter table ID"
          onKeyDown={handleRoomInput}
        />
      </div>
      <OpponentAreaMultiplayer
        opponent={opponent}
        handleThemeChange={handleThemeChange}
        theme={theme}
      />
      <TableMultiplayer
        cards={table}
        handleThemeChange={handleThemeChange}
        theme={theme}
        handleTableCardSelection={(card) =>
          handleTableCardSelection({
            card,
            selectedTableCards,
            setSelectedTableCards,
          })
        }
      />
      <PlayerAreaMultiplayer
        player={player}
        handleHandCardSelection={handleHandCardSelection}
        handleThemeChange={handleThemeChange}
        theme={theme}
      />
    </>
  );
}
