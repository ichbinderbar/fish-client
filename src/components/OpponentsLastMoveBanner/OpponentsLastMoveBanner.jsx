export default function OpponentsLastMoveBanner({ cardsCollected }) {
  return (
    <div className="opponent-area__cards-collected">
      {cardsCollected?.hook !== undefined && (
        <>
          Opponent played card {cardsCollected.hook}
          <br />
        </>
      )}
      {cardsCollected?.totalCards > 0 && (
        <>
          and collected {cardsCollected.totalCards} cards
          <br />
        </>
      )}
      {cardsCollected?.cardsArray?.length > 0 && (
        <>
          {cardsCollected.totalCards - 1} from the table:{" "}
          {cardsCollected.cardsArray.join(", ")}
          <br />
        </>
      )}
    </div>
  );
}
