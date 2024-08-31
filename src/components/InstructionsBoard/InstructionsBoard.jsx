import "./InstructionsBoard.scss";

export default function InstructionsBoard({ theme }) {
  return (
    <div
      className={`instructions-board__main-container instructions-board__main-container--${theme}`}
    >
      <h1 className="instructions-board__title">How To Play:</h1>
      <div
        className={`instructions-board__subcontainer instructions-board__subcontainer--${theme}`}
      >
        <p className="instructions-board__content">
          Your goal is to collect enough coins to buy a boat worth 20 coins
          <br />
          To earn coins you can:
          <br />
          1. Fish as many fish as you can to sell for coins. buyers won't buy
          less than 20 fish. at the end of each fishing round you will get 6
          coins for every 20 fish and one extra coin per every two additional
          fish
          <br />
          2. Fish the other fisher's bait fish. you will get one coin when you
          fish the other fisher's bait fish with a same-sized fish immediately
          after he's turn
          <br />
          3. Fish the lake out. you will get a coin if you fish all fish left to
          fish if you fish the other fisher's fish and fish the lake out on the
          same turn you will only get one coin
          <br />
          How to fish:
          <br />
          You fish with same-sized or bigger bait fish
          <br />
          - If you fish with same-sized fish you fish that fish and all fish
          with consecutive numbers
          <br />
          - If you fish with regular fish you can fish up to two smaller fish
          whose numbers add up to your bait fish's number and all fish with
          consecutive numbers after it
          <br />* notice you cannot fish regular fish with striped fish
        </p>
      </div>
    </div>
  );
}
