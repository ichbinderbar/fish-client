import "./OpponentsLastMoveBanner.scss";

export default function OpponentsLastMoveBanner({ cardsCollected }) {
  // Map card numbers to display values (A, J, Q, K)
  const getDisplayValue = (number) => {
    if (number === 1) return "A";
    if (number === 8) return "J";
    if (number === 9) return "Q";
    if (number === 10) return "K";
    return number;
  };

  // Map color names to actual CSS colors
  const colorMap = {
    red: "#ff0000",
    blue: "#0000ff",
    green: "#00aa00",
    purple: "#800080",
  };

  return (
    <div className="opponent-area__cards-collected">
      {cardsCollected?.collectedCards?.length > 0 && (
        <>
          <div className="opponents-last-move-label">
            Cards collected ({cardsCollected.totalCards}):
          </div>
          {cardsCollected?.fishingCard && (
            <div className="opponents-last-move-row">
              Hook:
              <span
                className="opponents-last-move-card"
                style={{
                  backgroundColor:
                    colorMap[cardsCollected.fishingCard.color] ||
                    cardsCollected.fishingCard.color,
                }}
              >
                {getDisplayValue(cardsCollected.fishingCard.number)}
              </span>
            </div>
          )}
          <div className="opponents-last-move-row">
            Fished:
            {cardsCollected.collectedCards
              .sort((a, b) => a.number - b.number)
              .map((card, index) => (
                <span
                  key={index}
                  className="opponents-last-move-card"
                  style={{
                    backgroundColor: colorMap[card.color] || card.color,
                  }}
                >
                  {getDisplayValue(card.number)}
                </span>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
