import { useState } from "react";
import "./InstructionsBoard.scss";

export default function InstructionsBoard({ theme }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div
      className={`instructions-board__main-container instructions-board__main-container--${theme}`}
    >
      <h1 className="instructions-board__title">
        How To Play:
        <div
          className="instructions-board__icon-container"
          onClick={toggleFullScreen}
        >
          <span className="instructions-board__icon">▶️</span>
        </div>
        {isFullScreen && (
          <iframe
            className="instructions-board__video"
            src="https://www.loom.com/embed/98b4029303254247a63ee29f9f62b69b?sid=126a96c3-ba4f-4d07-b14e-f61d1f65602e"
            allowFullScreen
          ></iframe>
        )}
      </h1>
      <div
        className={`instructions-board__subcontainer instructions-board__subcontainer--${theme}`}
      >
        <div className="instructions-board__content">
          <div className="section">
            <h3>Controls:</h3>
            <p>
              On each turn you will try to collect as many cards and coins as
              possible.
              <br />
              First select (tap or click) the cards you want to "fish" from the
              table, then select (tap or click) the "hook" from your hand. The
              "hook" is the card you will use to capture the combination
              selected from the table.
              <br />
              The order in which you select the cards on the table does not
              matter. Just make sure you select from the table before you choose
              the hook card in order to capture the combination.
              <br />
              If the combination selected is not valid no cards will be
              captured.
              <br />
              To deselect tap or click any selected card.
            </p>
          </div>
          <div className="section">
            <h3>Goal:</h3>
            <p>Earn 40 coins before your opponent to win the game.</p>
            <br />
            <h3>Game Over:</h3>
            <p>
              The game can end at the end of a round when the cards are counted
              and exchanged for coins once one of the players reaches 40 coins,
              or it can end by a player reaching 40 coins at any point during
              the game.
            </p>
            <br />
            <h3>Tip:</h3>
            <p>
              There are 40 cards in total. Therefore each card value only
              repeats 4 times. Try to remember the cards that have been played
              to better your odds of winning. For example, if you have seen the
              Jack tree times already you can be sure it is safe to play it next
              since it is imposible for your opponnent to fish it off the table
              in the next move.
            </p>
          </div>
          <div className="section">
            <h3>Turns:</h3>
            <p>
              On each turn, you must attempt to fish as many cards from the
              table as possible using a card from your hand, the hook.
              <br />
              There are two types of cards in the game: royals (or high cards:
              J, Q, K) and colors (or low cards: A - 7). 8s, 9s, and 10s do not
              play. If the played card is a royal card, in order to capture or
              "fish" a card from the table it must match its value exactly.
              <br />
              If the played card is a low card (A - 7) it can "fish" like royals
              or it can capture up to two cards at once by adding up their
              values to match its own. For example, if you have a card with a
              value of 3 and the table contains the following cards: 1, 2, and
              3, you can either capture the 3 alone with your 3 or the 1 and the
              2 together because 1 + 2 = 3.
              <br />
              If you capture as explained before all inmediatelly consecutive
              cards after the hook's card value can also be collected. Since 8s,
              9s, and 10s, do not play, the next consecute card after 7 is J.
              For example, if you have a 3 in your hand and the table contains
              the following cards: 1, 2, 3 and 4, you could "fish" any of these
              combinations off the table: [1, 2, 4] because 1 + 2 = 3 and 4
              comes inmediatelly after 3, [3, 4] because 4 comes inmediatelly
              after 3, [1, 2] because 1 + 2 = 3, or you could simply pick up the
              [3] by itself.
              <br />
              If a player cannot "fish" any cards, they must discard a card onto
              the table. The turn then passes to the next player.
            </p>
          </div>
          <div className="section">
            <h3>Points:</h3>
            <p>
              2 coins will be awarded for capturing the card discarted by the
              previous player with a card of the same value inmediatelly after
              it is placed on the table. This is called a "caida".
              <br />2 additional coins will be awarded if the player leaves the
              table empty after capturing.
              <br />
              This two scenarios can happen on the same turn on which case a
              total of 4 points will be awarded.
              <br />
              At the end of each round the cards collected during that round are
              counted and 6 coins are awarded for every 20 captured cards. One
              additional coin is awarded for every additional captured card (for
              example, a player whom at the end of the round has collected 23
              cards will receive 6 coins for the first 20 and 3 coins for the
              additional 3 cards, for a grand total of 9 coins).
            </p>
          </div>
          <div className="section">
            <h3>End of the Round:</h3>
            <p>
              The round ends when a player runs out of cards in their hand and
              there are no more cards left to be dealt.
              <br />
              At the end of each round each player's captured cards get counted
              and exchanged for coins, and the game continues to the next round
              if neither player has reached 20 points.
              <br />
              The player who plays last in one round starts the next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
