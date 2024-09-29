import "./MultiplayerGamePage.scss";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { apiUrl } from "../../assets/data/Api";
import TableMultiplayer from "../../components/TableMultiplayer/TableMultiplayer";
import PlayerAreaMultiplayer from "../../components/PlayerAreaMultiplayer/PlayerAreaMultiplayer";
import handleTableCardSelection from "../../game/handleTableCardSelection";
import OpponentAreaMultiplayer from "../../components/OpponentAreaMultiplayer/OpponentAreaMultiplayer";
import handleHandCardSelectionMultiplayer from "../../game/handleHandCardSelectionMultiplayer";
import JoinRoom from "../../components/JoinRoom/JoinRoom";

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
  const [winner, setWinner] = useState(null);
  const [isJoinRoomVisible, setIsJoinRoomVisible] = useState(true);

  useEffect(() => {
    const newSocket = io(apiUrl);
    setSocket(newSocket);

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

    socket.on("gameOver", (data) => {
      const newGameState = data.gameState;

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

      setGameOver(true);
      setWinner(data.winner);
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

  useEffect(() => {
    if (gameOver) {
      socket.on("gameOver", (data) => {
        const { gameState, winner } = data;
        const { player1, player2, table, lastPlacedCard } = gameState;

        if (socket.id === player1.id) {
          setPlayer({
            id: player1.id,
            hand: player1.hand,
            fishedCards: player1.fishedCards,
            coins: player1.coins,
            isActive: player1.isActive,
          });
          setOpponent({
            id: player2.id,
            hand: player2.hand,
            fishedCards: player2.fishedCards,
            coins: player2.coins,
            isActive: player2.isActive,
          });
        } else {
          setPlayer({
            id: player2.id,
            hand: player2.hand,
            fishedCards: player2.fishedCards,
            coins: player2.coins,
            isActive: player2.isActive,
          });
          setOpponent({
            id: player1.id,
            hand: player1.hand,
            fishedCards: player1.fishedCards,
            coins: player1.coins,
            isActive: player1.isActive,
          });
        }

        setTable(table);
        setLastPlacedCard(lastPlacedCard);

        setWinner(winner);
        setGameOver(true);
      });

      return () => {
        socket.off("gameOver");
      };
    }
  }, [gameOver, socket]);

  const handleRoomInput = (event) => {
    if (event.key === "Enter") {
      socket.emit("joinRoom", { roomId: event.target.value });
      setIsJoinRoomVisible(false);
    }
  };

  const handleJoinRandomRoom = () => {
    socket.emit("joinRandomRoom");
    setIsJoinRoomVisible(false);
  };

  return (
    <>
      <div className="multiplayer-game-page__finder">
        {isJoinRoomVisible ? (
          <JoinRoom
            handleRoomInput={handleRoomInput}
            handleJoinRandomRoom={handleJoinRandomRoom}
          />
        ) : null}
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
        gameOver={gameOver}
        player={player}
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
