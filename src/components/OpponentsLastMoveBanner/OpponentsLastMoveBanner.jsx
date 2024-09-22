export default function OpponentsLastMoveBanner({ cardsCollected }) {
  return (
    <div className="opponent-area__cards-collected">
      {cardsCollected?.totalCards > 0 && (
        <>
          Total cards collected: {cardsCollected.totalCards}
          <br />
        </>
      )}
      {cardsCollected?.cardsArray?.length > 0 && (
        <>
          From table: {cardsCollected.cardsArray.join(", ")}
          <br />
        </>
      )}
      {cardsCollected?.hook !== undefined && (
        <>
          Card played: {cardsCollected.hook}
          <br />
        </>
      )}
    </div>
  );
}
