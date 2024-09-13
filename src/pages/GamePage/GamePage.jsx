import PlayerArea from "../../components/PlayerArea/PlayerArea";
import Table from "../../components/Table/Table";
import "./GamePage.scss";
import { useState, useEffect } from "react";
import shuffle from "../../game/Shuffle";
import sell from "../../game/Sell";
import { checkGameOver } from "../../game/CheckGameOver";
import { initialShuffleDealFlip } from "../../game/InitialShuffleDealFlip";
import { switchActivePlayer } from "../../game/SwitchActivePlayer";
import deal from "../../game/Deal";
import { Deck } from "../../assets/data/Deck";
import {
  player as playerObject,
  opponent as opponentObject,
  player,
} from "../../game/PlayerObjects";
import { useNavigate } from "react-router-dom";
import { saveResults } from "../../utils/SaveResults";
import OpponentArea from "../../components/OpponentArea/OpponentArea";
import handleHandCardSelection from "../../game/handleHandCardSelection";
import handleTableCardSelection from "../../game/handleTableCardSelection";
import io from "socket.io-client";
import { apiUrl } from "../../assets/data/Api";

export default function GamePage({ theme, handleThemeChange }) {
  const [deck, setDeck] = useState(Deck);
  const [table, setTable] = useState([]);
  const [player, setPlayer] = useState(playerObject);
  const [opponent, setOpponent] = useState(opponentObject);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [gameInitialized, setGameInitialized] = useState(false);
  const [lastPlacedCard, setLastPlacedCard] = useState(null);
  const [isDeckFinished, setIsDeckFinished] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  const [winner, setWinner] = useState(null);
  const [firstToMove, setFirstToMove] = useState(null);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [socket, setSocket] = useState(null);

  // set up game on mount
  useEffect(() => {
    const newSocket = io(apiUrl);
    setSocket(newSocket);
    initialShuffleDealFlip({
      deck,
      setDeck,
      player,
      setPlayer,
      opponent,
      setOpponent,
      setFirstToMove,
    });
    setGameInitialized(true);
    newSocket.on("update-game-state", (gameState) => {
      console.log("Game state updated:", gameState);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // emit game state updates
  useEffect(() => {
    if (socket) {
      socket.emit("game-state-update-event", {
        player,
        opponent,
        table,
        selectedTableCards,
        lastPlacedCard,
      });
    }
  }, [socket, player, opponent, table, selectedTableCards, lastPlacedCard]);

  // handle dealing
  useEffect(() => {
    if (gameInitialized) {
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
    }
  }, [gameInitialized, player.hand.length, opponent.hand.length, deck]);

  // handle opponents auto-play
  useEffect(() => {
    if (
      gameInitialized &&
      opponent.isActive &&
      !gameOver &&
      opponent.hand.length > 0
    ) {
      setTimeout(
        () =>
          opponent.fishBot({
            gameOver,
            opponent,
            setOpponent,
            table,
            setTable,
            setLastPlacedCard,
            lastPlacedCard,
            player,
            setPlayer,
          }),
        300
      );
    }
  }, [opponent]);

  // handle end of round
  useEffect(() => {
    if (gameInitialized) {
      if (isDeckFinished) {
        console.log(
          "--------------------Deck is empty and all cards have been played.--------------------"
        );
        const earnedPlayerCoins = sell(player.fishedCards);
        const earnedOpponentCoins = sell(opponent.fishedCards);
        // const newDeck = shuffle(Deck);

        setIsRoundOver(true);
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
        // setDeck(newDeck);
        setTurnCount(0);
        setTable([]);
        setIsDeckFinished(false);
      }
    }
  }, [gameInitialized, player.hand.length, opponent.hand.length, deck]);

  // handle new round
  useEffect(() => {
    if (gameInitialized && isRoundOver) {
      if (firstToMove === "Player") {
        setPlayer((prevPlayer) => ({ ...prevPlayer, isActive: false }));
        setOpponent((prevOpponent) => ({ ...prevOpponent, isActive: true }));
        console.log(
          "--------------------Opponent starts this round.--------------------"
        );
      }
      if (firstToMove === "Opponent") {
        setPlayer((prevPlayer) => ({ ...prevPlayer, isActive: true }));
        setOpponent((prevOpponent) => ({ ...prevOpponent, isActive: false }));
        console.log(
          "--------------------Player starts this round.--------------------"
        );
      }
      const newDeck = shuffle(Deck);
      setDeck(newDeck);
      setIsRoundOver(false);
      setFirstToMove(firstToMove === "Player" ? "Opponent" : "Player");
    }
  }, [isRoundOver]);

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

  // post results
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

  // track player.hand if player is first to move to determine end of round
  useEffect(() => {
    if (gameInitialized) {
      if (firstToMove === "Player") {
        setTurnCount((prevTableUpdateCount) => {
          const tableUpdateCount = prevTableUpdateCount + 1;
          // console.log("Updated table count:", tableUpdateCount);
          if (tableUpdateCount % 24 === 0) {
            console.log(
              "Player hand is finished. Deck is finished.--------------------"
            );
            setIsDeckFinished(true);
          }
          return tableUpdateCount;
        });
      }
    }
  }, [player.hand]);

  // track opponent.hand if opponent is first to move to determine end of round
  useEffect(() => {
    if (gameInitialized) {
      if (firstToMove === "Opponent") {
        setTurnCount((prevTableUpdateCount) => {
          const tableUpdateCount = prevTableUpdateCount + 1;
          // console.log("Updated table count:", tableUpdateCount);
          if (tableUpdateCount % 24 === 0) {
            console.log(
              "Opponent hand is finished. Deck is finished.--------------------"
            );
            setIsDeckFinished(true);
          }
          return tableUpdateCount;
        });
      }
    }
  }, [opponent.hand]);

  return (
    <>
      <OpponentArea
        coins={opponent.coins}
        fishedCards={opponent.fishedCards}
        player={opponent}
        handleHandCardSelection={(card) =>
          handleHandCardSelection({
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
        theme={theme}
      />
      <Table
        cards={table}
        handleTableCardSelection={(card) =>
          handleTableCardSelection({
            card,
            gameOver,
            selectedTableCards,
            setSelectedTableCards,
          })
        }
        handleThemeChange={handleThemeChange}
        gameOver={gameOver}
        player={player}
        theme={theme}
      />
      <PlayerArea
        coins={player.coins}
        fishedCards={player.fishedCards}
        player={player}
        handleHandCardSelection={(card) =>
          handleHandCardSelection({
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
        theme={theme}
      />
    </>
  );
}
