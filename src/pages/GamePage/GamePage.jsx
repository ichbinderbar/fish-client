import PlayerArea from "../../components/PlayerArea/PlayerArea";
import Table from "../../components/Table/Table";
import "./GamePage.scss";
import { useState, useEffect, useRef } from "react";
import shuffle from "../../game/Shuffle";
import sell from "../../game/Sell";
import { checkGameOver } from "../../game/CheckGameOver";
import { initialShuffleDealFlip } from "../../game/InitialShuffleDealFlip";
import deal from "../../game/Deal";
import { Deck } from "../../assets/data/Deck";
import {
  player as playerObject,
  opponent as opponentObject,
} from "../../game/PlayerObjects";
import { useNavigate } from "react-router-dom";
import { saveResults } from "../../utils/SaveResults";
import OpponentArea from "../../components/OpponentArea/OpponentArea";
import handleHandCardSelection from "../../game/handleHandCardSelection";
import handleTableCardSelection from "../../game/handleTableCardSelection";
import handleCommentary from "../../game/handleCommentary";
import addToCommentaryContext from "../../game/addToCommentaryContext";

export default function GamePage({
  theme,
  handleThemeChange,
  playerName,
  opponentName,
  opponentLevel,
}) {
  const audioRefCard = useRef(null);
  const audioRefCoins = useRef(null);
  const [deck, setDeck] = useState(Deck);
  const [table, setTable] = useState([]);
  const [player, setPlayer] = useState({
    ...playerObject,
    name: playerName,
  });
  const [opponent, setOpponent] = useState({
    ...opponentObject,
    name: opponentName,
  });
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
  const [cardsCollected, setCardsCollected] = useState([]);
  const [commentaryContext, setCommentaryContext] = useState("");
  const [commentary, setCommentary] = useState("");
  const [animate, setAnimate] = useState(false);

  const previousPlayerCoins = useRef(player.coins);
  const previousOpponentCoins = useRef(opponent.coins);

  useEffect(() => {
    let cardSoundPlayed = false;

    if (audioRefCard.current && table.length !== 0) {
      audioRefCard.current.play().catch((error) => {
        console.error("Failed to play card sound:", error);
      });
      cardSoundPlayed = true;
    }

    if (audioRefCoins.current) {
      if (
        player.coins !== previousPlayerCoins.current ||
        opponent.coins !== previousOpponentCoins.current
      ) {
        if (cardSoundPlayed) {
          setTimeout(() => {
            audioRefCoins.current.play().catch((error) => {
              console.error("Failed to play coins sound:", error);
            });
          }, 500);
        } else {
          audioRefCoins.current.play().catch((error) => {
            console.error("Failed to play coins sound:", error);
          });
        }
      }
    }

    previousPlayerCoins.current = player.coins;
    previousOpponentCoins.current = opponent.coins;
  }, [table, player.coins, opponent.coins]);

  // toggles the class of my intelligent commentary box
  useEffect(() => {
    if (commentary) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 10000);
    }
  }, [commentary]);

  // runs everytime new context is provided by my state setter
  useEffect(() => {
    const fetchCommentary = async () => {
      const comment = await handleCommentary(
        commentaryContext,
        player,
        opponent
      );
      setCommentary(comment);
    };
    fetchCommentary();
  }, [commentaryContext]);

  // set up game on mount
  useEffect(() => {
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
  }, []);

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
            setCardsCollected,
          }),
        1000
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

        setTimeout(() => {
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
        }, 2000);
      }
    }
  }, [gameInitialized, player.hand.length, opponent.hand.length, deck]);

  // handle new round
  useEffect(() => {
    if (gameInitialized && isRoundOver) {
      if (firstToMove === "Player") {
        setPlayer((prevPlayer) => ({ ...prevPlayer, isActive: false }));
        setOpponent((prevOpponent) => ({ ...prevOpponent, isActive: true }));
        // console.log(
        //   "--------------------Opponent starts this round.--------------------"
        // );
      }
      if (firstToMove === "Opponent") {
        setPlayer((prevPlayer) => ({ ...prevPlayer, isActive: true }));
        setOpponent((prevOpponent) => ({ ...prevOpponent, isActive: false }));
        // console.log(
        //   "--------------------Player starts this round.--------------------"
        // );
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
      const score =
        player.coins >= opponent.coins
          ? `${player.coins}-${opponent.coins}`
          : `${opponent.coins}-${player.coins}`;
      const gameResults = {
        winner_name: winner.name,
        opponent_name: opponent.name,
        player_name: player.name,
        score: score,
      };

      saveResults(gameResults);

      addToCommentaryContext(
        `
        ${new Date().toLocaleString()}
        Remmember you are ${opponent.name}. I am ${player.name}.
        The game has ended! This are the results:
        Winner: ${winner.name}.
        Coins you have: ${opponent.coins}
        Coins I have: ${player.coins}

        ${new Date().toLocaleString()} You said:
        ${commentary}
        `,
        setCommentaryContext
      );

      setTimeout(() => {
        navigate("/scores");
      }, 10000);
    }
  }, [gameOver]);

  // track player.hand if player is first to move to determine end of round
  useEffect(() => {
    if (gameInitialized) {
      if (firstToMove === "Player") {
        setTurnCount((prevTurnCount) => {
          const turnCount = prevTurnCount + 1;
          // console.log("Updated table count:", TurnCount);
          if (turnCount % 7 === 0) {
            if (!gameOver) {
              addToCommentaryContext(
                `
                ${new Date().toLocaleString()}
                Describe the current sentiment of the game based on
                the current score:
                Coins you have earned: ${opponent.coins}
                Coins I have earned: ${player.coins}
                Total cards you have collected up to this point: ${
                  opponent.fishedCards
                }
                Total cards I have collected up this point: ${
                  player.fishedCards
                }
                ${new Date().toLocaleString()} You said:
                ${commentary}
                `,
                setCommentaryContext
              );
            }
          }
          if (turnCount % 19 === 0) {
            if (!gameOver) {
              addToCommentaryContext(
                `
                ${new Date().toLocaleString()}
                The round will end soon!
                This is the current score:
                Coins you have earned: ${opponent.coins}
                Coins I have earned: ${player.coins}
                Total cards you have collected up to this point: ${
                  opponent.fishedCards
                }
                Total cards I have collected up this point: ${
                  player.fishedCards
                }
                ${new Date().toLocaleString()} You said:
                ${commentary}
                `,
                setCommentaryContext
              );
            }
          }
          if (turnCount % 24 === 0) {
            console.log(
              "Player hand is finished. Deck is finished.--------------------"
            );
            setIsDeckFinished(true);
            if (!gameOver) {
              addToCommentaryContext(
                `
                ${new Date().toLocaleString()}
                A round has ended!
                This were the results:
                Coins you earned: ${opponent.coins}
                Coins I have earned: ${player.coins}
                Total cards you collected up to this point: ${
                  opponent.fishedCards
                }
                Total cards I have collected up this point: ${
                  player.fishedCards
                }
                ${new Date().toLocaleString()} You said:
                ${commentary}
                `,
                setCommentaryContext
              );
            }
          }
          return turnCount;
        });
      }
    }
  }, [player.hand]);

  // track opponent.hand if opponent is first to move to determine end of round
  // add commentary context towards the end of the round
  useEffect(() => {
    if (gameInitialized) {
      if (firstToMove === "Opponent") {
        setTurnCount((prevTurnCount) => {
          const turnCount = prevTurnCount + 1;
          // console.log("Updated table count:", TurnCount);
          if (turnCount % 8 === 0) {
            if (!gameOver) {
              addToCommentaryContext(
                `
                ${new Date().toLocaleString()}
                Describe the current sentiment of the game based on
                the current score:
                Coins you have: ${opponent.coins}
                Coins I have: ${player.coins}
                Total cards you have collected up to this point: ${
                  opponent.fishedCards
                }
                Total cards I have collected up this point: ${
                  player.fishedCards
                }
                ${new Date().toLocaleString()} You said:
                ${commentary}
                `,
                setCommentaryContext
              );
            }
          }
          if (turnCount % 20 === 0) {
            if (!gameOver) {
              addToCommentaryContext(
                `
                ${new Date().toLocaleString()}
                A round will end soon!
                This is the current score:
                Coins you have: ${opponent.coins}
                Coins I have: ${player.coins}
                Total cards you have collected up to this point: ${
                  opponent.fishedCards
                }
                Total cards I have collected up this point: ${
                  player.fishedCards
                }
                ${new Date().toLocaleString()} You said:
                ${commentary}
                `,
                setCommentaryContext
              );
            }
          }
          if (turnCount % 24 === 0) {
            console.log(
              "Opponent hand is finished. Deck is finished.--------------------"
            );
            setIsDeckFinished(true);
            if (!gameOver) {
              addToCommentaryContext(
                `
                ${new Date().toLocaleString()}
                A round has ended!
                This were the results:
                Coins you earned: ${opponent.coins}
                Coins I have earned: ${player.coins}
                Total cards you collected up to this point: ${
                  opponent.fishedCards
                }
                Total cards I have collected up this point: ${
                  player.fishedCards
                }
                ${new Date().toLocaleString()} You said:
                ${commentary}
                `,
                setCommentaryContext
              );
            }
          }
          return turnCount;
        });
      }
    }
  }, [opponent.hand]);

  return (
    <>
      <audio ref={audioRefCoins} preload="auto" style={{ display: "none" }}>
        <source src="/coins.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={audioRefCard} preload="auto" style={{ display: "none" }}>
        <source src="/card.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <OpponentArea
        animate={animate}
        commentary={commentary}
        coins={opponent.coins}
        fishedCards={opponent.fishedCards}
        player={opponent}
        cardsCollected={cardsCollected}
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
