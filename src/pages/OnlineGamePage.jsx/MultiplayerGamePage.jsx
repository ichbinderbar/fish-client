import "./MultiplayerGamePage.scss";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { apiUrl } from "../../assets/data/Api";
import TableMultiplayer from "../../components/TableMultiplayer/TableMultiplayer";
import PlayerAreaMultiplayer from "../../components/PlayerAreaMultiplayer/PlayerAreaMultiplayer";
import handleTableCardSelection from "../../game/handleTableCardSelection";
import OpponentAreaMultiplayer from "../../components/OpponentAreaMultiplayer/OpponentAreaMultiplayer";
import handleHandCardSelectionMultiplayer from "../../game/handleHandCardSelectionMultiplayer";

export default function MultiplayerGamePage({ handleThemeChange, theme }) {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [player, setPlayer] = useState({
    id: null,
    hand: [],
    fishedCards: 0,
    coins: 0,
    isActive: false,
  });
  const [opponent, setOpponent] = useState({
    id: null,
    hand: [],
    fishedCards: 0,
    coins: 0,
    isActive: false,
  });
  const [table, setTable] = useState([]);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [lastPlacedCard, setLastPlacedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [emit, setEmit] = useState(false);

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
          id: data.player1?.id,
          hand: Array.isArray(data.player1.hand) ? data.player1.hand : [],
          fishedCards: data.player1?.fishedCards,
          coins: data.player1?.coins,
          isActive: data.player1?.isActive,
        });
        setOpponent({
          id: data.player2?.id,
          hand: Array.isArray(data.player2?.hand) ? data.player2?.hand : [],
          fishedCards: data.player2?.fishedCards,
          coins: data.player2?.coins,
          isActive: data.player2?.isActive,
        });
      } else if (socket.id === data.player2.id) {
        setPlayer({
          id: data.player2?.id,
          hand: Array.isArray(data.player2.hand) ? data.player2.hand : [],
          fishedCards: data.player2?.fishedCards,
          coins: data.player2?.coins,
          isActive: data.player2?.isActive,
        });
        setOpponent({
          id: data.player1?.id,
          hand: Array.isArray(data.player1.hand) ? data.player1.hand : [],
          fishedCards: data.player1?.fishedCards,
          coins: data.player1?.coins,
          isActive: data.player1?.isActive,
        });
      } else {
        console.warn("Player is not part of this game");
      }
    });

    socket.on("gameStateUpdate", (newGameState) => {
      console.log("gameStateUpdate event received:", newGameState);

      const { player1, player2, table, selectedTableCards, lastPlacedCard } =
        newGameState;

      if (socket.id === player1.id) {
        setPlayer({ ...player1 });
        setOpponent({ ...player2 });
      } else {
        setPlayer({ ...player2 });
        setOpponent({ ...player1 });
      }

      setTable(table);
      setSelectedTableCards(selectedTableCards);
      setLastPlacedCard(lastPlacedCard);
    });

    return () => {
      socket.off("startGame");
      socket.off("updateGameState");
    };
  }, [socket]);

  useEffect(() => {
    if (
      emit &&
      socket &&
      roomId &&
      table &&
      player &&
      lastPlacedCard &&
      selectedTableCards
    ) {
      socket.emit("playCard", {
        roomId,
        table,
        player,
        lastPlacedCard,
        selectedTableCards,
      });
      setEmit(false);
    }
  }, [emit]);

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
        handleHandCardSelection={(card) =>
          handleHandCardSelectionMultiplayer({
            setEmit,
            socket,
            roomId,
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
          })
        }
        handleThemeChange={handleThemeChange}
        theme={theme}
      />
    </>
  );
}
