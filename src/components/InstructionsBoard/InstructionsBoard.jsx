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
            src="https://www.loom.com/embed/147ee3349cf04b509f4f57a42329b9b2?sid=b2bae610-9f50-411c-966d-bb253da85f94"
            allowfullscreen
          ></iframe>
        )}
      </h1>
      <div
        className={`instructions-board__subcontainer instructions-board__subcontainer--${theme}`}
      >
        <div className="instructions-board__content">
          <div className="section">
            <h3>How to Play:</h3>
            <p>
              On each turn you will try to collect as many cards and coins as
              possible.
              <br />
              First select the cards you want to "fish" from the table, then
              select the "hook"from your hand. The "hook" is the card you will
              use to capture the combination selected from the table.
              <br />
              The order in which you select the cards on the table does not
              matter.
            </p>
          </div>
          <div className="section">
            <h3>Goal:</h3>
            <p>Earn 20 coins before your opponent to win the game.</p>
            <br />
            <h3>Tip:</h3>
            <p>
              There are 40 cards in total. The values of the cards go from 1 to
              10. Therefore each number only repeats 4 times. Try to remember
              the cards that have been played to better your odds of winning.
            </p>
          </div>
          <div className="section">
            <h3>Turns:</h3>
            <p>
              On each turn, a player must attempt to capture as many cards from
              the table as possible using a card from their hand.
              <br />
              There are two types of cards in the game: blacks (or high cards)
              and colors (or low cards). If the played card is a black card, in
              order to capture or "fish" a card from the table it must match its
              value exactly.
              <br />
              If the played card is a color card it can "fish" like black cards
              or it can "fish" two cards by adding up their values (for example,
              if the player has a card with a value of 3 and the table contains
              the following cards: 1, 2, and 3, the player can either capture
              the 3 alone with his 3 or the 1 and the 2 together).
              <br />
              If you can "hook" a match as explained before all inmediatelly
              consecutive cards after the "hook" can also be collected and
              counted into the players cards pile (for example, if the player
              has a card with a value of 3 and the table contains the following
              cards: 1, 2, 3 and 4, the player is allowed to "fish" any of these
              combinations off the table: [1, 2, 4], [3, 4], [1, 2] or [3]).
              <br />
              If a player cannot "fish" any cards, they must discard a card onto
              the table. The turn then passes to the next player.
            </p>
          </div>
          <div className="section">
            <h3>Points:</h3>
            <p>
              1 coin can be earned for capturing the card discarted by the
              previous player with a card of the same value inmediatelly after
              it is placed on the table.
              <br />1 coin is awarded if the player leaves the table empty after
              capturing.
              <br />
              This two scenarios can happen on the same turn on which case 2
              points are awarded.
              <br />
              At the end of each round the cards collected during that round are
              counted and 6 coins are awarded for every 20 captured cards. One
              additional coin is awarded for every 2 additional captured cards
              (for example, a player whom at the end of the round has collected
              23 cards will receive 6 coins for the first 20 and 1 coin for the
              additional 3 cards, for a grand total of 7 coins).
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
            <br />
            <h3>Game Over:</h3>
            <p>
              The game can end at the end of a round when the cards are counted
              and exchanged for coins when one of the players reaches 20 coins,
              or it can end by a player reaching 20 coins at any point during
              the game.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
