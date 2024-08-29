import "./InstructionsBoard.scss";

export default function InstructionsBoard() {
  return (
    <div className="instructions-board__main-container">
      <h1 className="instructions-board__title">How To Play:</h1>
      <div className="instructions-board__subcontainer">
        <p className="instructions-board__content">
          there is one boat for sale for 20 coins your goal is to collect enough
          coins to buy the boat to earn coins you can: 1. fish as many fish as
          you can to sell for coins. buyers won't buy less than 20 fish. at the
          end of each fishing round you will get 6 coins for every 20 fish and
          one extra coin per every two additional fish 2. fish the other
          fisher's bait fish. you will get one coin when you fish the other
          fisher's bait fish with a same-sized fish immediately after he's turn
          3. fish the lake out. you will get a coin if you fish all fish left to
          fish if you fish the other fisher's fish and fish the lake out on the
          same turn you will only get one coin how to fish: you fish with
          same-sized or bigger bait fish - if you fish with same-sized fish you
          fish that fish and all fish with consecutive numbers - if you fish
          with regular fish you can fish up to two smaller fish whose numbers
          add up to your bait fish's number and all fish with consecutive
          numbers after it * notice you cannot fish regular fish with striped
          fish
        </p>
      </div>
    </div>
  );
}
